const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


//Test signup
describe('POST /add', function () {
    it('should sign up', function (done) {
        let user = {
            username: "chrissermednudler",
            password: "1234",
            email: "christester@live.dk"
        };
        chai.request("localhost:3003")
            .post('/add')
            .send(user)
            .end(function (err, res) {
                done();
            })
    });
});


describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request("localhost:3003")
        .get('/get')
        .end((err, res) => {
            done();
        });
    });
});

