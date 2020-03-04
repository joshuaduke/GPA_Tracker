
let mongoose = require('mongoose');

let gradeSchema = new mongoose.Schema({
  assignmentName: String,
  grade:          Number

  // assignment: [
  //   {
  //     name: String,
  //     grade: Number
  //   }]
});

module.exports = mongoose.model("Grade", gradeSchema);