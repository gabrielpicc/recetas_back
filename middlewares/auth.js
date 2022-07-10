const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  console.log(req.headers);

  //comprobar que exista el token
  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Acceso no autorizado" });
  } else {
    //comprobar validez del token
    let token = req.headers.authorization.split(" ")[1];

    //comprobar la validez de este token
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        res
          .status(500)
          .json({ msg: "Ha ocurrido un problema al decodifiar el token", err });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
};
