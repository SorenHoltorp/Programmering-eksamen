// Logged In Function
function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

var form = document.getElementById('deleteProfile')

// Eventlistener
form.addEventListener('submit', function (e) {
    e.preventDefault()

    let usernameToken = localStorage.getItem('token');

    //henter første id
    fetch("http://localhost:7071/api/setupProfile", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset-UTF-8",
            authentication: usernameToken
        }
    }).then((response) => 
    response.json()).then((data) => {
        console.log('Getting ID was a succes. ID is: ' + data[0])

        fetch("http://localhost:7071/api/setupProfile", {
            method: 'DELETE',
            body: JSON.stringify({
                usersId: data[0]
            }),
            headers: {
                "Content-Type": "applicattion/json; charset-UTF-8"
            }
        }).then((response) => 
        response.json()).then((data) => {
            if (data[0] = "succes") {
                console.log("Succes")
                location.href = "mainpage.html"
            } else {
                alert("Failed")
            }
        }).catch((err) => {
            console.log(err)
        })
    })


})