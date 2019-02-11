function preventD(event){
  event.preventDefault();
}

function exercitiu1(){
  var input1 = document.querySelector("[name='input1']");
  var input2 = document.querySelector("[name='input2']");

  if(input1.value === input2.value){
    input1.classList.add("green-background");
    input2.classList.add("green-background");
  } else {
    input1.classList.remove("green-background");
    input2.classList.remove("green-background");
  }
}

function exercitiu2() {
  var input1 = document.querySelector("[name='input3']");
  var input2 = document.querySelector("[name='input4']");

  if(isNaN(input1.value) || isNaN(input2.value)){
    input1.classList.remove("green-background");
    input2.classList.remove("green-background");
  } else if(parseInt(input1.value) > parseInt(input2.value)){
    input1.classList.add("green-background");
    input2.classList.remove("green-background");
  } else if(parseInt(input1.value) < parseInt(input2.value)){
    input1.classList.remove("green-background");
    input2.classList.add("green-background");
  } else {
    input1.classList.add("green-background");
    input2.classList.add("green-background");
  }
}

function exercitiu3() {
  var input1 = document.querySelector("[name='input5']");
  var input2 = document.querySelector("[name='input6']");
  var input3 = document.querySelector("[name='input7']");

  if(isNaN(input1.value) || isNaN(input2.value) || input1.value === "" || input2.value === ""){
    input3.value = "introduceti doua numere";
  } else if(parseInt(input1.value) > parseInt(input2.value)){
    input3.value = input1.value;
  } else if(parseInt(input1.value) < parseInt(input2.value)){
    input3.value = input2.value;
  } else {
    input3.value = "input1 este egal cu input2";
  }
}

function exercitiu4() {
  var input1 = document.querySelector("[name='input8']");
  var input2 = document.querySelector("[name='input9']");
  var input3 = document.querySelector("[name='input10']");

  if(isNaN(input1.value) || isNaN(input2.value) || input1.value === "" || input2.value === ""){
    input3.value = "introduceti doua numere";
  } else {
    input3.value = parseInt(input1.value) + parseInt(input2.value);
  }
}

function exercitiu5() {
  var input1 = document.querySelector("[name='input11']").value;
  document.querySelector("#text-length").innerHTML  = input1.length + " characters";
}

function exercitiu6(event) {
  var input1 = document.querySelector("[name='input12']");
  document.querySelector("#text-length1").innerHTML  = input1.value.length + " characters";

  input1.onkeypress = function(event) {
    if(input1.value.length >= 10){
      event.preventDefault();
      document.querySelector("#text-length1").classList.add("red-color");
    }
  }
}

function exercitiu7(event) {
  if(event.keyCode < 47 || event.keyCode > 58 ){
    event.preventDefault();
  }
}

function schimbaImaginea(){
  var casute = document.querySelectorAll("td");
  var gol = "http://static.wixstatic.com/media/b77fe464cfc445da9003a5383a3e1acf.jpg";
  var x = "http://www.drodd.com/images14/x12.jpg";
  for(let i = 0; i < casute.length; i++){
    casute[i].innerHTML = `<img src=${gol}>`;
  }

  var imagini = document.querySelectorAll("img")
  for(let i = 0; i < imagini.length; i++){
    imagini[i].addEventListener("mouseenter", function(){
      this.src = x;
    })
    imagini[i].addEventListener("mouseleave", function(){
      this.src = gol;
    })
  }
}

schimbaImaginea();
