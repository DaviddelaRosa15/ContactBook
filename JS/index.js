let creacion = document.getElementById('creacion');
let edicion = document.getElementById('edicion');
let busqueda = document.getElementById('busqueda');
let firstNameInput = document.getElementById('FirstNameInput');
let lastNameInput = document.getElementById('LastNameInput');
let emailInput = document.getElementById('EmailInput');
let idUpdate = document.getElementById('idUpdate');
let firstNameUpdate = document.getElementById('FirstNameUpdate');
let lastNameUpdate = document.getElementById('LastNameUpdate');
let emailUpdate = document.getElementById('EmailUpdate');
let listaContactos = document.getElementById('listaContactos');
let idCount = 1;
let arrayContactos = [];

let contacto = {
    Id: 0,
    FirstName: "",
    LastName: "",
    Email: "",
}

// Listado de contactos
//--------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', MostrarBD);
function MostrarBD() {
    listaContactos.innerHTML = "";

    arrayContactos = JSON.parse(localStorage.getItem("contactos"));
    if (arrayContactos == null) {
        arrayContactos = [];
        listaContactos.innerHTML = `
            <tr>
                <th scope="row" colspan="6">No hay contactos</th>
            </tr>            
        `;
    } else {
        for (var i = 0; i < arrayContactos.length; i++) {
            listaContactos.innerHTML += `
                <tr>
                    <th scope="row" id="Id">${arrayContactos[i].Id}</th>
                    <td id="FirstName">${arrayContactos[i].FirstName}</td>
                    <td id="LastName">${arrayContactos[i].LastName}</td>
                    <td id="Email">${arrayContactos[i].Email}</td>
                    <td id="Update"><button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#collapseUpdate" aria-expanded="false" aria-controls="collapseUpdate">Update</button></td>
                    <td id="Delete"><button class="btn btn-outline-danger">Delete</button></td>
                </tr>                
            `;
        }
    }

}
//--------------------------------------------------------------------

// Creación de contactos
//--------------------------------------------------------------------
creacion.onsubmit = function (e) {
    e.preventDefault();
    agregarContacto()
    console.log(arrayContactos);
    reiniciarCreacion();
    GuardarBD();
}

function agregarContacto() {
    contacto = {
        Id: idCount,
        FirstName: firstNameInput.value,
        LastName: lastNameInput.value,
        Email: emailInput.value,
    }
    while (true) {
        let exist = arrayContactos.find(item => item.Id === contacto.Id)
        if (exist === undefined) {
            arrayContactos.push(contacto);
            console.log('Se agrego el contacto con el id: ' + contacto.Id);
            idCount++;
            break;
        } else {
            console.log(contacto.Id + ' ya existe en la colección de verduras.');
            contacto.Id += 1;
        }
    }
}

function reiniciarCreacion() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
}
//--------------------------------------------------------------------

// Edicion de contactos
//--------------------------------------------------------------------
edicion.onsubmit = function (e) {
    e.preventDefault();
    editarContacto()
    console.log(arrayContactos);
    reiniciarEdicion();
    GuardarBD();
}

function editarDB(contacto) {
    idUpdate.value = contacto.Id;
    firstNameUpdate.value = contacto.FirstName;
    lastNameUpdate.value = contacto.LastName;
    emailUpdate.value = contacto.Email;
}

function editarContacto() {
    contacto = {
        Id: idUpdate.value,
        FirstName: firstNameUpdate.value,
        LastName: lastNameUpdate.value,
        Email: emailUpdate.value,
    }

    elementIndex = arrayContactos.findIndex((obj => obj.Id == contacto.Id));
    console.log("Before update: ", arrayContactos[elementIndex]);
    arrayContactos[elementIndex].FirstName = contacto.FirstName;
    arrayContactos[elementIndex].LastName = contacto.LastName;
    arrayContactos[elementIndex].Email = contacto.Email;
    console.log("After update: ", arrayContactos[elementIndex]);    
    GuardarBD();
}

function reiniciarEdicion() {
    idUpdate.value = "";
    firstNameUpdate.value = "";
    lastNameUpdate.value = "";
    emailUpdate.value = "";
}
//--------------------------------------------------------------------

// Manejando el localStorage de contactos
//--------------------------------------------------------------------
function GuardarBD() {
    localStorage.setItem("contactos", JSON.stringify(arrayContactos));
    MostrarBD();
}
//--------------------------------------------------------------------

// Borrado de contactos
//--------------------------------------------------------------------
function eliminarDB(id) {
    arrayContactos.forEach((elemento, index) => {
        //console.log(elemento.tarea+"  "+index);
        if (elemento.Id == id) {
            //console.log(arrayTareas);
            arrayContactos.splice(index, 1);
            //console.log(arrayTareas);
        }
    });
    GuardarBD();
}
//--------------------------------------------------------------------

listaContactos.onclick = function (e) {
    e.preventDefault();
    //console.log(e.target.classList[1]);
    if (e.target.classList[1] === "btn-outline-primary" || e.target.classList[1] === "btn-outline-danger") {
        //console.log(e.target.classList[1]);
        contacto = {
            Id: e.target.parentNode.parentNode.querySelector('#Id').innerHTML,
            FirstName: e.target.parentNode.parentNode.querySelector('#FirstName').innerHTML,
            LastName: e.target.parentNode.parentNode.querySelector('#LastName').innerHTML,
            Email: e.target.parentNode.parentNode.querySelector('#Email').innerHTML
        };
        //console.log(nombreTarea);
        if (e.target.classList[1] === "btn-outline-danger") {
            eliminarDB(contacto.Id);
        }
        else if (e.target.classList[1] === "btn-outline-primary") {
            editarDB(contacto);
        }
    }
}
