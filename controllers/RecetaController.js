const { where } = require("sequelize");
const Sequelize = require("sequelize");
const ingrediente = require("../models").ingrediente;
const categoria = require("../models").categoria;
const Op = Sequelize.Op;
const receta = require("../models").receta;
const usuario = require("../models").usuario;
const calificacion = require("../models").calificacion;

function save_ings(ings, id) {
  // console.log(ings)
  var allIngredients = [];
  for (var i = 0; i < ings.length; i++) {
    var ingredientObject = {
      ingrediente_descr: ings[i],
      receta_id: id,
    };
    allIngredients.push(ingredientObject);
  }

  return allIngredients;
}

function save_cats(cats, id) {
  //console.log(cats);
  var allCategories = [];
  for (var i = 0; i < cats.length; i++) {
    var categoryObject = {
      descripcion: cats[i],
      receta_id: id,
    };
    allCategories.push(categoryObject);
  }
  return allCategories;
}

module.exports = {
  async create(req, res) {
    //console.log(req.body.procedimiento)
    // Usuario
    const responseUsuario = usuario.findOne({
      where: {
        id: req.body.usuario_id,
      },
    });

    const ings = req.body.ingredientes.split(",");
    const cats = req.body.categorias.split(",");

    Promise.all([responseUsuario])
      .then((responses) => {
        return receta
          .create({
            usuario_id: responses[0].id,
            titulo: req.body.titulo,
            dificultad: req.body.dificultad,
            procedimiento: req.body.procedimiento,
            status: req.body.status,
          })
          .then((receta) => {
            let cod_receta = receta.id;
            let allIngredients = save_ings(ings, cod_receta);
            let allCategories = save_cats(cats, cod_receta);

            calificacion.create({
              receta_id: cod_receta,
              calificacion_sum: 0,
              total_personas: 0,
            }),
              ingrediente.bulkCreate(allIngredients, {
                returning: true,
                individualHooks: true,
              }),
              categoria.bulkCreate(allCategories, {
                returning: true,
                individualHooks: true,
              });
          });
      })
      .then((receta) => res.status(200).send(receta))
      .catch((error) => res.status(400).send(error));
  },

  async list(_, res) {
    return receta
      .findAll({
        include: [
          {
            model: usuario,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "email"],
          },
          {
            model: ingrediente,
            as: "ingredientes",
            attributes: ["ingrediente_descr"],
          },
          {
            model: calificacion,
            as: "calificacions",
            attributes: ["calificacion_sum"],
          },
          {
            model: categoria,
            as: "categoria",
            attributes: ["descripcion"],
          },
        ],
        where: {
          status: { [Op.not]: "Borrador" },
        },
      })
      .then((receta) => res.status(200).send(receta))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_user_id(req, res) {
    return receta
      .findAll({
        include: [
          {
            model: usuario,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "email"],
          },
          {
            model: ingrediente,
            as: "ingredientes",
            attributes: ["ingrediente_descr"],
          },
          {
            model: calificacion,
            as: "calificacions",
            attributes: ["calificacion_sum"],
          },
          {
            model: categoria,
            as: "categoria",
            attributes: ["descripcion"],
          },
        ],
        where: {
          usuario_id: req.params.usuario_id,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_titulo(req, res) {
    console.log("back", req.query.titulo);
    return receta
      .findAll({
        where: {
          titulo: { [Op.like]: "%" + req.query.titulo + "%" },
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_dificultad(req, res) {
    return receta
      .findAll({
        where: {
          dificultad: req.query.dificultad,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_ingredient(req, res) {
    console.log(req.params.ingrediente);
    const responseIng = ingrediente.findAll({
      where: {
        ingrediente_descr: req.params.ingrediente,
      },
    });

    const recepiesIds = (recetas) => {
      let idArray = [];
      console.log("las recetas", recetas);
      recetas.forEach((receta) => {
        idArray.push(receta.dataValues.receta_id);
      });
      return idArray;
    };

    Promise.all([responseIng])
      .then((responses) => {
        console.log("wlkefnwoklejfnwilefk", responses[0][0]);
        let idArray = recepiesIds(responses[0]);
        console.log(idArray);
        return receta.findAll({
          include: [
            {
              model: ingrediente,
              as: "ingredientes",
              attributes: ["ingrediente_descr"],
            },
          ],
          where: {
            id: { [Op.or]: idArray },
          },
        });
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_category(req, res) {
    const responseCat = categoria.findAll({
      where: {
        descripcion: req.params.categoria,
      },
    });

    const recepiesIds = (recetas) => {
      let idArray = [];
      recetas.forEach((receta) => {
        idArray.push(receta.dataValues.receta_id);
      });
      return idArray;
    };

    Promise.all([responseCat])
      .then((responses) => {
        console.log(responses[0][1].dataValues.receta_id);
        let idArray = recepiesIds(responses[0]);
        console.log(idArray);
        return receta.findAll({
          include: [
            {
              model: categoria,
              as: "categoria",
              attributes: ["descripcion"],
            },
          ],
          where: {
            id: { [Op.or]: idArray },
          },
        });
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_anything(req, res) {
    return receta
      .findAll({
        include: [
          {
            model: usuario,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "email"],
          },
          {
            model: ingrediente,
            as: "ingredientes",
            attributes: ["ingrediente_descr"],
          },
          {
            model: calificacion,
            as: "calificacions",
            attributes: ["calificacion_sum"],
          },
          {
            model: categoria,
            as: "categoria",
            attributes: ["descripcion"],
          },
        ],
        where: {
          [Op.or]: [
            { usuario_id: { [Op.like]: "%" + req.body.param + "%" } },
            { titulo: { [Op.like]: "%" + req.body.param + "%" } },
            { dificultad: req.body.param },
          ],
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async update_recepie(req, res) {
    const ings = req.body.ingredientes.split(",");
    const cats = req.body.categorias.split(",");

    let allIngredients = save_ings(ings, req.body.receta_id);
    let allCategories = save_cats(cats, req.body.receta_id);
    console.log(req.body);
    console.log(allCategories);

    return receta
      .update(
        {
          titulo: req.body.titulo,
          dificultad: req.body.dificultad,
          status: req.body.status,
        },
        {
          include: [
            {
              model: ingrediente,
              as: "ingrediente",
            },
            {
              model: categoria,
              as: "categoria",
            },
          ],
          where: {
            id: req.body.receta_id,
          },
        }
      )
      .then((receta) => {
        ingrediente.bulkCreate(allIngredients, {
          returning: true,
          individualHooks: true,
          updateOnDuplicate: ["ingrediente_descr", "receta_id"],
        }),
          categoria.bulkCreate(allCategories, {
            returning: true,
            individualHooks: true,
            updateOnDuplicate: ["descripcion", "receta_id"],
          });
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async recepie_by_id(req, res) {
    return receta
      .findOne({
        include: [
          {
            model: usuario,
            as: "usuario",
            attributes: ["id", "nombre", "apellido", "email"],
          },
          {
            model: ingrediente,
            as: "ingredientes",
            attributes: ["ingrediente_descr"],
          },
          {
            model: calificacion,
            as: "calificacions",
            attributes: ["calificacion_sum"],
          },
          {
            model: categoria,
            as: "categoria",
            attributes: ["descripcion"],
          },
        ],
        where: {
          id: req.params.receta_id,
        },
      })
      .then((receta) => res.status(200).send(receta))
      .catch((error) => res.status(400).send(error));
  },

  async delete_recepie(req, res) {
    return receta
      .destroy({
        where: {
          id: req.params.receta_id,
        },
      })
      .then((receta) =>
        res.status(200).send("La receta fue eliminada correctamente")
      )
      .catch((error) => res.status(400).send(error));
  },

  async delete_cats_and_ings(req, res) {
    receta
      .findOne({
        include: [
          {
            model: ingrediente,
            as: "ingrediente",
          },
          {
            model: categoria,
            as: "categoria",
          },
        ],
        where: {
          id: req.params.receta_id,
        },
      })
      .then((receta) => {
        console.log("rjgnsekrjfhbekrg", receta.id);
        ingrediente.destroy({
          where: {
            receta_id: receta.id,
          },
        }),
          categoria.destroy({
            where: {
              receta_id: receta.id,
            },
          });
      })
      .catch((error) => res.status(400).send(error));
  },
};
