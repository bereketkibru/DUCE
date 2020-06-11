const express = require("express");
const app = express();
const api = require("./api/api");
const config = require("./config/config");
const passport = require("passport");
const { default: AdminBro } = require("admin-bro");
const options = require("./api/admin/adminOptions");
const buildAdminRouter = require("./api/admin/adminRouter");

//DB Config
require("mongoose")
  .connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//setup the app middleware
require("./middleware/appMiddleware")(app);

//Passport config
require("./config/passport")(passport);

//setup the api
app.use("/api", api);
const admin = new AdminBro(options);
const router = buildAdminRouter(admin);
app.use(admin.options.rootPath, router);

module.exports = app;
