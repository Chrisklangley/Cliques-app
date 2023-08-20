const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  contentType: String,
  name: String,
});

module.exports = mongoose.model("Image", imageSchema);
