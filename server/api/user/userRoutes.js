var router = require("express").Router();
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../../config/config");
var passport = require("passport");

//Load input validation
const validateRefisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load user model
const User = require("./userModel");

//@route   GET api/users/test
//@desc    Test post route
//@access  Public
router.get("/test", (req, res) => res.send("hello from users"));

//@route   GET api/users/register
//@desc    Register user
//@access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRefisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm", //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route   GET api/users/login
//@desc    Login user/ Rwturning Jwt token
//@access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        }; //create jwt payload
        //Sign Token
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});
//@route   GET api/users/current
//@desc    Return currnt user
//@access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
