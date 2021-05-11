// Chai Library
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let expect = require("chai").expect;

// UNIT TESTING af Login funktion
// FIRST TEST - Login success
describe('FIRST TEST - Login success', function () {
  it('it should log in', function(done) {   // <= No done callback
    // 1. Arrange
    let user = {
      email:"emil@emil.com",
      password:"1234"

    }
    // 2. Act
    chai.request('http://localhost:7071')
    .post('/api/login')
    .send(user)
    .end(function(err, res) {

      // 3. Assert
      res.should.have.status(200) // <= Test completes before this runs

      done(); 

    });
  });
})

// SECOND TEST - Failed Login
describe('SECOND TEST - Failed Login', function () {
  it('it should not log in', function(done) {   // <= No done callback
    // 1. Arrange
    let user = {
      email:"wronguser@gmail.com",
      password:"123456789"

    }
    // 2. Act
    chai.request('http://localhost:7071')
    .post('/api/login')
    .send(user)
    .end(function(err, res) {

      // 3. Assert
      res.should.have.status(400) // <= Test completes before this runs

      done(); 

    });
  });
});