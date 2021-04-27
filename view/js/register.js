var form = document.getElementById("create")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

  

    fetch("http://localhost:7071/api/register", {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
           
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})