
let mongoose = require('mongoose');

let gradeSchema = new mongoose.Schema({
  assignmentName:  String,
  grade:           Number,
  weight:          Number
});

module.exports = mongoose.model("Grade", gradeSchema);