function login(){
    let user = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let userArray = ["Zaiz","Brian","David","Ruth"];
    let passArray = ["z1234","b1234","d1234","r1234"];
    let success = false;

    for(var i=0;i<userArray.length;i++){
        if((user == userArray[i]) && password == passArray[i]){
            success = true;
            break;
        }
    }

    if(success){
        alert("Welcome: " + user);
        window.location.href = './Crud.html';
    }
    else{
        alert("Wrong user or password, please check");
        document.getElementById('user').value = "";
        document.getElementById('pass').value = "";
        document.getElementById('user').focus();
    }
}