const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let expect = require("chai").expect;

  // First Test
  it('it should log in', function() {   // <= No done callback
    // 1. Arrange
    let user = {
      email:"emil@emil.com",
      password:"1234"

    }
    // 2. Act
    chai.request('http://localhost:7071')
    .post('/api/login')
    .type("form")
    .send(user)
    .end(function(err, res) {

      // 3. Assert
      expect(res).to.have.status(123);    // <= Test completes before this runs
    });
  });