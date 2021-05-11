// Logged In Function
function checkIfLoggedIn() {
    if(localStorage.getItem('token')){ // Henter Localstorage token
        location.href = "homepageAdmin.html" // Rykker til admin html side
        alert('You are already logged in. Press OK to continue.');
    } else {
        return;
    }
}

login.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  

    fetch("http://localhost:7071/api/loginAdmin", {
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
        location.href = "homepageAdmin.html";
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