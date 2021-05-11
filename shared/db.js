const { Connection, Request, TYPES } = require('tedious');
const config = require('./config.json');
const jwt = require("jsonwebtoken");
const safeJWT = require("../middleware/Jwt")
const bcrypt = require("bcryptjs");
const { request } = require('express');

var connection = new Connection(config);

function startDb() {
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log('Connection failed')
                reject(err)
                throw (err);
            } else {
                console.log('Connected')
                resolve();
            }
        })
        connection.connect();
    })
}
module.exports.sqlConnection = connection
module.exports.startDb = startDb

// Funktion til at oprette bruger i databasen
function insert(payload) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [datingapplication].[tbl_users] (username, email, password) VALUES (@username, @email, @password)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });

        request.addParameter('id', TYPES.Int, payload.id)
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)


        request.on('requestCompleted', (row) => {
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });

}
module.exports.insert = insert

// Function til at target specifik user på dens ID.
function selectProfile(users_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_profile] WHERE users_id = @users_id`;
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({ message: 'User does not exits' })
            }
        });
        request.addParameter('users_id', TYPES.Int, users_id)
        request.on('row', (colomns) => {
            let profile = {
                profileID: colomns[0].value,
                name: colomns[1].value,
                age: colomns[2].value,
                gender: colomns[3].value,
                interest1: colomns[4].value,
                interest2: colomns[5].value,
                interest3: colomns[6].value,
                university: colomns[7].value
            }
            resolve(profile)
        });
        connection.execSql(request)
    })
}

module.exports.selectProfile = selectProfile


// Function til at logge specifik user på email.
function login(email) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE email = @email`;
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err)
                console.log(reject)
            } else if (rowcount == 0) {
                reject({ message: 'User does not exist' })
            }
        });

        request.addParameter('email', TYPES.VarChar, email)

        //bcrypt.compareSync(password, hash); // true

        request.on('row', (colomns) => {
            resolve(colomns)
            console.log('Db login function succeeded')
        });
        connection.execSql(request)
    })
}
module.exports.login = login

// Funktion til at oprette brugerens profil i databasen
function setupProfile(payload) {
    return new Promise(async (resolve, reject) => {
        const sql = `IF EXISTS (SELECT * FROM [datingapplication].[tbl_profile] WHERE users_id = @users_id)
        BEGIN 
        UPDATE [datingapplication].[tbl_profile] SET name = @name, age = @age, gender = @gender, interest1 = @interest1,
        interest2 = @interest2, interest3 = @interest3, university = @university WHERE users_id = @users_id
        END ELSE BEGIN 
        INSERT INTO [datingapplication].[tbl_profile] (name, age, gender, interest1, interest2, interest3, university, users_id) 
        VALUES (@name, @age, @gender, @interest1, @interest2, @interest3, @university, @users_id)
        END`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });

        request.addParameter('users_id', TYPES.Int, payload.usersId)
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.SmallInt, payload.age)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('interest1', TYPES.VarChar, payload.interest1)
        request.addParameter('interest2', TYPES.VarChar, payload.interest2)
        request.addParameter('interest3', TYPES.VarChar, payload.interest3)
        request.addParameter('university', TYPES.VarChar, payload.university)

        request.on('requestCompleted', (row) => {
            resolve('Profile Inserted', row)
        });
        connection.execSql(request)
    });

}
module.exports.setupProfile = setupProfile

// Funktion til at slette brugerens profil i databasen
function deleteProfile(payload) {
    return new Promise(async (resolve, reject) => {
        const sql = `DELETE FROM [datingapplication].[tbl_profile] WHERE users_id = @users_id`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });

        request.addParameter('users_id', TYPES.Int, payload.usersId)
        request.addParameter('id', TYPES.Int, payload.id)
        console.log("here and users id is:  " + payload.usersId)

        request.on('requestCompleted', (row) => {
            resolve('Profile Deleted', row)
        });
        connection.execSql(request)
    });

}
module.exports.deleteProfile = deleteProfile

