var list = [
  {
    name: "Alex",
    phone: "0741234765"
  },
  {
    name: "Mihai",
    phone: "0268337265"
  }
]

function initialize(){
  draw();
  addButton();
}

function addButton(){
  document.querySelector("#new-contact").addEventListener("click", function(){
    addItem();
  })
}

function draw(){
  var contactList = document.querySelector("#list");
  var saveButton = document.querySelector("#save-contact");
  var addButton = document.querySelector("#new-contact");
  addButton.style.display = "";
  saveButton.style.display = "none";
  contactList.innerHTML = "";
  for(let i = 0; i < list.length; i++){
    contactList.innerHTML += `<li>
      <div class="item container">
        <div class="item-np clr-white">
          <p>${list[i].name}</p>
        </div>
        <div class="item-np clr-white">
          <p>${list[i].phone}</p>
        </div>
        <div class="item-buttons">
          <i class="far fa-edit" onclick="editButtons(${i})"></i>
          <i class="fas fa-trash-alt" onclick="deleteButtons(${i})"></i>
        </div>
      </div>
    </li>`
  }
}

function addItem(){
  var name = document.querySelector("#add-name");
  var phone = document.querySelector("#add-phone");
  var newItem = {};

  if(name.value !== "" && phone.value !== ""){
    newItem.name = name.value;
    newItem.phone = phone.value;
    list.push(newItem);
    name.value = "";
    phone.value = "";
  }
  draw();
}

function editButtons(i){
  var name = document.querySelector("#add-name");
  var phone = document.querySelector("#add-phone");
  var saveButton = document.querySelector("#save-contact");
  var addButton = document.querySelector("#new-contact");
  saveButton.style.display = "";
  addButton.style.display = "none";
  name.value = list[i].name;
  phone.value = list[i].phone;

  document.querySelector("#save-contact").addEventListener("click", function saveEdit(){
    if(name.value !== "" && phone.value !== ""){
      list[i].name = name.value;
      list[i].phone = phone.value;
      name.value = "";
      phone.value = "";
      draw();
    }
    document.querySelector("#save-contact").removeEventListener("click", saveEdit);
  })
}


function deleteButtons(i){
  list.splice(i,1);
  draw();
}


initialize();
