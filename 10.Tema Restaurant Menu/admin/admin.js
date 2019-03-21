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
    if(method === "DELETE"){
      alert(`Elementul "${deletedItem}" a fost sters`);
      getListAjax();
    }
    else if(method !== "GET"){
      getListAjax();
    } else {
      drawList(json);
    }
  })
}

function drawList(response){
  let listContainer = document.querySelector("#content");
  listContainer.innerHTML = "";
  for (let item in response){
    if(response.hasOwnProperty(item) && response[item].existsInSearch !== "no"){
      listContainer.innerHTML += `
      <div class="list-item d-flex justify-between flex-wrap">
        <div class="col-md-4 col-xs-12 d-flex justify-center">
          <img src="${response[item].imagine}" onclick="editDetails('${item}')" title="Click to Edit">
        </div>
        <div class="col-sm-4 col-xs-12 align-self-center item-name-ingredients">
          <p class="item-name">${response[item].nume}</p>
          <p class="list-ingredients">${response[item].ingrediente}</p>
        </div>
        <div class="col-sm-2 col-xs-12 d-flex justify-around align-self-center">
          <button class="button-class" onclick="editDetails('${item}')">Edit</button>
          <button class="button-class" onclick="deleteEntry('${item}')">Delete</button>
        </div>
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
    <div id="popup-window" class="col-xs-11 col-md-6 ">
      <div class="col-xs-12 d-flex justify-center">
        <label class="col-xs-11" for="">Title: <br><input id="title-input" type="text" value="${response[idx].nume}"></label>
      </div>
      <div class="col-xs-12 d-flex justify-center">
        <label class="col-xs-11" for="">Image Link: <br><input id="image-input" type="text" value="${response[idx].imagine}"></label>
      </div>
      <div class="col-xs-12 d-flex justify-center">
        <label class="col-xs-11" for="">Ingredients: <textarea id="ingredients-input" class="col-xs-12" name="name">${response[idx].ingrediente}</textarea></label>
      </div>
      <div class="col-xs-12 d-flex justify-center">
        <label class="col-xs-11" for="">Recipe: <textarea id="recipe-input" class="col-xs-12" name="name">${recipeHTMLToText(response[idx].reteta)}</textarea></label>
      </div>
      <div class="col-xs-12 d-flex justify-around">
        <button class="button-class" onclick="hideDetails()">Back</button>
        <button class="button-class" onclick="saveEntry('${idx}','${method}')">Save</button>
      </div>
    </div>
    `
  } else {
    method = "POST";

    detailsContainer.innerHTML = `
    <div id="popup-window" class="col-xs-11 col-md-6 ">
    <div class="col-xs-12 d-flex justify-center">
      <label class="col-xs-11" for="">Title: <br><input id="title-input" type="text" value=""></label>
    </div>
    <div class="col-xs-12 d-flex justify-center">
      <label class="col-xs-11" for="">Image Link: <br><input id="image-input" type="text" value=""></label>
    </div>
    <div class="col-xs-12 d-flex justify-center">
      <label class="col-xs-11" for="">Ingredients: <textarea id="ingredients-input" class="col-xs-12" name="name"></textarea></label>
    </div>
    <div class="col-xs-12 d-flex justify-center">
      <label class="col-xs-11" for="">Recipe: <textarea id="recipe-input" class="col-xs-12" name="name"></textarea></label>
    </div>
      <div class="col-sm-9 col-xs-11">
        <button class="button-class" onclick="hideDetails()">Back</button>
        <button class="button-class" onclick="saveEntry(${undefined},'${method}')">Save</button>
      </div>
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
  recipe = recipeTextToHTML(recipe.value)

  let newObject = {
    nume: title.value,
    imagine: image.value,
    ingrediente: ingredients.value,
    reteta: recipe
  }

  getListAjax(idx,method,JSON.stringify(newObject));

  hideDetails();
}

function deleteEntry(idx){
  if(confirm("Are you sure you want to delete this entry?")){
    window.deletedItem = response[idx].nume;
    getListAjax(idx,"DELETE");
  }
}

function recipeTextToHTML(recipe){
  recipe = recipe.split("\n");
  recipe = recipe.join("<br>");
  return recipe;
}

function recipeHTMLToText(recipe){
  recipe = recipe.split("<br>");
  recipe = recipe.join("\n");
  return recipe;
}
