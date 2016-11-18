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
    it('should create a user');
});
