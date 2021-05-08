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
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset-UTF-8",
            authentication: usernameToken
        }
    }).then()


})