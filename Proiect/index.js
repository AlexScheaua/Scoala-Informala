//functii care initializeaza componentele
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

async function  loadComponent(url) {
    const contentDiv = document.querySelector("#content");
    contentDiv.innerHTML = await fetchHtmlAsText(`${url}`);
}

//functii pentru navbar menu
function dropDownMenu(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  for(let i = 1; i < navbarItems.length; i++){
    if(navbarItems[i].style.display === "list-item"){
      navbarItems[i].style.display = "none";
    } else {
      navbarItems[i].style.display = "list-item";
    }
  }
}

function hideMenu(){
  let navbarItems = document.querySelectorAll(".navbar-item");
  if(window.innerWidth <= 768){
    for(let i = 1; i < navbarItems.length; i++){
        navbarItems[i].style.display = "none";
    }
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
  .then(response => itemList = response)
  .then(() => {
    if(drawFunction){
      drawFunction();
    }
  })
}
