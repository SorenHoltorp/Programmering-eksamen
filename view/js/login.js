//Validates if u are allready logged in
function checkIfLoggedIn() {
    if(localStorage.getItem('token')){
        location.href = "mainpage.html"
        alert('You are allready logged in. Press OK to continue.');
    } else {
        return;
    }
}

//Login api to server
var login = document.getElementById("login")

login.addEventListener('submit', function(e) {
    e.preventDefault()

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
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            location.href = "mainpage.html";
            localStorage.setItem('token', data[1]);
        } else {
            localStorage.setItem('token', data[1]);
        }
    }).catch((err) => {
        console.log(err)
    })
})