const Sequelize = require("sequelize");
const usuario = require("../models").usuario;
module.exports = {
  async list(_, res) {
    return usuario
      .findAll({})
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async find(req, res) {
    return usuario
      .findAll({
        where: {
          nombre: req.body.nombre,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    console.log("el bodyyyyyyy", req.body)
    return usuario
      .update(
        {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          telefono: req.body.telefono,
          email: req.body.email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
};
