var list = [

];
var actualStudent;

function initialize(){
  draw();
  addInit();
}

function addInit(){
  var addButton = document.querySelector("#add-student");
  var addInput = document.querySelector("#add-student-input");
  var addGradeButton = document.querySelector("#add-grade");
  var addGradeInput = document.querySelector("#add-grade-input");
  var backButton = document.querySelector("#back");
  addButton.addEventListener("click",function(){
    addStudent();
  })
  addInput.addEventListener("keypress", function(e){
    if(e.key === "Enter" && addInput.value !== ""){
      addStudent();
    }
  })
  addGradeButton.addEventListener("click",function(){
    addGrade();
  })
  addGradeInput.addEventListener("keypress", function(e){
    if(e.key === "Enter" && addGradeInput.value !== ""){
      addGrade();
    }
  })
  backButton.addEventListener("click", function(){
    hideGrades();
  })
}


function addStudent(){
  var addInput = document.querySelector("#add-student-input");
  if(addInput.value !== ""){
    list.push(new Elev(addInput.value));
    addInput.value = "";
    draw();
  }
}

function draw(){
  var domList = document.querySelector("#list");
  domList.innerHTML = `<li class="list-item d-flex justify-between">
    <p class="item-name">Name</p>
    <p class="item-score">Average</p>
    <p class="item-name">Student grades</p>
  </li>`;
  for(let i = 0; i < list.length; i++){
    domList.innerHTML += `
    <li class="list-item d-flex justify-between">
      <p class="item-name">${list[i].name}</p>
      <p class="item-score">${list[i].average()}</p>
      <button type="button" name="button" onclick="studGrades(${i})">Student grades</button>
    </li>
    `
  }
}

function studGrades(index){
  actualStudent = index;
  var student = document.querySelector("#stud-title");
  student.innerText = list[index].name;
  drawGrades();
  var gradesSection = document.querySelector("#elev");
  var catSection = document.querySelector("#catalog");
  gradesSection.style.display = "flex";
  catSection.style.width = "50%";
}

function addGrade(){
  var addGradeInput = document.querySelector("#add-grade-input");
  if(typeof parseInt(addGradeInput.value) === "number" && 0 < parseInt(addGradeInput.value) && parseInt(addGradeInput.value) < 11){
    list[actualStudent].grades.push(parseInt(addGradeInput.value));
    addGradeInput.value = "";
    drawGrades();
    draw();
  }
}

function drawGrades(){
  var studentGrades = document.querySelector("#grades-list");
  studentGrades.innerHTML = "";
  for(let i = 0; i < list[actualStudent].grades.length; i++){
    studentGrades.innerHTML += `
    <li class="list-item d-flex justify-between">
      <p class="item-score">${list[actualStudent].grades[i]}</p>
    </li>
  `
  }
}

function hideGrades(){
  var gradesSection = document.querySelector("#elev");
  var catSection = document.querySelector("#catalog");
  gradesSection.style.display = "none";
  catSection.style.width = "100%";
}

function sort(id){
  switch (id) {
    case "studUp":
      list.sort(function(a,b){
        var a = a.average();
        var b = b.average();
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }

        return 0;
      })
      draw();
      break;
    case "studDown":
      list.sort(function(a,b){
        var a = a.average();
        var b = b.average();
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }

        return 0;
      })
      draw();
      break;
    case "gradeUp":
      list[actualStudent].grades.sort(function(a,b){

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }

        return 0;
      })
      drawGrades();
      break;
    case "gradeDown":
      list[actualStudent].grades.sort(function(a,b){

        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }

        return 0;
      })
      drawGrades();
      break;
  }
}

initialize();
