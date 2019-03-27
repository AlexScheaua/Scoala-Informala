

function addItem(){
  let name = document.querySelector("#input-name")
  let description = document.querySelector("#input-description")
  let imgPrinc = document.querySelector("#input-img-princ")
  let imgs = document.querySelector("#input-imgs").value.split(",")
  let price = document.querySelector("#input-price")
  let stock = document.querySelector("#input-stock")

  let newObj = {
    name: name.value,
    description: description.value,
    icon: imgPrinc.value,
    imgs: imgs,
    price: parseInt(price.value),
    stock: parseInt(stock.value)
  }


  ajax("POST",JSON.stringify(newObj),"Products");

  document.querySelector("#input-name").value = "";
  document.querySelector("#input-description").value = "";
  document.querySelector("#input-img-princ").value = "";
  document.querySelector("#input-imgs").value = "";
  document.querySelector("#input-price").value = "";
  document.querySelector("#input-stock").value = "";
}

function draw(){

}
