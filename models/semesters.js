//SCHEMA SETUP
let mongoose = require('mongoose');

let semesterSchema = new mongoose.Schema({
  name: String,
  year: Number,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
});

module.exports = mongoose.model("Semester", semesterSchema);