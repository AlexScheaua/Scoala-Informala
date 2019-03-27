ajax('GET','','Products');
let imageArr = []
for (let product in itemList){
  if(itemList.hasOwnProperty(product)){
    imageArr.push(itemList[product].imgs)
  }
}
