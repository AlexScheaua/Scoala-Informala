let response = [];

function initialize(){
  searchButtonInit();
  getListAjax();
}

function searchButtonInit(){
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click",function(){

  })
}

function getListAjax(){
  fetch(`https://restaurant-menu-beb6c.firebaseio.com/menu/.json`)
    .then(response => response.json())
    .then(json => {
      response = json;
      drawList(json);
    })
}

function drawList(response){
  var listContainer = document.querySelector("#content");
  for (var item in response){
    if(response.hasOwnProperty(item)){
      listContainer.innerHTML += `
      <div class="list-item d-flex justify-between flex-wrap">
        <div class="col-sm-4 col-xs-12">
          <img src="${response[item].imagine}" onclick="drawDetails('${item}')">
        </div>
        <div class="col-sm-4 col-xs-12">
          <p class="item-name">${response[item].nume}</p>
          <p class="list-ingredients">${response[item].ingrediente}</p>
        </div>
        <button class="details-button" onclick="drawDetails('${item}')">Details</button>
      </div>
      `
    }
  }
}

function drawDetails(idx){
  console.log(idx);
}

initialize();
