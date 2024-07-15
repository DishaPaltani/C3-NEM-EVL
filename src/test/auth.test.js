const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe("Auth", () => {
  describe("POST /signup", () => {
    it("should register a new user", (done) => {
      chai.request(app)
        .post('/api/auth/signup')
        .send({
          username: "testuser",
          email: "testuser@example.com",
          password: "password"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User was registered successfully!');
          done();
        });
    });
  });
});
