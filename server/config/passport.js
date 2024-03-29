const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwr = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const config = require("../config/config");

const opts = {};
opts.jwtFromRequest = ExtractJwr.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
