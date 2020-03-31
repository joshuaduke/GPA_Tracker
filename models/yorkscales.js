let mongoose = require('mongoose');

let yorkScaleSchema = new mongoose.Schema({
  name:  String,
  grade:           Number,
  weight:          Number
});

module.exports = mongoose.model("Grade", gradeSchema);