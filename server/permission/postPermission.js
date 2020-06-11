function canCreatePost(user) {
  return user.role === "Admin" || user.role === "Moderator";
}

function canDeletePost(user, post) {
  return post.user.toString() === user.id || user.role === "Admin";
}

module.exports = {
  canCreatePost,
  canDeletePost,
};
