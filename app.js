let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Course = require("./models/courses");
let bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/gpatracker", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=>{
  res.send("This is a gpa app");
});

//INDEX ROUTE
app.get("/courses", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("index", {courses: allCourses})
    }
  });
} )

app.listen("3000", process.env.PORT, ()=>{
  console.log("This server has started");
})

//add a new course
// let oop345 = new Course({
//   name: "OOP345",
//   courseGrade: 85
// });

// oop345.save((err, course)=>{
//   if(err){
//     console.log("There has been an error");
//     console.log(err)
//   } else {
//     console.log("Course has been added");
//     console.log(course);
//   }
// });

//retrieve courses from database