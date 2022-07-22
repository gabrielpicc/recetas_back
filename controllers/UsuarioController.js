const Sequelize = require("sequelize");
const usuario = require("../models").usuario;
const bcrypt = require("bcrypt");
const authConfig = require("../config/auth");

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

  async recuperarDatosPregunta(req, res) {
    return usuario
      .findOne({
        where: {
          email: req.query.email,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  async establecerNuevaContraseña(req, res) {
    let password = bcrypt.hashSync(req.body.contraseña, authConfig.rounds);
    return usuario
      .update(
        {
          contraseña: password,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      )
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
};
