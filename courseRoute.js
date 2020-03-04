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


//SHOW PAGE

<main>
  <div class="container_nav">
    <ul>
      <li><a href="/courses"> Courses </a></li>
    </ul>
    <ul>
      <li><a href="/courses/<%=semester._id %>/edit">Edit </a></li>
    </ul>
  </div>

  <div id="courses_container">
    <p> <%= semester.name %></p>
    <% console.log("=========== SHOW PAGE ==========") %>
    <% console.log(courses) %>

    <% courses.forEach((course)=>{ %>

      <div>
        <a class="card" href="/semesters/<%=semester._id%>/course">
          <p class="course_name">
            <i class="fas fa-school"></i> 
            <%= semester.name %>
            
          </p> 
          <p><span><%= semester.courseGrade %> </span> % </p> 
        </a>
      </div>
      
    <% }) %>
  </div>
</main>



// ====================================
// ------ REST ROUTES FOR COURSES -----
// ====================================

//SHOW ROUTE -- display a course
app.get("/semesters/:id/course/:id", (req, res)=>{
  Course.findById(req.params.id, (err, foundSemester)=>{
    console.log(foundSemester);
    if(err){
      console.log(err);
    } else{
      res.render("courses/show", {semester: foundSemester})

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
      res.render("courses/new", {courses: allCourses})
    }
  });
});

//NEW COURSES ROUTE -- display new course form
app.get("/courses/newCourses", (req, res)=>{
  Course.find({}, (err, allCourses)=>{
    if(err){
      console.log(err);
    } else{
      res.render("courses/newCourses", {courses: allCourses})
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
      res.render("courses/show", {course: foundCourse});
    }
  });
});

//EDIT ROUTE - Edit a specific course
app.get("/courses/:id/edit", (req, res)=>{
  Course.findById(req.params.id, (err, foundCourse)=>{
    if(err){
      res.redirect("/courses");
    } else {
      res.render("courses/edit", {course:foundCourse});
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
  res.render("courses/newGrade")
});


// ======== COURSES NEW ROUTE ====== //
<main>
  <div class="container_nav">
    <ul>
      <li><a href="/"> Semesters </a></li>
    </ul>
    <ul>
      <li><a href="/courses">Done </a></li>
    </ul>
  </div>

  <div id="courses_container">
    <a href="/courses/newCourses">
      <i class="fas fa-plus-circle"></i>New Course
    </a>

    <% semester.courses.forEach((course)=>{ %>
      <div class="course">
        <p>
          <form action="/courses/<%= course._id%>?_method=DELETE" method="POST">
            <button><i class="fas fa-minus-circle"></i></button>
          </form>
          <%= course.name %> 
        </p>
        <p><span><%= course.courseGrade %> </span> % </p>
      </div>
      <hr>
    <% }) %>
  </div>
</main>