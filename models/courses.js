//SCHEMA SETUP
let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
  name: String,
  courseGrade: Number
});

module.exports = mongoose.model("Course", courseSchema);