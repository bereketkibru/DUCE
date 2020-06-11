const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//Create Schema
const AnnSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
AnnSchema.plugin(timestamps);
module.exports = Ann = mongoose.model("ann", AnnSchema);
