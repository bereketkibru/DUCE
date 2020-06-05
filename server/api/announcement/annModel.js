const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AnnSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
  },
});
module.exports = Ann = mongoose.model("ann", AnnSchema);
