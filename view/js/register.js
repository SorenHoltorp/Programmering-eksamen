//Denne funktion checker om User bærer en token i sin header, hvis det ikke er tilfældet bliver de viderestillet til login
function checkIfLoggedIn() {
    if(localStorage.getItem('token')){
        location.href = "mainpage.html"
        alert('You are allready logged in. Press OK to continue.');
    } else {
        return;
    }
}

var form = document.getElementById("register")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    fetch("http://localhost:7071/api/register", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }).then((response) =>
        response.json()).then((data) => {
            if(data[0] = "succes"){
            location.href = "login.html"
            } else {
                alert("failed")
            }
        }).catch((err) => {
            console.log(err)
        })
})
