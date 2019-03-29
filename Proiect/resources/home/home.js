function drawHome(){
  let homeContainer = document.querySelector("#homeContent");
  homeContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product) && itemList[product].existsInSearch !== "no"){

      let discount = parseInt(itemList[product].discount)
      if(discount > 0){
        homeContainer.innerHTML += `
        <div class="home-item d-flex flex-column justify-between">
            <div class="products-item-img">
              <img src="${itemList[product].icon}" onclick="drawDetails('${product}')" class="col-xs-10" alt="">
            </div>
            <div class="home-item-name d-flex justify-center">
              <p class="home-item-name-text col-xs-11" onclick="drawDetails('${product}')">${itemList[product].name}</p>
            </div>
            <div class="home-item-price d-flex flex-column align-center">
              <p class="products-item-price-text-old">Price: ${itemList[product].price}</p>
              <p class="products-item-price-text-new">${itemList[product].discountedPrice} RON</p>
            </div>
            <div class="d-flex justify-center">
              <button class="details-buttons" onclick="drawDetails('${product}')">Details</button>
            </div>
        </div>
        `
      }
    }
  }
}
