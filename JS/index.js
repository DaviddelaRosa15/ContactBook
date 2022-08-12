let creation = document.getElementById("creation");
let edition = document.getElementById("edition");
let firstNameInput = document.getElementById("FirstNameInput");
let lastNameInput = document.getElementById("LastNameInput");
let emailInput = document.getElementById("EmailInput");
let idUpdate = document.getElementById("idUpdate");
let firstNameUpdate = document.getElementById("FirstNameUpdate");
let lastNameUpdate = document.getElementById("LastNameUpdate");
let emailUpdate = document.getElementById("EmailUpdate");
let collectionContact = document.getElementById("collectionContact");
let idCount = 1;
let arrayContacts = [];
let searchInputValue = document.getElementById("search");

let contact = {
  Id: 0,
  FirstName: "",
  LastName: "",
  Email: "",
};

// Listado de contactos
//--------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", ShowDB);
function ShowDB() {
  collectionContact.innerHTML = "";

  arrayContacts = JSON.parse(localStorage.getItem("contacts"));
  if (arrayContacts == null || arrayContacts.length == 0) {
    arrayContacts = [];
    collectionContact.innerHTML = `
            <tr>
                <th scope="row" colspan="7">No hay contactos</th>
            </tr>            
        `;
  } else {
    for (var i = 0; i < arrayContacts.length; i++) {
      collectionContact.innerHTML += `
                <tr class="contactRecord">
                    <th scope="row" id="Identity">${arrayContacts[i].Id}</th>
                    <td id="FirstName">${arrayContacts[i].FirstName}</td>
                    <td id="LastName">${arrayContacts[i].LastName}</td>
                    <td id="Email">${arrayContacts[i].Email}</td>
                    <td id="Update"><button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#collapseUpdate" aria-expanded="false" aria-controls="collapseUpdate"><i class="fa fa-pencil"></i></button></td>
                    <td id="Delete"><button class="btn btn-outline-danger"><i class="fa fa-trash"></i></button></td>
                    <td id="SendEmail"><button class="btn btn-outline-success"><i class="fa fa-paper-plane"></i></button></td>
                </tr>                
            `;
    }
  }
}
//--------------------------------------------------------------------

// Creación de contactos
//--------------------------------------------------------------------
creation.onsubmit = function (e) {
  e.preventDefault();
  AddContact();
  console.log(arrayContacts);
  CleanCreation();
  SaveDB();
};

const clearSearchInput = () => {
  searchInputValue.value = "";
  let contactList = document.getElementsByClassName("contactRecord");
  for (let i = 0; i < contactList.length; i++) {
    contactList[i].style.display = "";
  }
};

const searchContact = () => {
  let btnClear = document.getElementById("btnClear");
  searchInputValue.value != ""
    ? (btnClear.style.display = "")
    : (btnClear.style.display = "none");
  searchInputValue.value.toLowerCase();
  let contactList = document.getElementsByClassName("contactRecord");
  for (let i = 0; i < contactList.length; i++) {
    if (
      !contactList[i].innerHTML.toLowerCase().includes(searchInputValue.value)
    ) {
      contactList[i].style.display = "none";
    } else {
      contactList[i].style.display = "";
    }
  }
};

function sendEmail({ FirstName, LastName, Email }) {
  var subject = "Programming Class Project";
  var emailBody = `Hi ${FirstName} ${LastName}`;
  document.location =
    "mailto:" + Email + "?subject=" + subject + "&body=" + emailBody;
}

function AddContact() {


  contact = {
    Id: idCount,
    FirstName: firstNameInput.value,
    LastName: lastNameInput.value,
    Email: emailInput.value,
  };
  while (true) {
     let exist = arrayContacts.find((item) => item.Id === contact.Id);
    if (exist === undefined) {
      arrayContacts.push(contact);
      console.log("Se agrego el contact con el id: " + contact.Id);
      idCount++;
      break;
    } else {
      console.log(contact.Id + " ya existe en la colección de verduras.");
      contact.Id += 1;
   }
  
}
}


function CleanCreation() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
}
//--------------------------------------------------------------------

// Edicion de contactos
//--------------------------------------------------------------------
edition.onsubmit = function (e) {
  e.preventDefault();
  EditContact();
  console.log(arrayContacts);
  CleanEdition();
  SaveDB();
};

function EditDB(contact) {
  idUpdate.value = contact.Id;
  firstNameUpdate.value = contact.FirstName;
  lastNameUpdate.value = contact.LastName;
  emailUpdate.value = contact.Email;
}

function EditContact() {
  contact = {
    Id: idUpdate.value,
    FirstName: firstNameUpdate.value,
    LastName: lastNameUpdate.value,
    Email: emailUpdate.value,
  };

  elementIndex = arrayContacts.findIndex((obj) => obj.Id == contact.Id);
  console.log("Before update: ", arrayContacts[elementIndex]);
  arrayContacts[elementIndex].FirstName = contact.FirstName;
  arrayContacts[elementIndex].LastName = contact.LastName;
  arrayContacts[elementIndex].Email = contact.Email;
  console.log("After update: ", arrayContacts[elementIndex]);
  SaveDB();
}

function CleanEdition() {
  idUpdate.value = "";
  firstNameUpdate.value = "";
  lastNameUpdate.value = "";
  emailUpdate.value = "";
}
//--------------------------------------------------------------------

// Manejando el localStorage de contactos
//--------------------------------------------------------------------
function SaveDB() {
  localStorage.setItem("contacts", JSON.stringify(arrayContacts));
  ShowDB();
}
//--------------------------------------------------------------------

// Borrado de contactos
//--------------------------------------------------------------------
function DeleteDB(id) {
  arrayContacts.forEach((elemento, index) => {
    //console.log(elemento.tarea+"  "+index);
    if (elemento.Id == id) {
      //console.log(arrayTareas);
      arrayContacts.splice(index, 1);
      //console.log(arrayTareas);
    }
  });
  SaveDB();
}
//--------------------------------------------------------------------

collectionContact.onclick = function (e) {
  e.preventDefault();
  //console.log(e.target.classList[1]);
  if (
    (e.target.classList[1] === "fa-pencil") || (e.target.classList[1] === "btn-outline-primary") ||
    (e.target.classList[1] === "fa-trash") || (e.target.classList[1] === "btn-outline-danger") ||
    (e.target.classList[1] === "fa-paper-plane") || (e.target.classList[1] === "btn-outline-success")
  ) {
    //console.log(e.target.classList[1]);
    contact = {
      Id: e.target.parentNode.parentNode.querySelector("#Identity").innerHTML,
      FirstName:
        e.target.parentNode.parentNode.querySelector("#FirstName").innerHTML,
      LastName:
        e.target.parentNode.parentNode.querySelector("#LastName").innerHTML,
      Email: e.target.parentNode.parentNode.querySelector("#Email").innerHTML,
    };
    //console.log(nombreTarea);
    if ((e.target.classList[1] === "fa-paper-plane") || (e.target.classList[1] === "btn-outline-success")) {
      sendEmail(contact);
    }
    if ((e.target.classList[1] === "fa-trash") || (e.target.classList[1] === "btn-outline-danger")) {
      DeleteDB(contact.Id);
    } else if ((e.target.classList[1] === "fa-pencil") || (e.target.classList[1] === "btn-outline-primary")) {
      EditDB(contact);
    }
  }
};
