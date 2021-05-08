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
    let usernameToken = localStorage.getItem('token');
    fetch('http://localhost:7071/api/homePage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authentication: usernameToken
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
                var interest1 = newRow.insertCell(3);
                interest1.innerHTML = informationArray[i].interest1;
                var interest2 = newRow.insertCell(4);
                interest2.innerHTML = informationArray[i].interest2;
                var interest3 = newRow.insertCell(5);
                interest3.innerHTML = informationArray[i].interest3;
                var university = newRow.insertCell(6);
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



//sends request to server, and generates user based table
function getPossibleLikes() {
    let emailToken = localStorage.getItem('token');
    fetch('http://localhost:7071/getPossibleLikes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authentication: emailToken
        }
        //Hertil!
    }).then(res => res.json()).then(data => {
        if (data[0] == 'possibleMatches succeded') {
            let personsArray;
            personsArray = data[1];
            let table = document.getElementById('table1');
            rowCount = table.rows.length;
            for (var i = 1; i < rowCount; i++) {
                table.deleteRow(1)
            }
            for (var i = 0; i < personsArray.length; i++) {
                console.log("Rows " + i + 1)
                var newRow = table.insertRow(i + 1);
                var firstname = newRow.insertCell(0);
                firstname.innerHTML = personsArray[i].fname;
                var lastname = newRow.insertCell(1);
                lastname.innerHTML = personsArray[i].lname;
                var gender = newRow.insertCell(2);
                gender.innerHTML = personsArray[i].gender;

                var like = newRow.insertCell(3);
                createButton(like, likeB, 'Like', personsArray[i].username);
                var dislike = newRow.insertCell(4);
                createButton(dislike, dislikeB, 'Dislike', personsArray[i].username);
            }
        } else {
            alert('Sorry, you cannot see possible matches. \nWe will fix the problem soon as possible.');
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}