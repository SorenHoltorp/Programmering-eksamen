function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

//returns to base if no token
function logout() {
    localStorage.removeItem('token');
    location.href = "login.html";
    alert("Bye, bye!");
}


var form = document.getElementById("createProfile")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var gender = document.getElementById('gender').value
    var interests = document.getElementById("interests").value
    var university = document.getElementById("university").value 
    var password = document.getElementById("password").value

    fetch("http://localhost:7071/api/setupProfile", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            age: age,
            gender: gender,
            university: university,
            interests: interests,
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }).then((response) =>
        response.json()).then((data) => {
            if (data[0] = "succes") {
                //location.href = "mainpage.html"
                console.log("Succes, but there is not made a function on the server on this yet")
            } else {
                alert("failed")
            }
        }).catch((err) => {
            console.log(err)
        })
})