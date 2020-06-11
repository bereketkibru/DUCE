const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//Create Schema
const QandaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    default: Date.now,
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
QandaSchema.plugin(timestamps);
module.exports = Qanda = mongoose.model("qanda", QandaSchema);
