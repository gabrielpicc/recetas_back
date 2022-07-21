var express = require("express");
var cors = require("cors");
var app = express();
const logger = require("morgan");
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true
 }

app.use(cors(corsOptions));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain)
// Log requests to the console.
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./routes")(app);

app.get("/", (req, res) =>
  res.status(200).send({
    message: "All looks good",
  })
);

// Setup server port
var port = 8000;
app.set("port", port);
// Escuchar en el puerto
app.listen(port, () => {
  console.log("Servidor iniciado en el puerto", port);
});
module.exports = app;
