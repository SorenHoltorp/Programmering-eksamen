function checkIfLoggedIn() {
    if(localStorage.getItem('token')){
        location.href = "mainpage.html"
        alert('You are allready logged in. Press OK to continue.');
    } else {
        return;
    }
}

login.addEventListener('submit', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  

    fetch("http://localhost:7071/api/admin", {
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
        location.href = "admin.html";
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