function drawProducts(){
  let productsContainer = document.querySelector("#productsContent");
  productsContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product)){
      productsContainer.innerHTML += `
      <div class="products-item col-xs-4 col-sm-3 col-md-2 d-flex flex-column justify-between">
          <div class="products-item-img">
            <img src="${itemList[product].icon}" class="col-xs-10" alt="">
          </div>
          <div class="products-item-name d-flex justify-center">
            <p class="products-item-name-text col-xs-11">${itemList[product].name}</p>
          </div>
          <div class="products-item-price d-flex flex-column align-center">

          </div>
      </div>
      `
      let discount = parseInt(itemList[product].discount)
      let productsPrice = document.querySelectorAll(".products-item-price");
      if(discount > 0){
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text-old">Price: ${itemList[product].price}</p>
          <p class="products-item-price-text-new">Price: ${itemList[product].price - itemList[product].price*(discount/100)}</p>
        `
      } else {
        productsPrice[productsPrice.length-1].innerHTML = `
          <p class="products-item-price-text">Price: ${itemList[product].price}</p>
          `
      }
    }
  }
}
