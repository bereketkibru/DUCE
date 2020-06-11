const { default: AdminBro } = require("admin-bro");
const { buildAuthenticatedRouter } = require("admin-bro-expressjs");
const { buildRouter } = require("admin-bro-expressjs");
const express = require("express");
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildRouter(admin);
  return router;
};

module.exports = buildAdminRouter;
