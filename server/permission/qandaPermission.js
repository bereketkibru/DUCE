function canDeleteQanda(user, qanda) {
  return (
    qanda.user.toString() === user.id ||
    user.role === "Admin" ||
    user.role === "Moderator"
  );
}

module.exports = {
  canDeleteQanda,
};
