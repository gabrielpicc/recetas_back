const { response } = require("express");
const { where } = require("sequelize");
const Sequelize = require("sequelize");
const calificacion = require("../models").calificacion;
const ingrediente = require("../models/ingrediente");
const Op = Sequelize.Op;
const receta = require("../models").receta;
const usuario = require("../models").usuario;

module.exports = {
  get_calificacion(req, res) {
    calificacion
      .findAll({
        include: [
          {
            model: receta,
            as: "receta",
            attributes: ["id", "titulo"],
          },
        ],
        where: {
          receta_id: req.query.receta_id,
          calificacion_sum: {[Op.not]: 0}
        },
      })
      .then((calificacion) => res.status(200).send(calificacion))
      .catch((error) => res.status(400).send(error));
  },

  post_calificacion(req, res) {
    const get_calificacion = calificacion.findOne({
      include: [
        {
          model: receta,
          as: "receta",
          attributes: ["id", "titulo"],
        },
      ],
      where: {
        receta_id: req.body.receta_id,
        user_id: req.body.user,
      },
    });

    Promise.all([get_calificacion]).then((responses) => {
      if (responses[0] !== null) {
        return calificacion
          .upsert({
            id: responses[0].id,
            user_id: req.body.user,
            receta_id: req.body.receta_id,
            calificacion_sum: parseInt(req.body.calificacion),
          })
          .then((receta) =>
            res
              .status(200)
              .send("Se ha actualizado la calificacion correctamente")
          )
          .catch((error) => res.status(400).send(error));
      } else {
        return calificacion
          .create({
            user_id: req.body.user,
            receta_id: req.body.receta_id,
            calificacion_sum: parseInt(req.body.calificacion),
          })
          .then((receta) =>
            res
              .status(200)
              .send("Se ha creado la calificacion correctamente")
          )
          .catch((error) => res.status(400).send(error));
      }
    });
  },
};
