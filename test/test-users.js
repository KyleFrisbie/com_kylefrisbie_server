const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const server = require('../source/index');
const User = require('../source/models/user-model');
const TestUtilities = require('./test-utilities');

const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('users', function () {
  User.collection.drop();

  it('should create generate dummy users to test', function (done) {
    for (var i = 0; i < 50; i++) {
      var user = TestUtilities.generateFakeUser();
      TestUtilities.saveDocumentToDB(user, done);
    }
    done();
  });

  it('should get a list of all users on /users GET', function (done) {
    chai.request(server)
      .get('/users')
      .end(function (err, res) {
        if (err) { done(err); }
        TestUtilities.genericResponseRequirements(res);
        res.body.should.have.property('users');
        done();
      });
  });

  it('should get a single user on /users/<id> GET', function (done) {
    const user = TestUtilities.generateFakeUser();
    TestUtilities.saveDocumentToDB(user, done);
    const userId = user._id;
    chai.request(server)
      .get('/users/' + user._id)
      .end(function (err, res) {
        if (err) { done(err); }
        TestUtilities.genericResponseRequirements(res);
        TestUtilities.verifyValidDocumentId(user, res.body.user);
        done();
      });
  });

  it('should post a single user on /users/create POST', function (done) {
    const user = TestUtilities.generateFakeUser();
    chai.request(server)
      .post('/users/create')
      .send(user)
      .end(function (err, res) {
        if (err) { done(err); }
        TestUtilities.genericResponseRequirements(res);
        TestUtilities.verifyValidUser(user, res);
        done();
      });
  });

  it('should update a single user on /users/<id> PUT', function (done) {
    const user = TestUtilities.generateFakeUser();
    TestUtilities.saveDocumentToDB(user, done);
    const updatedFirstName = faker.name.firstName();
    user.firstName = updatedFirstName;
    const updatedPassword = faker.internet.password();
    user.password = updatedPassword;
    chai.request(server)
      .put('/users/' + user._id)
      .send(user)
      .end(function (err, res) {
        if (err) { done(err); }
        TestUtilities.genericResponseRequirements(res);
        TestUtilities.verifyValidDocumentId(user, res.body.user);
        res.body.user.should.have.property('firstName');
        res.body.user.firstName.should.equal(updatedFirstName);
        res.body.user.should.have.property('password');
        res.body.user.password.should.equal(updatedPassword);
        done();
      });
  });

  it('should delete a single user on /users/<id> DELETE', function (done) {
    const user = TestUtilities.generateFakeUser();
    chai.request(server)
      .delete('/users/' + user._id)
      .end(function (err, res) {
        if (err) { done(err); }
        // TODO: more testing to ensure user document was removed
        TestUtilities.genericResponseRequirements(res);
        done();
      });
  });
});
