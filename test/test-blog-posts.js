var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../source/index');
var should = chai.should();

chai.use(chaiHttp);

describe('blog-posts', function () {
    it('should get a list of all blog posts on /posts GET', function (done) {
        chai.request(server)
            .get('/posts')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.equal(true);
                done();
            });
    });
    it('should get a single blog post on /posts/\<id\> GET');
    it('should post a single blog post on /posts :wqaPOST');
    it('should update a single blog post on /posts/\<id\> PUT');
    it('should delete a single blog post on /posts/\<id\> DELETE');
});