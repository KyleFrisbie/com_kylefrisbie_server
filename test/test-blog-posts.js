var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

describe('blog-posts', function () {
    it('should get a list of all blog posts on /posts GET');
    it('should get a single blog post on /posts/\<id\> GET');
    it('should post a single blog post on /posts :wqaPOST');
    it('should update a single blog post on /posts/\<id\> PUT');
    it('should delete a single blog post on /posts/\<id\> DELETE');
});