var form = document.getElementById("createProfile")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var gender = document.querySelector('input[name="gender"]:checked').value
    var university = document.getElementById("university").value

    fetch("http://localhost:7071/api/createProfile", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            age: age,
            gender: gender,
            university: university
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