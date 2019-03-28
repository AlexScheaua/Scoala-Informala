function drawAdmin(){
  let adminContainer = document.querySelector("#admin-content");
  adminContainer.innerHTML = "";
  for (let product in itemList){
    if(itemList.hasOwnProperty(product) && itemList[product].existsInSearch !== "no"){
      adminContainer.innerHTML += `
      <div class="products-item col-xs-4 col-sm-3 col-md-2 d-flex flex-column justify-between">
          <div class="products-item-img">
            <img src="${itemList[product].icon}" onclick="drawDetails('${product}')" class="col-xs-10" alt="">
          </div>
          <div class="products-item-name d-flex justify-center">
            <p class="products-item-name-text col-xs-11" onclick="drawDetails('${product}')">${itemList[product].name}</p>
          </div>
          <div class="products-item-price d-flex flex-column align-center"></div>
          <div class="d-flex justify-around">
            <button class="admin-buttons edit" onclick="addEditProduct('${product}')">Edit</button>
            <button class="admin-buttons delete" onclick="deleteProduct('${product}')">Delete</button>
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

function drawEditAdd(idx){
  let detailsBackground = document.querySelector("#product-details-background");
  detailsBackground.style.display = "flex";

  let detailsContent = document.querySelector("#product-details-content");
  if(!idx){
    detailsContent.innerHTML = `
    <div class="d-flex flex-column align-center">
      name<input type="text" id="input-name">
      description<textarea id="input-description" rows="8" cols="80"></textarea>
      img princ<input type="text" id="input-img-princ">
      imgs<textarea id="input-imgs" rows="8" cols="80"></textarea>
      price<input type="text" id="input-price">
      discount<input type="text" id="input-discount"/>
      stock<input type="text" id="input-stock">
      <button type="button" id="saveData" onclick="saveProductFirebase();" name="button">Save</button>
    </div>
    `
  } else {
    let itemImages = itemList[idx].imgs.join(",\n");
    if(!itemList[idx].discount){
      itemList[idx].discount = 0;
    }
    detailsContent.innerHTML = `
    <div class="d-flex flex-column align-center">
      name<input type="text" id="input-name" value="${itemList[idx].name}">
      description<textarea id="input-description" rows="8" cols="80">${itemList[idx].description}</textarea>
      img princ<input type="text" id="input-img-princ" value="${itemList[idx].icon}">
      imgs<textarea id="input-imgs" rows="8" cols="80">${itemImages}</textarea>
      price<input type="text" id="input-price" value="${itemList[idx].price}">
      discount<input type="text" id="input-discount" value="${itemList[idx].discount}"/>
      stock<input type="text" id="input-stock" value="${itemList[idx].stock}">
      <button type="button" id="saveData" onclick="saveProductFirebase('${idx}');" name="button">Save</button>
    </div>
    `
  }

}

function addEditProduct(idx){
  if(idx){
    drawEditAdd(idx);
  } else {
    drawEditAdd();
  }
}

function deleteProduct(idx){
  console.log(`deleteProduct(${idx})`);
}

function saveProductFirebase(idx){
  let name = document.querySelector("#input-name");
  let description = document.querySelector("#input-description");
  let imgPrinc = document.querySelector("#input-img-princ");
  let imgs = document.querySelector("#input-imgs").value.split(",\n");
  let price = document.querySelector("#input-price");
  let discount = parseInt(document.querySelector("#input-discount").value);
  let discountedPrice = price.value - price.value*(discount/100);
  let stock = document.querySelector("#input-stock")

  let newObj = {
    name: name.value,
    description: description.value,
    icon: imgPrinc.value,
    imgs: imgs,
    price: parseInt(price.value),
    discount: discount,
    discountedPrice: parseInt(discountedPrice),
    stock: parseInt(stock.value)
  }

if(!idx){
  ajax("POST",JSON.stringify(newObj),"Products");
} else {
  ajax("PUT",JSON.stringify(newObj),`Products/${idx}`);
}
  document.querySelector("#input-name").value = "";
  document.querySelector("#input-description").value = "";
  document.querySelector("#input-img-princ").value = "";
  document.querySelector("#input-imgs").value = "";
  document.querySelector("#input-price").value = "";
  document.querySelector("#input-discount").value ="";
  document.querySelector("#input-stock").value = "";
}
