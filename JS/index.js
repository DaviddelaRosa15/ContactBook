let creacion = document.getElementById('creacion');
let busqueda = document.getElementById('busqueda');
let firstNameInput = document.getElementById('FirstNameInput');
let lastNameInput = document.getElementById('LastNameInput');
let emailInput = document.getElementById('EmailInput');
let listaContactos = document.getElementById('listaContactos');
let idCount = 1;
let arrayContactos = [];

let contacto = {
    Id: 0,
    FirstName: "",
    LastName: "",
    Email: "",
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

/*
agregarTarea("comer");
agregarTarea("beber");
console.log(arrayTareas);
*/

creacion.onsubmit = function (e) {
    e.preventDefault();
    agregarContacto()
    console.log(arrayContactos);
    reiniciarCreacion();
    GuardarBD();
}

function GuardarBD() {
    localStorage.setItem("contactos", JSON.stringify(arrayContactos));
    MostrarBD();
}

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
                    <td id="Update"><button class="btn btn-outline-primary">Update</button></td>
                    <td id="Delete"><button class="btn btn-outline-danger">Delete</button></td>
                </tr>
            `;
        }
    }

}

listaContactos.onclick = function (e) {
    e.preventDefault();
    //console.log(e.target.classList[1]);
    if (e.target.classList[1] === "btn-outline-primary" || e.target.classList[1] === "btn-outline-danger") {
        //console.log(e.target.classList[1]);
        let id = e.target.parentNode.parentNode.querySelector('#Id').innerHTML;
        //console.log(nombreTarea);
        if (e.target.classList[1] === "btn-outline-danger") {
            eliminarDB(id);
        }
        else {
            editarDB(id);
        }
    }
}

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

function editarDB(id) {
    for (var i = 0; i < arrayContactos.length; i++) {
        if (arrayContactos[i].id === id) {
            arrayContactos[i].estado = true;
        }
    }
    GuardarBD();
}
