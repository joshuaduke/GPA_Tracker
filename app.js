let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Course = require("./models/courses");
let bodyParser = require("body-parser");
let methodOverride = require('method-override');


mongoose.connect("mongodb://localhost/gpatracker", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method")); //look for _method take whatever its equal to and treat that request as a put or delete request

app.get("/", (req, res)=>{
  res.send("This is a gpa app");
});

//INDEX ROUTE -- display all courses
app.get("/courses", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("index", {courses: allCourses})
    }
  });
});

//NEW ROUTE -- add or delete new courses
app.get("/courses/new", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("new", {courses: allCourses})
    }
  });
});

//NEW COURSES ROUTE -- add a new course
app.get("/courses/newCourses", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("newCourses", {courses: allCourses})
    }
  });
});

//CREATE ROUTE
app.post("/courses", (req, res)=>{
  //get data from form and add to courses array
  let name = req.body.name;
  let courseGrade = req.body.courseGrade;
  let newCourses = {name:name , courseGrade:courseGrade};

  //create a new course and save to database
  Course.create(newCourses, (err, newlyCreated)=>{
    if(err){
      console.log("Create route error");
    } else {
      //redirect back to courses
      res.redirect("/courses");
    }
  })
}); 

//SHOW ROUTE 
app.get("/courses/:id", (req, res)=>{
  Course.findById(req.params.id, (err, foundCourse)=>{
    if(err){
      console.log("Show route error");
      console.log(err);
    } else {
      console.log(foundCourse);
      res.render("show", {course: foundCourse});
    }
  });
});

//EDIT ROUTE - Edit a specific route
app.get("/courses/:id/edit", (req, res)=>{
  Course.findById(req.params.id, (err, foundCourse)=>{
    if(err){
      res.redirect("/courses");
    } else {
      res.render("edit", {course:foundCourse});
    }
  });
});

//UPDATE ROUTE
app.put("/courses/:id", (req, res)=>{
 Course.findByIdAndUpdate(req.params.id ,req.body.course, (err, updatedCourse)=>{
  if(err){
    console.log("UPDATE ROUTE Error");
  } else {
    res.redirect("/courses/" + req.params.id);
  }
 });
});

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