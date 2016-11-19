const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const server = require('../source/index');
const Users = require('../source/models/user-model');

const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('users', function () {
    it('should create generate dummy users to test');
    it('should get a list of all users on /users GET');
    it('should get a single user on /users/\<id\> GET');
    it('should post a single user on /users/create POST');
    it('should update a single user on /users/\<id\> PUT');
    it('should delete a single user on /users/\<id\> DELETE');
});
