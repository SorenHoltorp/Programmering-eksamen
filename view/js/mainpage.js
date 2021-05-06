//returns to index if no token
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

function getProfileInformation() {
    let userToken = localStorage.getItem('token');
    fetch('http://localhost:7071/api/setupProfile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authentication: userToken
        }
    }).then(res => res.json()).then(data => {
        if (data[0] == 'profileInformation succeded') {
            let informationArray;
            informationArray = data[1];
            let table = document.getElementById('table1');
            rowCount = table.rows.length; 
            for (var i = 1; i < rowCount; i++) {
                table.deleteRow(1)
            }
            for (var i = 1; i < informationArray.length; i++) {
                console.log('Rows' + i + 1)
                var newRow = table.insertRow(i + 1);
                var name = newRow.insertCell(0);
                name.innerHTML = informationArray[i].name;
                var age = newRow.insertCell(1);
                age.innerHTML = informationArray[i].age;
                var gender = newRow.insertCell(2);
                gender.innerHTML = informationArray[i].gender;
                var interests = newRow.insertCell(3);
                interests.innerHTML = informationArray[i].interests;
                var university = newRow.insertCell(4);
                university.innerHTML = informationArray[i].university;

            }
        }   else {
            alert('Please add profile information')
        } 
    })
        .catch((err) => {
            console.log(err);
        })
}