const express = require("express");
const logger = require("morgan");
var cors = require("cors");
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require('express-session');
// This will be our application entry. We'll setup our server here.
const http = require("http");
const { DATE } = require("sequelize");
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "All looks good",
  })
);

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Setup server port
var port = 8000;
// Escuchar en el puerto
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto', port);
});
module.exports = app;
