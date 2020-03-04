//SCHEMA SETUP
let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
  name: String,
  courseGrade: Number,
  grades: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade"
  }]
});

module.exports = mongoose.model("Course", courseSchema);