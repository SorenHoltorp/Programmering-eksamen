const { Connection, Request, TYPES } = require('tedious');
const config = require('./config.json');
const jwt = require("jsonwebtoken");
const safeJWT = require("../middleware/Jwt")
const bcrypt = require("bcryptjs");

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

function selectProfile(users_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_profile] WHERE users_id = users_id`;
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
            resolve(colomns)
        });
        connection.execSql(request)
    })
}

module.exports.selectProfile = selectProfile

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

        request.addParameter('users_id', TYPES.Int, payload.users_id)
        console.log("here")

        request.on('requestCompleted', (row) => {
            resolve('Profile Deleted', row)
        });
        connection.execSql(request)
    });

}
module.exports.deleteProfile = deleteProfile


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


function addLike(profileID, likedUserID) {
    return new Promise(async (resolve, reject) => {
        console.log("addLike function has been activated. Adding like to database.");

        const sql = `INSERT INTO [datingapplication].[tbl_likes] (profile_id, likedProfile_id) 
        VALUES (@profile_id, @likedProfile_id)`

        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            }
        });

        request.addParameter('profile_id', TYPES.Int, profileID);
        request.addParameter('likedProfile_id', TYPES.Int, likedUserID);

        request.on('requestCompleted', (row) => {
            resolve('Like Inserted', row)
        });
        connection.execSql(request)
    });
}
module.exports.addlike = addLike;


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
        console.log(profileID)

        request.addParameter('id', TYPES.VarChar, profileID)

        let array = [];
        let count = 0;

        request.on('row', (colomns) => {
            if(count == 5){
                resolve(array)
            } else {
                count += 1;
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

            console.log("The array is now: " + array)
            console.log(count)
            }
        });
        connection.execSql(request)
    })
}
module.exports.getPossibleLikes = getPossibleLikes;