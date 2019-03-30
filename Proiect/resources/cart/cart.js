function drawCart(){
  let totalPrice = 0;

  let cartItemsList = document.querySelector(".cart-items-list");
  cartItemsList.innerHTML = "";

  if(cartList === null){
    cartItemsList.innerHTML = `
      <div class="d-flex justify-center align-center">
        <p>There are no items in the cart</p>
      </div>
    `
  }

  for(let product in cartList){
    cartItemsList.innerHTML += `
      <li class="cart-items-list-item d-flex justify-between align-center">
        <img class="cart-items-list-images" src="${cartList[product].icon}" alt="" />
        <p class="cart-items-list-name">${cartList[product].name}</p>
        <button class="cart-items-list-button" onclick="modifyStock('${product}','-')"><i class="fas fa-minus"></i></button>
        <p class="cart-items-list-stock">${cartList[product].stock}</p>
        <button class="cart-items-list-button" onclick="modifyStock('${product}','+')"><i class="fas fa-plus"></i></button>
        <p class="cart-items-list-price">${(cartList[product].discountedPrice*cartList[product].stock).toLocaleString('de-DE')} RON</p>
      </li>
    `
    totalPrice = totalPrice + (cartList[product].discountedPrice*cartList[product].stock)
  }

  let cartCheckoutContainer = document.querySelector(".cart-checkout-container");
  cartCheckoutContainer.innerHTML = `
      <p>Total:</p>
      <p class="total-price">${totalPrice.toLocaleString('de-DE')} RON</p>
      <button class="checkout-button" onclick="checkout()">Checkout</button>
  `
}

async function modifyStock(idx,sign){
  let buttons = document.querySelectorAll(".cart-items-list-button");
  buttons[0].disabled = true;
  buttons[1].disabled = true;

  if(sign === "+"){
    if(itemList[idx].stock > 0){
      cartList[idx].stock++;
      itemList[idx].stock--;
    } else {
      alertMessage("Product is not in stock!")
    }
  } else if(sign === "-") {
    if(cartList[idx].stock > 1){
      cartList[idx].stock--;
      itemList[idx].stock++;
    } else {
      alertMessage("Product removed from cart!")
      itemList[idx].stock++;
      itemList[idx].inCart = false;
      await ajax("PUT",JSON.stringify(itemList[idx]),`Products/${idx}`);
      await ajax("DELETE","",`Cart/${idx}`);
      ajax('GET','','Cart',drawCart);

      return;
    }
  }

  await ajax("PUT",JSON.stringify(cartList[idx]),`Cart/${idx}`);
  await ajax("PUT",JSON.stringify(itemList[idx]),`Products/${idx}`);

  ajax('GET','','Cart',drawCart)
}

function getCartItemsForIndicator(){
  let cartIndicator = document.getElementById("cart-indicator");
  cartIndicator.innerText = "";
  for(let products in cartList){
    if(cartIndicator.innerText === ""){
      cartIndicator.innerText = 0;
    }
    cartIndicator.innerText = parseInt(cartIndicator.innerText) + parseInt(cartList[products].stock);
  }
}

function existsInCart(idx, page){
  if(page){
    if(itemList[idx].inCart){
      let addToCartButton = document.querySelector(".add-to-cart-button");
      addToCartButton.innerText = "Already in cart";
      addToCartButton.setAttribute("onClick", "");
      addToCartButton.style.backgroundColor ="#ffae32";
      let stockDisplay = document.querySelector(".details-item-stock>span");
    }
  } else {
    var cartButtons = document.querySelectorAll(".product-to-cart-button");
    if(itemList[idx].inCart){
      cartButtons[cartButtons.length - 1].setAttribute("onClick", "");
      cartButtons[cartButtons.length - 1].style.backgroundColor ="#ffae32";
    }
  }
}

async function addToCart(idx) {
  let button = event.target.closest("button");
  button.disabled = true;

  if(itemList[idx].stock > 0){
    itemList[idx].stock--;
    itemList[idx].inCart = true;
    ajax("PUT",JSON.stringify(itemList[idx]),`Products/${idx}`);
    alertMessage("Product added to cart");
    let cartObject = JSON.parse(JSON.stringify(itemList[idx]));
    cartObject.stock = 1;
    await ajax("PUT",JSON.stringify(cartObject),`Cart/${idx}`);

    addToCartToAlreadyInCart(button);

    await ajax("GET",'','Cart');
    await ajax("GET",'','Products');
  } else {
    alertMessage("This product is not in stock");
  }
}

function checkout(){
  alert("You will be redirected to an external page");
  window.open('https://scoalainformala.ro', '_blank');
}
