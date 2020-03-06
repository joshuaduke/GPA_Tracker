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