// Function til at hente specifik user på dens token som er koblet på mailen.
function getUserID(emailToken) {
    console.log("getUserID function has been activated. Getting ID from database.")

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE email = @email`;
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({ message: 'User does not exits' })
            }
        });
        request.addParameter('email', TYPES.VarChar, safeJWT(emailToken))

        request.on('row', (colomns) => {
            let id = colomns[0].value
            resolve(id)
        });
        connection.execSql(request)
    })
}
module.exports.getUserID = getUserID;

// Function til at target specifik Profile på dens ID.
function getProfileID(userID) {
    console.log("getProfileID function has been activated. Getting ID from database.")

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_profile] WHERE users_id = @users_id`;
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({ message: 'Profile does not exits' })
            }
        });
        request.addParameter('users_id', TYPES.VarChar, userID)

        request.on('row', (colomns) => {
            let id = colomns[0].value
            resolve(id)
        });
        connection.execSql(request)
    })
}
module.exports.getProfileID = getProfileID;


// Function til at target specifik Profile på dens ID.
function addLike(profileID, likedUserID) {
    return new Promise(async (resolve, reject) => {
        console.log("addLike function has been activated. Adding like to database.");

        const sql = `IF NOT EXISTS (SELECT * FROM [datingapplication].[tbl_likes] WHERE profile_id = @profile_id AND likedProfile_id = @likedProfile_id)
        BEGIN
        INSERT INTO [datingapplication].[tbl_likes] (profile_id, likedProfile_id) VALUES (@profile_id, @likedProfile_id)
        END`

        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('profile_id', TYPES.Int, profileID);
        request.addParameter('likedProfile_id', TYPES.Int, likedUserID);
        request.on('row', (colomns) => {
            resolve("addLike suceeded.", colomns)
        });
        connection.execSql(request)
    });
}
module.exports.addlike = addLike;


// Function til at hente Profiler, som er givet like på dens ID.
function getPossibleLikes(profileID) {
    return new Promise(async (resolve, reject) => {
        console.log("getPossibleLikes function has been activated. Getting likes from the database.");

        const sql = `SELECT * FROM [datingapplication].[tbl_profile] WHERE id != @id`

        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });

        request.addParameter('id', TYPES.VarChar, profileID)

        console.log("consoling connectionstate:")
        console.log(connection.state)

        let array = [];

        request.on('row', (colomns) => {
            if (array.length == 5) {
                resolve(array)
            } else {
                let oneUser = {
                    profileID: colomns[0].value,
                    name: colomns[1].value,
                    age: colomns[2].value,
                    gender: colomns[3].value,
                    interest1: colomns[4].value,
                    interest2: colomns[5].value,
                    interest3: colomns[6].value,
                    university: colomns[7].value,
                }
                array.push(oneUser);
            }
        });
        connection.execSql(request)
    })
}
module.exports.getPossibleLikes = getPossibleLikes;


function adminLogin(email) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE email = 'admin@admin.com'`;
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err)
                console.log(reject)
            } else if (rowcount == 0) {
                reject({ message: 'User does not exist' })
            }
        });

        request.addParameter('email', TYPES.VarChar, email)

        //bcrypt.compareSync(password, hash); // true

        request.on('row', (colomns) => {
            resolve(colomns)
            console.log('Db login function succeeded')
        });
        connection.execSql(request)
    })
}
module.exports.adminLogin = adminLogin

function getUsersAdmin(userID) {
    console.log('Getting users')
    return new Promise(async (resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_profile] WHERE users_id = @users_id`

        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        console.log(userID)

        request.addParameter('users_id', TYPES.VarChar, userID)

        let array = [];

        request.on('row', (colomns) => {
            if (array.length == 5) {
                resolve(array)
            } else {
                let oneUser = {
                    userID: colomns[0].value,
                    name: colomns[1].value,
                }
                array.push(oneUser);
            }
        });
        connection.execSql(request)
    })
}
module.exports.getUsersAdmin = getUsersAdmin;

