let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require("body-parser");
let methodOverride = require('method-override');

//Models
let Course = require("./models/courses");
let Semester = require("./models/semesters");

mongoose.connect("mongodb://localhost/gpatracker", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method")); //look for _method take whatever its equal to and treat that request as a put or delete request

app.get("/", (req , res)=>{
  res.redirect("/semesters");
});

// -----   REST ROUTES FOR SEMESTERS ------ 

  // INDEX ROUTE -- display all semesters
app.get("/semesters", (req, res)=>{
  Semester.find({}, (err, allSemesters)=>{
    if(err){
      console.log("Main Route Error");
      console.log("err");
    } else {
      res.render("semestersIndex", {semesters: allSemesters});
    }
  }).sort({year: 'desc'}).exec((err, docs)=>{
    if(err){
      console.log(err);
    }
  });
});

  // NEW SEMESTER ROUTE -- display new semester form
app.get("/semesters/new", (req, res)=>{
  Semester.find({}, (err, allSemesters)=>{
    if(err){
      console.log(err);
    } else{
      res.render("semestersNew", {semesters: allSemesters})
    }
  });
});

  // CREATE SEMESTER ROUTE -- add a new semester to database
app.post("/semesters", (req, res)=>{
  //get data from semester form and add to an array
  let name = req.body.name;
  let year = req.body.year;
  let newSemester = {name:name, year:year};

  //create a new semester and add to db
  Semester.create(newSemester, (err, newlyCreated)=>{
    if(err){
      console.log("Semester Create Error");
      console.log(err);
    }else{
      res.redirect("/semesters");
    }
  })
});

  // SHOW SEMESTER ROUTE -- Show info on 1 semester
app.get("/semesters/:id", (req, res)=>{
  //add courses collection to the semesters collection
  //data associations
});  


// ------ REST ROUTES FOR COURSES -----

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

//NEW COURSES ROUTE -- display delete option for courses
// delete this route and change for javascript functionality
app.get("/courses/new", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("new", {courses: allCourses})
    }
  });
});

//NEW COURSES ROUTE -- display new course form
app.get("/courses/newCourses", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("newCourses", {courses: allCourses})
    }
  });
});

//CREATE ROUTE -- add new course
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

//EDIT ROUTE - Edit a specific course
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

//DELETE ROUTE
app.delete("/courses/:id", (req, res)=>{

  Course.findByIdAndDelete(req.params.id, (err)=>{
    if(err){
      console.log("Delete Error");
      console.log(err);
      res.redirect("/courses");
    } else {
      res.redirect("/courses/new");
    }
  });
});

// ----- REST ROUTES FOR GRADED WORK -----

//NEW GRADE ROUTE -- add a new Grade
app.get("/courses/newGrade", (req, res)=>{
  // Course.find({}, (err, allCourses)=>{
  //   if(err){
  //     console.log(err);
  //   } else{
  //     res.render("newGrade", {courses: allCourses})
  //   }
  // });
  res.render("newGrade")
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