function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

var form = document.getElementById("setupProfileAdmin")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var gender = document.getElementById('gender').value
    var interest1 = document.getElementById("interest1").value
    var interest2 = document.getElementById("interest2").value
    var interest3 = document.getElementById("interest3").value
    var universityL = document.getElementById("university").value
    var university = universityL.toUpperCase();
    var usersId = document.getElementById("usersId").value

    
            fetch("http://localhost:7071/api/setupProfile", {
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    age: age,
                    gender: gender,
                    university: university,
                    interest1: interest1,
                    interest2: interest2,
                    interest3: interest3,
                    usersId: usersId
                }),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            }).then((response) =>
                response.json()).then((data) => {
                    if (data[0] = "succes") {
                        location.href = "homepageAdmin.html"
                        console.log("Succes")
                    } else {
                        alert("failed")
                    }
                }).catch((err) => {
                    console.log(err)
                })

})