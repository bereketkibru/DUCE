var router = require("express").Router();

//@route   GET api/post/test
//@desc    Test post route
//@access  Public
router.get("/", (req, res) => res.send("hello from post"));
module.exports = router;
