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