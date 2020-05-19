const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QandaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  question: {
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
  lock: {
    type: Boolean,
    default: false,
  },

  answers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      answer: {
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
        type: Boolean,
        default: false,
      },
    },
  ],
});
module.exports = Qanda = mongoose.model("qanda", QandaSchema);
