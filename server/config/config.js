var _ = require("lodash");

// deafult config object for our api
var config = {
  dev: "development",
  port: process.env.PORT || 5000,
  db: {
    url: "mongodb://localhost:27017/DUCE? retryWrites=true",
  },
  secretOrKey: "bknm",
};

// check to see if the NODE_ENV was set, if not, the set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;
module.exports = config;
