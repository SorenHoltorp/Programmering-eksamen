const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json');
//const jwt = require("jsonwebtoken");
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
        
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('password', TYPES.VarChar, payload.password)


        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)
    
    });

}
module.exports.insert = insert

function select(username) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT username FROM [datingapplication].[tbl_users] WHERE username = @username`;
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
            resolve(colomns)
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
function createProfile(payload) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [datingapplication].[tbl_users] (name, age, gender, interest1, interest2, interest3, university) VALUES (@name, @age, @gender, @interest1, @interest2, @interest3, @university)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('age', TYPES.SmallInt, payload.age)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('interest1', TYPES.VarChar, payload.interest1)
        request.addParameter('interest2', TYPES.VarChar, payload.interest2)
        request.addParameter('interest3', TYPES.VarChar, payload.interest3)
        request.addParameter('university', TYPES.VarChar, payload.university)


        request.on('requestCompleted', (row) => {
            console.log('Profile created', row);
            resolve('Profile created', row)
        });
        connection.execSql(request)
    
    });

}
module.exports.createProfile = createProfile


function selectProfile(name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM [datingapplication].[tbl_users] WHERE name = @name`;
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: 'User does not exits'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
        request.on('row', (colomns) => {
            resolve(colomns)
        });
        connection.execSql(request)
    })
}

module.exports.selectProfile = selectProfile