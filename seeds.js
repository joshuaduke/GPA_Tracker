let mongoose  = require("mongoose");
let Semester  = require("./models/semesters");
let Course    = require("./models/courses");
let Grade     = require("./models/grades"); 

//create default data for the Semester Collection
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
  Semester.deleteMany({}, (err)=>{
    if(err){
      console.log(err);
    }
    console.log("Removed All Semesters");

    //remove all courses
    Course.deleteMany({}, (err)=>{
      if(err){
        console.log(err);
      }
      console.log("Removed All Courses");

      Grade.deleteMany({}, (err)=>{
        if(err){
          console.log(err);
        }
        console.log("Removed All Grades");
      })
    });

    //add a few semesters
    semesterData.forEach((term)=>{
      //create a semester
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

            // Create a grade
            Grade.create({
              assignmentName: "Test1",
              weight:25,
              grade: 93

            }, (err, grade)=>{
              if(err){
                console.log(err);
              } else {
                course.grades.push(grade);
                course.save();
                console.log("Create a new grade");
              }
            });
          }
        });
      }
    });
    });
  });
}


module.exports = seedDB;