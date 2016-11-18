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
            'createdOn': Date(faker.date.past()),
            'modifiedOn': Date(faker.date.recent()),
            'author': faker.fake("{{name.firstName}} {{name.lastName}}"),
            'imageURL': faker.image.imageUrl(),
            'tags': [{'name': faker.lorem.word()}, {'name': faker.lorem.word()}, {'name': faker.lorem.word()}],
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

function dateToString(date) {
    return (new Date(date).toString());
}

function verifyValidBlogPostId(blogPost, res) {
    res.body.blogPost.should.have.property('_id');
    res.body.blogPost._id.should.equal((blogPost._id).toString());
}

function sortTagArray(tagArray) {
    return (tagArray.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    }));
}

function validateEachTag(originalTags, res) {
    res.body.blogPost.should.have.property('tags');
    res.body.blogPost.tags.should.be.a('Array')
        .and.have.lengthOf(originalTags.length);

    var sortedOriginalTags = sortTagArray(originalTags);
    var sortedResponseTags = sortTagArray(res.body.blogPost.tags);
    sortedOriginalTags.forEach(function (originalTag, index) {
        sortedResponseTags[index].should.have.property('name');
        sortedResponseTags[index].name.should.equal(originalTag.name);
        sortedResponseTags[index].should.have.property('_id');
        sortedResponseTags[index]._id.should.equal((originalTag._id).toString());
    })
}

function verifyValidBlogPost(blogPost, res) {
    res.body.should.have.property('blogPost');
    res.body.blogPost.should.have.property('title');
    res.body.blogPost.title.should.equal(blogPost.title);
    res.body.blogPost.should.have.property('subtitle');
    res.body.blogPost.subtitle.should.equal(blogPost.subtitle);
    res.body.blogPost.should.have.property('createdOn');
    dateToString(res.body.blogPost.createdOn).should.equal(dateToString(blogPost.createdOn));
    res.body.blogPost.should.have.property('modifiedOn');
    dateToString(res.body.blogPost.modifiedOn).should.equal(dateToString(blogPost.modifiedOn));
    res.body.blogPost.should.have.property('author');
    res.body.blogPost.author.should.equal(blogPost.author);
    res.body.blogPost.should.have.property('imageURL');
    res.body.blogPost.imageURL.should.equal(blogPost.imageURL);
    validateEachTag(blogPost.tags, res);
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
                verifyValidBlogPostId(blogPost, res);
                verifyValidBlogPost(blogPost, res);
                done();
            });
    });

    it('should post a single blog post on /posts/create POST', function (done) {
        const blogPost = generateFakeBlogPost();
        chai.request(server)
            .post('/posts/create')
            .send(blogPost)
            .end(function (err, res) {
                genericResponseRequirements(res);
                verifyValidBlogPost(blogPost, res);
                done();
            });
    });

    it('should update a single blog post on /posts/\<id\> PUT', function (done) {
        const blogPost = generateFakeBlogPost();
        saveBlogPostToDB(blogPost, done);
        const updatedTitle = faker.lorem.sentence();
        blogPost.title = updatedTitle;
        const updatedTags = blogPost.tags.push({'name': faker.lorem.word()}, {'name': faker.lorem.word()});
        blogPost.tags = updatedTags;
    });
    it('should delete a single blog post on /posts/\<id\> DELETE');
});