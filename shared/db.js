const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json');
const jwt = require("jsonwebtoken");
const safeJWT = require("../middleware/Jwt")
const bcrypt = require("bcryptjs");

var connection = new Connection(config);

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err){
                console.log('Connection failed')
                reject(err)
                throw(err);
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
            if (err){
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

function select(username) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE username = @username`;
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: 'User does not exits'})
            }
        });
        request.addParameter('username', TYPES.VarChar, username)
        request.on('row', (colomns) => {
            let id = colomns[0].value
            resolve(id)
        });
        connection.execSql(request)
    })
}

module.exports.select = select

function login(email) {
    return new Promise((resolve, reject) => {
        
        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE email = @email`;
        const request = new Request(sql, (err, rowcount) => {
            if(err) {
                reject(err)
                console.log(reject)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
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
function setupProfile(payload, emailToken) {
    return new Promise(async (resolve, reject) => {
        const sql = `IF EXISTS (SELECT * FROM [datingapplication].[tbl_profile] WHERE users_email = @users_email)
        BEGIN 
        UPDATE [datingapplication].[tbl_profile] SET name = @name, age = @age, gender = @gender, interest1 = @interest1,
        interest2 = @interest2, interest3 = @interest3, university = @university WHERE users_email = @users_email
        END ELSE BEGIN 
        INSERT INTO [datingapplication].[tbl_profile] (name, age, gender, interest1, interest2, interest3, university, users_email, users_id) 
        VALUES (@name, @age, @gender, @interest1, @interest2, @interest3, @university, @users_email, @users_id)
        END`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        //her bruges middleware (jwt)
        request.addParameter('users_id', TYPES.Int, payload.usersID)
        request.addParameter('users_email', TYPES.VarChar, safeJWT(emailToken))
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.SmallInt, payload.age)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('interest1', TYPES.VarChar, payload.interest1)
        request.addParameter('interest2', TYPES.VarChar, payload.interest2)
        request.addParameter('interest3', TYPES.VarChar, payload.interest3)
        request.addParameter('university', TYPES.VarChar, payload.university)

        console.log("igot here111")

        request.on('requestCompleted', (row) => {
            resolve('Profile Inserted', row)
        });
        connection.execSql(request)
    });

}
module.exports.setupProfile = setupProfile

// Funktion til at slette brugerens profil i databasen
function deleteProfile(payload, emailToken) {
    return new Promise(async (resolve, reject) => {
        const sql = `DELETE  profile FROM [datingapplication].[tbl_profile] WHERE email = @email`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });

        //her bruges middleware (jwt)
        request.addParameter('email', TYPES.VarChar, safeJWT(emailToken))
        request.on('requestCompleted', (row) => {
            resolve('Profile Deleted', row)
        });
        connection.execSql(request)
    });

}
module.exports.deleteProfile = deleteProfile


function selectProfile(emailToken) {
    console.log("selectProfile function has been activated. Getting ID from database.")

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE email = @email`;
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: 'User does not exits'})
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

module.exports.selectProfile = selectProfile