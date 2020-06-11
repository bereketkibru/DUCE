function canCreateAnn(user) {
  return user.role === "Admin" || user.role === "Moderator";
}

function canDeleteAnn(user, ann) {
  return ann.user.toString() === user.id || user.role === "Admin";
}

module.exports = {
  canCreateAnn,
  canDeleteAnn,
};
