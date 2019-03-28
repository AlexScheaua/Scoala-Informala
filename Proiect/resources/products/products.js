function drawProducts(){
  let productsContainer = document.querySelector("#productsContent");
  productsContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product) && itemList[product].existsInSearch !== "no"){
      productsContainer.innerHTML += `
      <div class="products-item col-xs-4 col-sm-3 col-md-2 d-flex flex-column justify-between">
          <div class="products-item-img">
            <img src="${itemList[product].icon}" onclick="drawDetails('${product}')" class="col-xs-10" alt="">
          </div>
          <div class="products-item-name d-flex justify-center">
            <p class="products-item-name-text col-xs-11" onclick="drawDetails('${product}')">${itemList[product].name}</p>
          </div>
          <div class="products-item-price d-flex flex-column align-center"></div>
          <div class="d-flex justify-center">
            <button class="details-buttons" onclick="drawDetails('${product}')">Details</button>
          </div>
      </div>
      `
      let discount = parseInt(itemList[product].discount)
      let productsPrice = document.querySelectorAll(".products-item-price");
      if(discount > 0){
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text-old">Price: ${itemList[product].price}</p>
          <p class="products-item-price-text-new">${itemList[product].price - itemList[product].price*(discount/100)} RON</p>
        `
      } else {
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text">${itemList[product].price} RON</p>
          `
      }
    }
  }
}
