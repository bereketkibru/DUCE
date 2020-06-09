function canDeleteForum(user, forum) {
  return (
    forum.user.toString() === user.id ||
    user.role === "Admin" ||
    user.role === "Moderator"
  );
}

module.exports = {
  canDeleteForum,
};
