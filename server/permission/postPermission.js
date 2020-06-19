function canCreatePost(user) {
  return user.role === "Admin" || user.role === "Moderator";
}

function canDeletePost(user, post) {
  console.log(post.writer, user.id);
  return post.writer.toString() === user.id || user.role === "Admin";
}

module.exports = {
  canCreatePost,
  canDeletePost,
};
