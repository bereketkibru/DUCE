const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//Create Schema
const blogSchema = mongoose.Schema({
  content: {
    type: String,
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
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
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