function getLikeID(profileID, likedProfileID) {
    try {
        //Prøvede at lave connection.state.name om til loggedIn for at undgå fejl. Men dette laver blot en ny fejl.
        if (connection.state.name !== "LoggedIn") {
            setTimeout(getLikeID, 0);
            console.log("connections.state.name was just changed from: " + connection.state.name)
        } else {

            console.log("getLikeID function has been activated. Getting ID from database.")

            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM [datingapplication].[tbl_likes] WHERE profile_id = @profile_id AND likedProfile_id = @likedProfile_id`;
                const request = new Request(sql, (err, rowcount) => {
                    if (err) {
                        reject(err)
                        console.log(err)
                    } else if (rowcount == 0) {
                        reject({ message: 'Like does not exits' })
                    }
                })

                request.addParameter('profile_id', TYPES.Int, profileID)
                request.addParameter('likedProfile_id', TYPES.Int, likedProfileID)

                console.log("consoling connectionstate:")
                console.log("connections.state.name is now: " + connection.state.name)

                request.on('row', (colomns) => {

                    let like = {
                        likeID: colomns[0].value,
                        profileID: profileID,
                        likedProfileID: likedProfileID
                    }
                    console.log(like)
                    resolve(like)
                })

                connection.execSql(request)
            })
        }
    } catch (err) {
        throw (err)
    }
}
module.exports.getLikeID = getLikeID;

function comparingLikes(profileID, likedUserID, likeID) {
    return new Promise(async (resolve, reject) => {
        console.log("comparingLikes function has been activated. Comparing likes in the database.");

        const sql = `IF EXISTS (SELECT * FROM [datingapplication].[tbl_likes] WHERE profile_id = @likedProfile_id AND likedProfile_id = @profile_id AND id != @like_id)
        BEGIN
            SELECT * FROM [datingapplication].[tbl_likes] WHERE profile_id = @likedProfile_id AND likedProfile_id = @profile_id AND id != @like_id  
        END
        ELSE
            SELECT * FROM [datingapplication].[tbl_likes] WHERE id = @like_id`

        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('profile_id', TYPES.Int, profileID);
        request.addParameter('likedProfile_id', TYPES.Int, likedUserID);
        request.addParameter('like_id', TYPES.Int, likeID);

        request.on('row', (colomns) => {
            let ifMatch;
            let secondLikeID = colomns[0].value
            if (secondLikeID != likeID) {
                ifMatch = {
                    status: "yes",
                    secondLikeID: secondLikeID,
                    firstLikeID: likeID
                }
            } else {
                ifMatch = {
                    status: "no",
                }
            }
            resolve(ifMatch)
        });
        connection.execSql(request)
    });
}
module.exports.comparingLikes = comparingLikes;

function insertMatch(firstLikeID, secondLikeID) {
    return new Promise(async (resolve, reject) => {
        console.log("insertMatch function has been activated. Adding match to database.");

        const sql = `IF NOT EXISTS (SELECT * FROM [datingapplication].[tbl_matches] WHERE like_id1 = @like_id1 AND like_id2 = @like_id2)
        BEGIN
        INSERT INTO [datingapplication].[tbl_matches] (like_id1, like_id2) VALUES (@like_id1, @like_id2)
        END`
        console.log("i was here")
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });
        console.log("i was heree")
        request.addParameter('like_id1', TYPES.Int, firstLikeID);
        request.addParameter('like_id2', TYPES.Int, secondLikeID);

        request.on("row", (columns) => {
            console.log("i was hereeee")
            console.log(columns[0].value)
            let match = "hell ya"
            resolve(match)
        });
        connection.execSql(request)
    });
}
module.exports.insertMatch = insertMatch;