var router = require("express").Router();
router.use("/users", require("./user/userRoutes"));
router.use("/profile", require("./profile/profileRoutes"));
router.use("/posts", require("./post/postRoute"));
router.use("/announcement", require("./announcement/annRoute"));
router.use("/forums", require("./forum/forumRoute"));
router.use("/qandas", require("./QandA/QandARoute"));
router.get("/", (req, res) => res.send("hello from api"));

module.exports = router;
