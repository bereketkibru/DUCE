const { default: AdminBro } = require("admin-bro");
const AdminBroMongoose = require("admin-bro-mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const qanda = require("../QandA/QandAmodel");
const user = require("../user/userModel");
const profile = require("../profile/profileModel");
const post = require("../post/postModel");
const forum = require("../forum/forumModel");
const ann = require("../announcement/annModel");

const options = {
  resources: [qanda, user, profile, post, forum, ann],
};
module.exports = options;
