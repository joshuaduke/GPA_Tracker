let mongoose = require("mongoose");
let Course  = require("./models/courses");
let Semester = require("./models/semesters");

let semesterData = [
  {
    name: "Summer",
    year: 2019  
  },
  {
    name: "Fall",
    year: 2019
  }
]

function seedDB(){
  //remove all semesters
  Semester.remove({}, (err)=>{
    if(err){
      console.log(err);
    }
    console.log("Removed All Semesters");

    //remove all courses
    Course.remove({}, (err)=>{
      if(err){
        console.log(err);
      }
      console.log("Removed All Courses");
    });

    //add a few semesters
    semesterData.forEach((term)=>{
    Semester.create(term, (err, semester)=>{
      if(err){
        console.log(err);
      } else {
        console.log("Added a Semester");

        //create a course
        Course.create({
          name: "WEB222",
          courseGrade: "95"
        }, (err, course)=>{
          if(err){
            console.log(err);
          } else {
            semester.courses.push(course);
            semester.save();
            console.log("Created a new course");
          }
        })
      }
    })
    });


  });
}


module.exports = seedDB;