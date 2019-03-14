var list = [
  {
    item: "Lapte",
    marked: "no"
  },
  {
    item: "apa",
    marked: "no"
  },
  {
    item: "paine",
    marked: "no"
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
    if(list[i].marked === "no"){
      domList.innerHTML += `<li class="list-item d-flex justify-space">
        <p>${list[i].item}</p>
        <i class="fas fa-check-square mark" onclick="marked(${i})"></i>
      </li>`
    } else {
      domList.innerHTML += `<li class="list-item d-flex justify-space">
        <p class="striketrough">${list[i].item}</p>
        <i class="fas fa-check-square mark" onclick="marked(${i})"></i>
      </li>`
    }
  }

}

function addItem(){
  var input = document.querySelector("#add-input");
  var newItem = {};
  if(input.value !== ""){
    newItem.item = input.value;
    newItem.marked = "no";
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
  if(list[i].marked === "no"){
    list[i].marked = "yes";
    draw();
  } else {
    list[i].marked = "no";
    draw();
  }
}

initialize();
