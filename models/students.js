const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Countries",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Students", studentsSchema);
