function login() {
    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    let userArray = ["Zaiz", "Brian", "David", "Ruth"];
    let passArray = ["z1234", "b1234", "d1234", "r1234"];
    let success = false;

    for (var i = 0; i < userArray.length; i++) {
        if ((user == userArray[i]) && password == passArray[i]) {
            success = true;
            break;
        }
    }

    if (success) {
        alert("Welcome: " + user);
        window.location.href = './Crud.html';
    }
    else {
        alert("Wrong user or password, please check");
        document.getElementById('user').value = "";
        document.getElementById('password').value = "";
        document.getElementById('user').focus();
    }
}

function seePass() {
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    togglePassword.classList.toggle("bi-eye");

}