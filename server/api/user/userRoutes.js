var router = require("express").Router();
var logger = require("../../util/logger");

//@route   GET api/users/test
//@desc    Test post route
//@access  Public
router.get("/test", (req, res) => res.send("hello from users"));
module.exports = router;
