const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

//setup global middleware here

module.exports = function (app) {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
};
