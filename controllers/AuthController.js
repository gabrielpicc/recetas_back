const { usuario } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  //iniciar sesion
  signIn(req, res) {
    let { email, contraseña } = req.body;

    //buscar usuario
    usuario
      .findOne({
        where: { email: email },
      })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ msg: "No se encontro un usuario con este email" });
        } else {
          if (bcrypt.compareSync(contraseña, user.contraseña)) {
            //devolvemos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            console.log(email)
            //req.session.usuario = {email: email}

            return res.json({
                user: user,
                token: token
            }).status(200)
    
          } else {
            //Acceso no autorizado
            res.status(401).json({ msg: "Contraseña incorrecta" });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //registro
  signUp(req, res) {
    //encriptamos la pass
    let password = bcrypt.hashSync(req.body.contraseña, authConfig.rounds);
    console.log(req.body);
    // crear un usuario
    usuario
      .create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        contraseña: password,
      })
      .then((user) => {
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });

        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
