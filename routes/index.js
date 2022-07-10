/* Controllers */
const usuarioController = require("../controllers/UsuarioController");
const recetaController = require("../controllers/RecetaController");
const AuthController = require("../controllers/AuthController");
const CalificacionController = require("../controllers/CalificacionController");
const auth = require("../middlewares/auth");
module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );
  app.get("/api/usuario/list", usuarioController.list);
  app.get("/api/usuario/find", usuarioController.find);

  //recetas
  app.get("/api/receta/list", recetaController.list);
  app.get("/api/receta/find", auth, recetaController.find_by_user_id);
  app.post("/api/receta/create", auth, recetaController.create);
  app.get("/api/receta/ingredient", recetaController.find_by_ingredient);
  app.put("/api/receta/update_recepie", auth, recetaController.update_recepie);
  app.get("/api/receta/anything", recetaController.find_by_anything);
  app.get("/api/receta/receta_id", auth, recetaController.recepie_by_id);
  app.delete(
    "/api/receta/delete/receta_id",
    auth,
    recetaController.delete_recepie
  );

  //calificacion
  app.get(
    "/api/receta/calificacion",
    auth,
    CalificacionController.get_calificacion
  );
  app.put(
    "/api/receta/calificacion/update",
    auth,
    CalificacionController.post_calificacion
  );

  //dos nuevas rutas para login y registro

  app.post("/api/login", AuthController.signIn);
  app.post("/api/signup", AuthController.signUp);
};
