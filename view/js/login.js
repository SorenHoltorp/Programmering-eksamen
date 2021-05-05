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
    })
    .then((response) => {
        return response.json()
    }).then((data) => {
        //location.href = "mainpage.html";
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})