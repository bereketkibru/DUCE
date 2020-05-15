var router = require("express").Router();
router.use("/users", require("./user/userRoutes"));
router.use("/profile", require("./profile/profileRoutes"));
router.use("/posts", require("./post/postRoute"));

router.get("/", (req, res) => res.send("hello from api"));

module.exports = router;
