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


var form = document.getElementById("setupProfile")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var gender = document.getElementById('gender').value
    var interest1 = document.getElementById("interest1").value
    var interest2 = document.getElementById("interest2").value
    var interest3 = document.getElementById("interest3").value
    var university = document.getElementById("university").value
    
    

    fetch("http://localhost:7071/api/setupProfile", {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            age: age,
            gender: gender,
            interest1: interest1,
            interest2: interest2,
            interest3: interest3,
             university: university
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }).then((response) =>
        response.json()).then((data) => {
            if (data[0] = "succes") {
                // location.href = "mainpage.html"
                console.log("Succes")
            } else {
                alert("failed")
            }
        }).catch((err) => {
            console.log(err)
        })
})