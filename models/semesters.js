//SCHEMA SETUP
let mongoose = require('mongoose');

let semesterSchema = new mongoose.Schema({
  name: String,
  year: Number
});

module.exports = mongoose.model("Semester", semesterSchema);