var router = require("express").Router();
var logger = require("../../util/logger");

//@route   GET api/post/test
//@desc    Test post route
//@access  Public
router.get("/", (req, res) => res.send("hello from post"));
module.exports = router;
