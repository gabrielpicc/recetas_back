/* Controllers */
const usuarioController = require("../controllers/UsuarioController");
const recetaController = require("../controllers/RecetaController");
const ingredienteController = require("../controllers/IngredienteController");
const categoriaController = require("../controllers/CategoriaController");
const AuthController = require("../controllers/AuthController");
const CalificacionController = require("../controllers/CalificacionController");

const auth = require("../middlewares/auth");
module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    },
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'));
  });
  app.options("/api/usuario/list", usuarioController.list);
  app.get("/api/usuario/find/:id", usuarioController.find);
  app.put("/api/usuario/update/:id", auth, usuarioController.update);
  app.get("/api/usuario/obtenerDatos", usuarioController.recuperarDatosPregunta);
  app.put("/api/usuario/cambiarPass", usuarioController.establecerNuevaContraseña);

  //recetas
  app.get("/api/receta/list", recetaController.list);
  app.get(
    "/api/receta/find/:usuario_id",
    auth,
    recetaController.find_by_user_id
  );
  app.post("/api/receta/create", auth, recetaController.create);
  app.get("/api/receta/ingredient", recetaController.find_by_ingredient);
  app.put("/api/receta/update_recepie", auth, recetaController.update_recepie);
  app.get("/api/receta/anything", recetaController.find_by_anything);
  app.get("/api/receta/receta_id/:receta_id", recetaController.recepie_by_id);
  app.delete(
    "/api/receta/delete/:receta_id",
    auth,
    recetaController.delete_recepie
  );
  app.delete("/api/receta/cats/:receta_id", auth, categoriaController.delete);
  app.delete("/api/receta/ings/:receta_id", auth, ingredienteController.delete);
  app.get("/api/receta/ingredient/:ingrediente", recetaController.find_by_ingredient); //nuevo3
  app.get("/api/receta/titulo", recetaController.find_by_titulo); //nuevo3
  app.get("/api/receta/categoria/:categoria", recetaController.find_by_category); //nuevo3
  app.get("/api/receta/dificultad", recetaController.find_by_dificultad);

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
