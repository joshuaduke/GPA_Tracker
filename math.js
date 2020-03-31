// Try edit message
let w1 = 30;
let w2 = 15;
let w3 = 50;
let w4 = 5;

let g1 = "";
let g2 = 80;
let g3 = "";
let g4 = 75;

let weight = [w1, w2, w3, w4]
let grades = [g1, g2, g3 , g4]
let grade = 0;
let divide = 100;
let ifDivision = []
let totalGrade = 0;

for(let i = 0; i < grades.length; i++){
  totalGrade += (((weight[i]*grades[i])))
  console.log("weight:" + "-" +i+ "-" +weight[i])
  if (grades[i] == ""){
    ifDivision.push(weight[i])
  console.log("ifdivision: ", ifDivision)
  }
}

let sumDiv = ifDivision.reduce((a,b)=>{
  return a + b;
}, 0);
sumDiv = (100-sumDiv)/100;

console.log("SumDiv", sumDiv)

console.log("Divide", divide);
totalGrade = ((totalGrade/ divide) / sumDiv)

test = ((w1*g1)+(w2*g2)+(w3*g3)+(w4*g4)) / 100
console.log("Test", test)
console.log("ttGrade", totalGrade);


let yorkScale = 
[
  {letterGrade: "A+", gradePoint: 9.0},
  {letterGrade: "A",  gradePoint: 8.0},
  {letterGrade: "B+", gradePoint: 7.5},
  {letterGrade: "B",  gradePoint: 6.0},
  {letterGrade: "C+", gradePoint: 5.5},
  {letterGrade: "C",  gradePoint: 4.0},
  {letterGrade: "D+", gradePoint: 3.5},
  {letterGrade: "D",  gradePoint: 2.0},
  {letterGrade: "E",  gradePoint: 1.0},
  {letterGrade: "F",  gradePoint: 0.0},
]

//Display york scale 

function displayScale(){
  let gpa_scales = document.querySelector("#gpa_scales");
  let selectedScale = gpa_scales.options[gpa_scales.selectedIndex].value;

  if (selectedScale === "yorkScale"){
    yorkScale.forEach((grade)=>{
    let pTag = document.createElement("p");
    let node = document.createTextNode(grade.letterGrade);

    let gPoint = document.createTextNode(grade.gradePoint);

    pTag.appendChild(node);
    pTag.appendChild(gPoint);
    york.appendChild(pTag);
});

  } else {
    console.log("seneca scale");
  }
}

let senecaScale =
[
  {letterGrade: "A+", gradePoint: 4.0},
  {letterGrade: "A",  gradePoint: 4.0},
  {letterGrade: "B+", gradePoint: 3.5},
  {letterGrade: "B",  gradePoint: 3.0},
  {letterGrade: "C+", gradePoint: 2.5},
  {letterGrade: "C",  gradePoint: 2.0},
  {letterGrade: "D+", gradePoint: 1.5},
  {letterGrade: "D",  gradePoint: 1.0},
  {letterGrade: "F",  gradePoint: 0.0},
]



