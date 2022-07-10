const { where } = require("sequelize");
const Sequelize = require("sequelize");
const calificacion = require("../models").calificacion;
const ingrediente = require("../models/ingrediente");
const Op = Sequelize.Op;
const receta = require("../models").receta;
const usuario = require("../models").usuario;

module.exports = {
  get_calificacion(req, res) {
    return calificacion.findOne({
      include: [
        {
          model: receta,
          as: "receta",
          attributes: ["id", "titulo"],
        },
      ],
      where: {
        receta_id: req.query.receta_id,
      },
    });
  },

  post_calificacion(req, res) {
    return calificacion
      .update({
        calificacion_sum: Sequelize.literal(`calificacion_sum + ${req.body.calificacion}`),
        total_personas: Sequelize.literal('total_personas + 1'),
      },{
        where: {
          receta_id: req.body.receta_id,
        },
      })
      .then((receta) => res.status(200).send(
        'Se ha actualizado la calificacion correctamente'
      ))
      .catch((error) => res.status(400).send(error));
  },
};
