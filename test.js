const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let expect = require("chai").expect;

  
  it('it should log in', function() {   // <= No done callback
    chai.request('http://localhost:7071')
    .post('/api/login')
    .type("form")
    .send({
        email:"emil@emil.com",
        password:"1234", 
    })
    .end(function(err, res) {
      expect(res).to.have.status(123);    // <= Test completes before this runs
    });
  });