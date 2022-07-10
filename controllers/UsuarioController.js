const Sequelize = require("sequelize");
const usuario = require("../models").usuario;
module.exports = {
  list(_, res) {
    return usuario
      .findAll({})
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return usuario
      .findAll({
        where: {
          nombre: req.body.nombre,
        },
      })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  
};
