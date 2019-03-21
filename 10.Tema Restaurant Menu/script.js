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

function getListAjax(idx){
  fetch(`https://restaurant-menu-beb6c.firebaseio.com/menu/.json`)
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
        <div class="col-sm-4 col-xs-12 d-flex justify-center">
          <img src="${response[item].imagine}" onclick="drawDetails('${item}')">
        </div>
        <div class="col-sm-4 col-xs-12 align-self-center">
          <p class="item-name">${response[item].nume}</p>
          <p class="list-ingredients">${response[item].ingrediente}</p>
        </div>
        <button class="button-class align-self-center" onclick="drawDetails('${item}')">Details</button>
      </div>
      `
    }
  }
}

function drawDetails(idx){
  let detailsContainer = document.querySelector("#popup-container");
  detailsContainer.style.display = "flex";
  detailsContainer.innerHTML = `
  <div id="popup-window" class="col-xs-11 col-md-6 d-flex flex-column align-center">
    <div class="col-sm-9 col-xs-11 d-flex justify-center">
      <h2>${response[idx].nume}</h2>
    </div>
    <div class="col-sm-9 col-xs-11 d-flex justify-center">
      <img src="${response[idx].imagine}">
    </div>
    <div class="col-md-10 col-xs-11 d-flex justify-center overflow">
      <p>${response[idx].reteta}</p>
    </div>
    <button class="button-class" onclick="hideDetails()">Back</button>
  </div>
  `
  detailsContainer.addEventListener("click", function(event){
    hideDetails();
  })

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
