let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require("body-parser");
let methodOverride = require('method-override');
let seedDB = require('./seeds');

//Models
let Semester = require("./models/semesters");
let Course = require("./models/courses");
let Grade = require("./models/grades");

mongoose.connect("mongodb://localhost/gpatracker", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method")); //look for _method take whatever its equal to and treat that request as a put or delete request
seedDB();

app.get("/", (req , res)=>{
  res.redirect("/semesters");
});

//======================================================
// -------------   REST ROUTES FOR SEMESTERS ----------- 
//======================================================

  // INDEX ROUTE -- display all semesters
app.get("/semesters", (req, res)=>{
  Semester.find({}, (err, allSemesters)=>{
    if(err){
      console.log("Main Route Error");
      console.log("err");
    } else {
      res.render("semesters/index", {semesters: allSemesters});
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
      res.render("semesters/new", {semesters: allSemesters})
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

  // SHOW SEMESTER ROUTE -- display all courses
  app.get("/semesters/:id", (req, res)=>{
    //find semester with provided ID
    Semester.find(req.params.id, (err, foundSemester)=>{
      if(err){
        console.log(err)
      } else {
        res.render("semesters/show", {semester: foundSemester});
      }
    })
  });


  // EDIT SEMESTER ROUTE -- Show edit form for a semester
  app.get("/semesters/:id/edit", (req , res)=>{
    Semester.find({}, (err, allSemesters)=>{
      if(err){
        console.log(err);
      } else {
        res.render("semesters/edit", {semesters: allSemesters});
      }
    });
  }); 

  // UPDATE SEMESTER ROUTE -- Update a semester then redirect PUT
  app.put("/semesters/:id/", (req , res)=>{

  }); 
  // DESTROY SEMESTER ROUTE -- Delete a dog then redirect
  app.delete("/semesters/:id", (req , res)=>{

  }); 

// ====================================
// ------ REST ROUTES FOR COURSES -----
// ====================================
 
// INDEX ROUTE -- Display all courses
app.get("/semesters/:id/courses", (req, res)=>{
  Semester.findById(req.params.id).populate("courses").exec((err, allCourses)=>{
    if(err){
      console.log(err);
    } else {
      console.log("===== ALL COURSES ======")
      console.log(allCourses);
      res.render("courses/index", {semester: allCourses});
    }
  });
}); 

// NEW ROUTE -- Display form to create new course
app.get("/semesters/:id/courses/new", (req, res)=>{
  console.log("===== BODY =====")
  Semester.findById(req.params.id).populate("courses").exec((err, allCourses)=>{
  if(err){
    console.log(err);
  } else {
    res.render("courses/new", {semester: allCourses});
  }
  });
});

// CREATE ROUTE -- Add new course to the Database
app.post("/semesters/:id/courses", (req, res)=>{
  Semester.findById(req.params.id, (err, semester)=>{
    if(err){
      console.log(err);
    } else {
      //create new course
      Course.create(req.body.course, (err, course)=>{
        if(err){
          console.log(err)
        } else {
          //connect course to semester
          semester.courses.push(course);
          semester.save();

          res.redirect("/semesters/"+semester._id+"/courses");
        }
      });
    }
  });
});

// ====================================
// ------ REST ROUTES FOR GRADES ------
// ====================================


// INDEX ROUTE -- Display all Grades
app.get("/semesters/:id/courses/:courseid/grades", (req, res)=>{
  Course.findById(req.params.courseid).populate("grades").exec((err, allGrades)=>{
    if(err){
      console.log(err);
    } else {
      console.log("===== ALL GRADES ======");
      console.log(allGrades)
      res.render("grades/index", {allGrades: allGrades});
    }
  });
}); 


// add a new grade
// let web322 = new Grade({
//   grades: [98, 76, 83, 54]
// });

// web322.save((err, grade)=>{
//   if(err){
//     console.log(err);
//   } else {
//     console.log("======= GRADE ======");
//     console.log(grade);
//   }
// });



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