const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ForumSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    deafault: Date.now,
  },
  status: {
    type: String,
    default: "wating",
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  threads: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        default: "wating",
      },
    },
  ],
});
module.exports = Forum = mongoose.model("forum", ForumSchema);
