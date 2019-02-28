var list = [
  {
    item: "Lapte"
  },
  {
    item: "apa"
  },
  {
    item: "paine"
  }
]

function initialize(){
  addInit();
  draw();
}

function addInit(){
  document.querySelector("#add-item").addEventListener("click", function(){
    addItem();
  });
  window.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
      addItem();
    }
  });
}

function draw(){
  var domList = document.querySelector("#list");
  domList.innerHTML = "";
  for(let i = 0; i < list.length; i++){
    domList.innerHTML += `<li class="list-item d-flex justify-space">
      <p>${list[i].item}</p>
      <i class="fas fa-check-square mark" onclick="marked(${i})"></i>
    </li>`
  }
}

function addItem(){
  var input = document.querySelector("#add-input");
  var newItem = {};
  if(input.value !== ""){
    newItem.item = input.value;
    list.push(newItem);
    input.value = ""
    draw();
  }
}

function sort(direction){
  if(direction === "az"){
    list.sort(function(a,b){
      var nameA = a.item.toUpperCase();
      var nameB = b.item.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  } else {
    list.sort(function(a,b){
      var nameA = a.item.toUpperCase();
      var nameB = b.item.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    });
  }
  draw();
}

function marked(i){
  var paragraphs = document.querySelectorAll("p");
  paragraphs[i].classList.toggle("striketrough");
}

initialize();
