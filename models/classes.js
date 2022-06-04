const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Classes", classesSchema);
