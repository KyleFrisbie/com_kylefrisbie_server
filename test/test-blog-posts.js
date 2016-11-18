const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../source/index');
const BlogPost = require('../source/models/blog-post-model');

const should = chai.should();
chai.use(chaiHttp);

function generateFakeBlogPost() {
    return (
        new BlogPost({
            'title': faker.lorem.sentence(),
            'subtitle': faker.lorem.sentence(),
            'author': faker.fake("{{name.firstName}} {{name.lastName}}"),
            'imageURL': faker.image.imageUrl(),
            'tags': [{'name': faker.lorem.word()}, {'name': faker.lorem.word()}, {'name': faker.lorem.word()}],
            'createdOn': Date(faker.date.past()),
            'postBody': faker.lorem.paragraphs()
        }));
}

function genericResponseRequirements(res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('success');
    res.body.success.should.equal(true);
}

function saveBlogPostToDB(blogPost, done) {
    blogPost.save(function (err, blogPost) {
        if (err) {
            done(err);
        }
    });
}

describe('blog-posts', function () {
    BlogPost.collection.drop();

    it('should generate dummy blog posts to test', function (done) {
        for (var i = 0; i < 50; i++) {
            var blogPost = generateFakeBlogPost();
            saveBlogPostToDB(blogPost, done);
        }
        done();
    });

    it('should get a list of all blog posts on /posts GET', function (done) {
        chai.request(server)
            .get('/posts')
            .end(function (err, res) {
                genericResponseRequirements(res);
                res.body.should.have.property('blogPosts');
                res.body.blogPosts.length.should.equal(50);
                done();
            });
    });

    it('should get a single blog post on /posts/\<id\> GET', function (done) {
        const blogPost = generateFakeBlogPost();
        saveBlogPostToDB(blogPost, done);
        const blogPostId = blogPost._id;
        chai.request(server)
            .get('/posts/' + blogPostId)
            .end(function (err, res) {
                genericResponseRequirements(res);
                res.body.should.have.property('blogPost');
                res.body.blogPost.should.have.property('_id');
                console.log(res.body.blogPost);
                done();
            })
    });
    it('should post a single blog post on /posts POST');
    it('should update a single blog post on /posts/\<id\> PUT');
    it('should delete a single blog post on /posts/\<id\> DELETE');
});