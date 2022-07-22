const Sequelize = require("sequelize");
const ingrediente = require("../models").ingrediente;
const categoria = require("../models").categoria;
const Op = Sequelize.Op;
const receta = require("../models").receta;
const usuario = require("../models").usuario;
const calificacion = require("../models").calificacion;

module.exports = {
  async delete(req, res) {
    return categoria
      .destroy({
        where: {
          receta_id: req.params.receta_id,
        },
      })
      .then((ingrediente) =>
        res.status(200).send("la categoria fue eliminado correctamente")
      )
      .catch((error) => res.status(400).send(error));
  },
};
