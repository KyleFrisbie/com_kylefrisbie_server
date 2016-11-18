const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const server = require('../source/index');
const BlogPost = require('../source/models/blog-post-model');
const TestUtilities = require('./test-utilities');

const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('blog-posts', function () {
    BlogPost.collection.drop();

    it('should generate dummy blog posts to test', function (done) {
        for (var i = 0; i < 50; i++) {
            var blogPost = TestUtilities.generateFakeBlogPost();
            TestUtilities.saveBlogPostToDB(blogPost, done);
        }
        done();
    });

    it('should get a list of all blog posts on /posts GET', function (done) {
        chai.request(server)
            .get('/posts')
            .end(function (err, res) {
                TestUtilities.genericResponseRequirements(res);
                res.body.should.have.property('blogPosts');
                res.body.blogPosts.length.should.equal(50);
                done();
            });
    });

    it('should get a single blog post on /posts/\<id\> GET', function (done) {
        const blogPost = TestUtilities.generateFakeBlogPost();
        TestUtilities.saveBlogPostToDB(blogPost, done);
        const blogPostId = blogPost._id;
        chai.request(server)
            .get('/posts/' + blogPostId)
            .end(function (err, res) {
                TestUtilities.genericResponseRequirements(res);
                TestUtilities.verifyValidBlogPostId(blogPost, res);
                TestUtilities.verifyValidBlogPost(blogPost, res);
                done();
            });
    });

    it('should post a single blog post on /posts/create POST', function (done) {
        const blogPost = TestUtilities.generateFakeBlogPost();
        chai.request(server)
            .post('/posts/create')
            .send(blogPost)
            .end(function (err, res) {
                TestUtilities.genericResponseRequirements(res);
                TestUtilities.verifyValidBlogPost(blogPost, res);
                done();
            });
    });

    it('should update a single blog post on /posts/\<id\> PUT', function (done) {
        const blogPost = TestUtilities.generateFakeBlogPost();
        TestUtilities.saveBlogPostToDB(blogPost, done);
        const updatedTitle = faker.lorem.sentence();
        blogPost.title = updatedTitle;
        const updatedTags = blogPost.tags;
        updatedTags.push({'name': faker.lorem.word()}, {'name': faker.lorem.word()});
        blogPost.tags = updatedTags;
        chai.request(server)
            .put('/posts/' + blogPost._id)
            .send(blogPost)
            .end(function (err, res) {
                TestUtilities.genericResponseRequirements(res);
                TestUtilities.verifyValidBlogPostId(blogPost, res);
                TestUtilities.verifyUpdatedBlogPostProperties(updatedTitle, updatedTags, res);
                done();
            });
    });

    it('should delete a single blog post on /posts/\<id\> DELETE', function (done) {
        const blogPost = TestUtilities.generateFakeBlogPost();
        TestUtilities.saveBlogPostToDB(blogPost, done);
        chai.request(server)
            .delete('/posts/' + blogPost._id)
            .end(function (err, res) {
                TestUtilities.genericResponseRequirements(res);
                done();
            });
    });
});