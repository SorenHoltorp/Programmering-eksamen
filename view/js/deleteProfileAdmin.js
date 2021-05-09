function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

var form = document.getElementById('deleteProfileAdmin')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    var usersId = document.getElementById("usersId").value
    
        fetch("http://localhost:7071/api/setupProfile", {
            method: 'DELETE',
            body: JSON.stringify({
                usersId: usersId
            }),
            headers: {
                "Content-Type": "applicattion/json; charset-UTF-8"
            }
        }).then((response) => 
        response.json()).then((data) => {
            if (data[0] = "succes") {
                console.log("Succes")
                location.href = "homepageAdmin.html"
            } else {
                alert("Failed")
            }
        }).catch((err) => {
            console.log(err)
        })
    })

