const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: String,
    default: "Unknown user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
