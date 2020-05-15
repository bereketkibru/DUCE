const express = require("express");
const app = express();
const api = require("./api/api");
const config = require("./config/config");

var logger = require("./util/logger");

//DB Config
require("mongoose")
  .connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//setup the app middleware
require("./middleware/appMiddleware")(app);

//setup the api
app.use("/api", api);
//app.use('./auth',auth)

app.get("/", (req, res) => res.send("hello"));

app.use(function (err, req, res, next) {
  //if error thrown from Jwr validation check
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invlaid token");
    return;
  }
  logger.error(err.stack);
  res.status(500).send("oops");
});
module.exports = app;
