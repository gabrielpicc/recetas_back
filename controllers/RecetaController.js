const { where } = require("sequelize");
const Sequelize = require("sequelize");
const ingrediente = require("../models").ingrediente;
const categoria = require("../models").categoria;
const Op = Sequelize.Op;
const receta = require("../models").receta;
const usuario = require("../models").usuario;
const calificacion = require("../models").calificacion;

function save_ings(ings, id) {
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
        ],
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
        ],
        where: {
          usuario_id: req.body.usuario_id,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find_by_ingredient(req, res) {
    return receta
      .findAll({
        include: [
          {
            model: ingrediente,
            as: "ingrediente",
            attributes: ["ingrediente_descr"],
          },
        ],
        where: {
          ingrediente: req.body.usuario_id,
        },
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
        ],
        where: {
          [Op.or]: [
            { usuario_id: { [Op.like]: "%" + req.body.param + "%" } },
            { titulo: { [Op.like]: "%" + req.body.param + "%" } },
            { categorias: { [Op.like]: "%" + req.body.param + "%" } },
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

    let allIngredients = save_ings(ings, receta.id);
    let allCategories = save_cats(cats, receta.id);

    return receta
      .update(
        {
          titulo: req.body.titulo,
          dificultad: req.body.dificultad,
          status: req.body.status,
          calificacion_sum: Sequelize.literal(
            `calificacion_sum + ${req.body.calificacion}`
          ),
          total_personas: Sequelize.literal("total_personas + 1"),
        },
        {
          include: [
            {
              model: ingrediente,
              as: "ingrediente",
            },
            {
              model: calificacion,
              as: "calificacion",
            },
            {
              model: categoria,
              as: "categoria",
            },
          ],
          where: {
            id: req.body.id,
          },
        }
      ).then((receta) => {
        ingrediente.bulkCreate(allIngredients, {
          returning: true,
          individualHooks: true,
          updateOnDuplicate: ["ingrediente_descr", "receta_id"],
        }),
        categoria.bulkCreate(allCategories, {
          returning: true,
          individualHooks: true,
          updateOnDuplicate: ["descripcion", "receta_id"],
        })
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
        ],
        where: {
          id: req.query.id,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async delete_recepie(req, res) {
    return receta
      .destroy({
        where: {
          id: req.query.id,
        },
      })
      .then((receta) =>
        res.status(200).send("La receta fue eliminada correctamente")
      )
      .catch((error) => res.status(400).send(error));
  },
};
