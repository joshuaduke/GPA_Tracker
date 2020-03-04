
let mongoose = require('mongoose');

let gradeSchema = new mongoose.Schema({
  assignmentName: String,
  grades: [Number]
});

module.exports = mongoose.model("Grade", gradeSchema);