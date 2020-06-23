const { default: AdminBro } = require("admin-bro");
const { buildAuthenticatedRouter } = require("admin-bro-expressjs");
const { buildRouter } = require("admin-bro-expressjs");
const express = require("express");
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const User = require("../user/userModel");

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookieName: "admin-bro",
      cookiePassword: "superlongandcomplicatedname",
      authenticate: async (email, password) => {
        const user = await User.findOne({ email });
        if (user && bcrypt.compare(password, user.password)) {
          if (user.role === "Admin") {
            return user.toJSON();
          }
        }
        return null;
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }
  );
  return router;
};

module.exports = buildAdminRouter;
