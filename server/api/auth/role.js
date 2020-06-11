function authRole(role1) {
  return (req, res, next) => {
    if (req.user.role !== role1) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

module.exports = {
  authRole,
};
