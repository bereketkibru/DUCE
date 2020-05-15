var router = require("express").Router();
var logger = require("../../util/logger");

//@route   GET api/profile/test
//@desc    Test Profile route
//@access  Public
router.get("/", (req, res) => res.send("hello from profile"));
module.exports = router;
