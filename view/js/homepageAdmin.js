//Denne funktion checker om User bærer en token i sin header, hvis det ikke er tilfældet bliver de viderestillet til login
function checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
        return;
    } else {
        location.href = "login.html";
    }
};

//Funktion som viderestiller til logout såfremt at bruger trykker logout. Den benytter localStorage til at fjerne ens token.
function logout() {
    localStorage.removeItem('token');
    location.href = "login.html";
    alert("Bye, bye!");
}

function getUsers() {
    let emailToken = localStorage.getItem('token');

    //henter først user_id
    fetch("http://localhost:7071/api/setupProfile", {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset-UTF-8",
            authentication: emailToken
        }
    }).then((response) =>
        response.json()).then((data) => {
            console.log("getting user_id was a succes. id is: " + data[0])
            let userID = data[0];
            fetch('http://localhost:7071/api/homepageAdmin', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userID: userID
                        })
                    }).then(res => res.json()).then(data => {
                        if (data[0] == 'TotalUsers Succeded') {
                            let personsArray;
                            personsArray = data[1];
                            let table = document.getElementById('users_tbl');
                            rowCount = table.rows.length;
                            for (var i = 1; i < rowCount; i++) {
                                table.deleteRow(1)
                            }
                            for (var i = 0; i < personsArray.length; i++) {
                                console.log("Rows " + i + 1)
                                var newRow = table.insertRow(i + 1);
                                var userID = newRow.insertCell(0);
                                userID.innerHTML = personsArray[i].userID
                                var name = newRow.insertCell(1)
                                name.innerHTML = personsArray[i].name
                            }
                        } else {
                            alert('');
                        }
                    }) .catch((error) => {
                        console.error('Error:', error);
                    });
            }).catch((err) => {
                console.log(err)
            })
}