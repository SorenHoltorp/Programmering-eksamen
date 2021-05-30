//Validates if u are already logged in
function checkIfLoggedIn() {
    if(localStorage.getItem('token')){
        location.href = "mainpage.html"
        alert('You are already logged in. Press OK to continue.');
    } else {
        return;
    }
}

//Login api to server
var login = document.getElementById("login")

login.addEventListener('submit', function(e) {
    e.preventDefault()

    // Henter HTML Information
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  

    fetch("http://localhost:7071/api/login", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }).then((response) => 
        response.json()).then((data) => {
        console.log(data[0])
        if(data[0] == "Correct password"){
        location.href = "mainpage.html";
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.setItem('token', data[1]);
        } else {
            localStorage.setItem('token', data[1]);
        }
    } else if (data[0] == "Incorrect password") {
        alert("Wrong password.")
    }
    }).catch((err) => {
        console.log(err)
    })
})
