let response = [];

function initialize(){
  searchButtonInit();
  getListAjax();
}

function searchButtonInit(){
  let searchButton = document.querySelector("#search-input");
  searchButton.addEventListener("keyup",function(){
    search();
  })
}

function getListAjax(idx, method, body){
  if(!idx){
    idx = "";
  }

  if(!method){
      method = "GET";
  }

  if(!body){
    body = null;
  }

  fetch(`https://restaurant-menu-beb6c.firebaseio.com/menu/${idx}.json`,{
    method: method,
    body: body
  })
  .then(response => response.json())
  .then(json => {
    response = json;
    drawList(json);
  })
}

function drawList(response){
  let listContainer = document.querySelector("#content");
  listContainer.innerHTML = "";
  for (let item in response){
    if(response.hasOwnProperty(item) && response[item].existsInSearch !== "no"){
      listContainer.innerHTML += `
      <div class="list-item d-flex justify-between flex-wrap">
        <div class="col-sm-4 col-xs-12">
          <img src="${response[item].imagine}">
        </div>
        <div class="col-sm-4 col-xs-12 align-self-center">
          <p class="item-name">${response[item].nume}</p>
          <p class="list-ingredients">${response[item].ingrediente}</p>
        </div>
        <button class="button-class align-self-center" onclick="editDetails('${item}')">Edit</button>
        <button class="button-class align-self-center" onclick="deleteEntry('${item}')">Delete</button>
      </div>
      `
    }
  }
}

function editDetails(idx){
  let detailsContainer = document.querySelector("#popup-container");
  detailsContainer.style.display = "flex";

  let method = "";

  if(idx){
    method = "PUT";

    detailsContainer.innerHTML = `
    <div id="popup-window">
      <div class="col-sm-9 col-xs-11">
        <input id="title-input" type="text" value="${response[idx].nume}">
      </div>
      <div class="col-sm-9 col-xs-11">
        <input id="image-input" type="text" value="${response[idx].imagine}">
      </div>
      <div class="col-sm-9 col-xs-11">
        <textarea id="ingredients-input" name="name">${response[idx].ingrediente}</textarea>
      </div>
      <div class="col-sm-9 col-xs-11">
        <textarea id="recipe-input" name="name">${response[idx].reteta}</textarea>
      </div>

      <button class="button-class" onclick="hideDetails()">Back</button>
      <button class="button-class" onclick="saveEntry('${idx}','${method}')">Save</button>
    </div>
    `
  } else {
    method = "POST";

    detailsContainer.innerHTML = `
    <div id="popup-window">
      <div class="col-sm-9 col-xs-11">
        <input id="title-input" type="text" value="">
      </div>
      <div class="col-sm-9 col-xs-11">
        <input id="image-input" type="text" value="">
      </div>
      <div class="col-sm-9 col-xs-11">
        <textarea id="ingredients-input" name="name"></textarea>
      </div>
      <div class="col-sm-9 col-xs-11">
        <textarea id="recipe-input" name="name"></textarea>
      </div>

      <button class="button-class" onclick="hideDetails()">Back</button>
      <button class="button-class" onclick="saveEntry(${undefined},'${method}')">Save</button>
    </div>
    `
  }

  detailsContainer.addEventListener("click",function(){
    hideDetails();
  })

  let detailsPopup = document.querySelector("#popup-window");
  detailsPopup.addEventListener("click",function(){ //opreste bubblingul pe detailsContainer care inchide pagina
    event.stopPropagation();
  })
}

function hideDetails(){
  document.querySelector("#popup-container").style.display = "none";
}

function search(){
  var searchInput = document.querySelector("#search-input");
  for(element in response){
    var existsIngredients = (response[element].ingrediente).toLowerCase().indexOf((searchInput.value));
    var existsTitle = (response[element].nume).toLowerCase().indexOf(searchInput.value);
    if(existsIngredients === -1 && existsTitle === -1){
      response[element].existsInSearch = "no"
    } else{
      response[element].existsInSearch = "yes"
    }
  }
  drawList(response);
}

function saveEntry(idx,method){
  let title = document.querySelector("#title-input");
  let image = document.querySelector("#image-input");
  let ingredients = document.querySelector("#ingredients-input");
  let recipe = document.querySelector("#recipe-input");

  console.log(title.value);
  console.log(image.value);
  console.log(ingredients.value);
  console.log(recipe.value);
  console.log(idx);
  console.log(method);

  hideDetails();
}

function deleteEntry(){

}
