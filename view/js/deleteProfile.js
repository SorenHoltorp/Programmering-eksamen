//Denne funktion checker om User bærer en token i sin header, hvis det ikke er tilfældet bliver de viderestillet til login
function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

var form = document.getElementById('deleteProfile')

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

        // dernæest kan man slette sin profile 
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