//functii care initializeaza componentele

async function  loadComponent(url) {
    setLoadingGif(true);
    const contentDiv = document.querySelector("#content");
    contentDiv.innerHTML = await fetchHtmlAsText(`${url}`);
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

//functii pentru navbar menu
function dropDownMenu(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  let searchContainer = document.querySelector("#search-container");
  for(let i = 1; i < navbarItems.length; i++){
    if(navbarItems[i].style.display === "list-item"){
      navbarItems[i].style.display = "none";
      searchContainer.style.top = "53px";
    } else {
      navbarItems[i].style.display = "list-item";
      searchContainer.style.top = "204px";
    }
  }
}

function hideMenu(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  let searchContainer = document.querySelector("#search-container");
  if(window.innerWidth <= 768){
    for(let i = 1; i < navbarItems.length; i++){
        navbarItems[i].style.display = "none";
        searchContainer.style.top = "53px";
    }
  }
}

function searchProducts(){
  var searchInput = document.querySelector("#search-input");
  for(product in itemList){
    var existsName = (itemList[product].name).toLowerCase().indexOf((searchInput.value));
    if(existsName === -1){
      itemList[product].existsInSearch = "no"
    } else{
      itemList[product].existsInSearch = "yes"
    }
  }
  if(document.querySelector("#homePage")){
    drawHome();
  } else if(document.querySelector("#productsPage")){
    drawProducts();
  } else if(document.querySelector("#adminPage")){
    drawAdmin();
  }
}

function setLoadingGif(bool){
  let loadingGif = document.querySelector(".loading-gif")
  let content = document.querySelector("#content")

  if(bool){
    loadingGif.style.display = "flex";
    content.style.display = "none";
  } else {
    loadingGif.style.display = "none";
    content.style.display = "flex";
  }
}

//ajax request
let itemList = {}
function ajax(method,body,idx,drawFunction){
  if(!method){
    method = "GET";
  }

  if(!body){
    body = null;
  }

  if(!idx){
    idx = "";
  }

fetch(`https://scoala-informala-ba5c7.firebaseio.com/${idx}.json`,{
    method: method,
    body: body
  })
  .then(response => response.json())
  .then(response => {
    if(method === "GET"){
      itemList = response
    }
  })
  .then(() => {
    if(drawFunction){
      drawFunction();
    }
  })
  .then( () =>{
    setLoadingGif(false);
  })
}
