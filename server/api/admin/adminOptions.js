const { default: AdminBro } = require("admin-bro");
const AdminBroMongoose = require("admin-bro-mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const qanda = require("../QandA/QandAmodel");
const user = require("../user/userModel");
const profile = require("../profile/profileModel");
const post = require("../post/postModel");
const forum = require("../forum/forumModel");
const ann = require("../announcement/annModel");
const { after, before } = require("./actions/action");

const options = {
  resources: [
    {
      resource: user,
      options: {
        properties: {
          password: {
            isVisible: false,
          },
          plainPassword: {
            type: "password",
          },
        },
        actions: {
          new: {
            after,
            before,
          },
          edit: {
            after,
            before,
          },
        },
      },
    },
    { resource: profile },
    { resource: post },
    { resource: ann },
    { resource: forum },
    { resource: qanda },
  ],
  branding: {
    logo:
      "//www.gravatar.com/avatar/f4be6c67e8a4bd3b090c7e487f1a1cd6?s=200&r=pg&d=mm",
    companyName: "DUCeConnector",
  },
};
module.exports = options;
