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


//Get your own profile
function getProfileInformation() {
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


            fetch('http://localhost:7071/api/homePage', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userID
                })
            }).then(res => res.json()).then(data => {
                if (data[0] == 'succes') {
                    console.log("getting profile was a succes.")
                    let informationArray;
                    informationArray = data[1];
                    let table = document.getElementById('profiletable');
                    rowCount = table.rows.length;
                    for (var i = 1; i < rowCount; i++) {
                        table.deleteRow(1)
                    }
                    for (var i = 0; i < informationArray.length; i++) {
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
                } else {
                    alert('Please add profile information')
                }
            })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
}

//sends request to server, and generates user based table. LETS GO LIKES
function getPossibleLikes() {

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

            //henter  profil_id
            fetch("http://localhost:7071/api/like", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({
                    userID: userID
                })
            }).then((response) =>
                response.json()).then((data) => {
                    console.log("getting id was a succes. id is: " + data[0])

                    let profileID = data[0];

                    fetch('http://localhost:7071/api/getPossibleLikes', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            profileID: profileID
                        })
                    }).then(res => res.json()).then(data => {
                        if (data[0] == 'possibleMatches succeded') {
                            let personsArray;
                            personsArray = data[1];
                            let table = document.getElementById('liketbl');
                            rowCount = table.rows.length;
                            for (var i = 1; i < rowCount; i++) {
                                table.deleteRow(1)
                            }
                            for (var i = 0; i < personsArray.length; i++) {
                                console.log("Rows " + i + 1)
                                var newRow = table.insertRow(i + 1);
                                var name = newRow.insertCell(0);
                                name.innerHTML = personsArray[i].name;
                                var age = newRow.insertCell(1);
                                age.innerHTML = personsArray[i].age;
                                var gender = newRow.insertCell(2);
                                gender.innerHTML = personsArray[i].gender;
                                var interest1 = newRow.insertCell(3);
                                interest1.innerHTML = personsArray[i].interest1;
                                var interest2 = newRow.insertCell(4);
                                interest2.innerHTML = personsArray[i].interest2;
                                var interest3 = newRow.insertCell(5);
                                interest3.innerHTML = personsArray[i].interest3;
                                var university = newRow.insertCell(6);
                                university.innerHTML = personsArray[i].university;
                                var like = newRow.insertCell(7);
                                createButton(like, likeB, 'Like', personsArray[i].profileID);
                                /*var dislike = newRow.insertCell(4);
                                createButton(dislike, dislikeB, 'Dislike', personsArray[i].profileID);
                                */

                            }
                        } else {
                            alert('Sorry, you cannot see possible matches. \nWe will fix the problem soon as possible.');
                        }
                    })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }).catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
}

//pressing likebutton on table will push them to like-array
function likeUser(likedProfileID) {
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

            //henter  profil_id
            fetch("http://localhost:7071/api/like", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({
                    userID: userID
                })
            }).then((response) =>
                response.json()).then((data) => {
                    console.log("getting profile_id was a succes. id is: " + data[0])

                    fetch('http://localhost:7071/api/like', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            likedProfileID: likedProfileID,
                            profileID: data[0]
                        })
                    }).then(res => res.json()).then(data => {
                        console.log("adding like was a: " + data[0])
                        console.log("For like, we have profile id : " + data[1] + ". And likedprofile id: " + data[2])
                        if (data[0] == 'succes') {
                            fetch('http://localhost:7071/api/like', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    likedProfileID: data[2],
                                    profileID: data[1]
                                })
                            }).then(res => res.json()).then(data => {
                                let like = data[0]
                                console.log("Like just added to database: " + like)
//Match
                                fetch('http://localhost:7071/api/match', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        likeID: data[0],
                                        profileID: data[1],
                                        likedProfileID: data[2]
                                    })
                                }).then(res => res.json()).then(data => {
                                    console.log(data)
                                    if (data[0].status == "yes") {

                                        fetch('http://localhost:7071/api/match', {
                                            method: 'PATCH',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                likeID1: data[0].firstLikeID,
                                                likeID2: data[0].secondLikeID
                                            })
                                        }).then(res => res.json()).then(data => {
                                            console.log(data)
                                            if (data[0].status = "succes"){
                                                alert("congratz! You got a match!")
                                            } else {
                                                console.log("match error")
                                            }
                                        })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                });
                                    } else if (data[0].status == "no") {
                                        alert('Pretty one! \nLets hope you will be liked aswell.');
                                    }
                                })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });

                            })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                            /* potential match function
                            for (var i = 0; i < data[1].length; i++) {
                                if (data[4] == data[1][i]) {
                                    //if match
                                    alert('Congratz! You just matched with ' + data[2] + ' ' + data[3] + '. Click "See my matches" to see the profile.')
                                    break;
                                }
                            }
                            */
                        } else {
                            alert('Sorry, you cannot like persons at the moment. \nWe will fix the problem soon as possible.')
                        }
                    })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                }).catch((err) => {
                    console.log(err)
                })

        }).catch((err) => {
            console.log(err)
        })
}



//creates form of js-button by the table. three button are generated after
function createButton(context, func, value, profileid) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.addEventListener('click', function (e) {
        func(profileid);
    });
    context.appendChild(button);

}
//generates likefunction
function likeB(profileid) {
    console.log("Like profileID: " + profileid);
    likeUser(profileid);
}
//generates the removing match button
function removeMatchB(profileid) {
    console.log("Removing match with profileID: " + profileid);
    removeMatch(profileid);
}
