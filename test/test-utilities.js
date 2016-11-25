const faker = require('faker');
const BlogPost = require('../source/models/blog-post-model');
const User = require('../source/models/user-model');

const TestUtilities = {};

TestUtilities.generateFakeBlogPost = function () {
  return (
    new BlogPost({
      'title': faker.lorem.sentence(),
      'subtitle': faker.lorem.sentence(),
      'createdOn': Date(faker.date.past()),
      'modifiedOn': Date(faker.date.recent()),
      'author': faker.fake('{{name.firstName}} {{name.lastName}}'),
      'imageURL': faker.image.imageUrl(),
      'tags': [{'name': faker.lorem.word()}, {'name': faker.lorem.word()}, {'name': faker.lorem.word()}],
      'postBody': faker.lorem.paragraphs()
    }));
};

TestUtilities.generateFakeUser = function () {
  return (
    new User({
      'username': faker.internet.userName(),
      'password': faker.internet.password(),
      'firstName': faker.name.firstName(),
      'lastName': faker.name.lastName(),
      'createdOn': Date(faker.date.past())
    }));
};

TestUtilities.genericResponseRequirements = function (res) {
  res.should.have.status(200);
  res.should.be.json;
  res.body.should.be.a('object');
  res.body.should.have.property('success');
  res.body.success.should.equal(true);
};

TestUtilities.saveDocumentToDB = function (document, done) {
  document.save(function (err, document) {
    if (err) {
      done(err);
    }
  });
};

TestUtilities.dateToString = function (date) {
  return (new Date(date).toString());
};

TestUtilities.verifyValidDocumentId = function (document, resDocument) {
  resDocument.should.have.property('_id');
  resDocument._id.should.equal((document._id).toString());
};

TestUtilities.sortTagArray = function (tagArray) {
  return (tagArray.sort(function (a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  }));
};

TestUtilities.validateEachTag = function (originalTags, res) {
  res.body.blogPost.should.have.property('tags');
  res.body.blogPost.tags.should.be.a('Array')
    .and.have.lengthOf(originalTags.length);

  var sortedOriginalTags = this.sortTagArray(originalTags);
  var sortedResponseTags = this.sortTagArray(res.body.blogPost.tags);
  sortedOriginalTags.forEach(function (originalTag, index) {
    sortedResponseTags[index].should.have.property('name');
    sortedResponseTags[index].name.should.equal(originalTag.name);
    sortedResponseTags[index].should.have.property('_id');
    sortedResponseTags[index]._id.should.equal((originalTag._id).toString());
  });
};

TestUtilities.verifyValidBlogPost = function (blogPost, res) {
  res.body.should.have.property('blogPost');
  res.body.blogPost.should.have.property('title');
  res.body.blogPost.title.should.equal(blogPost.title);
  res.body.blogPost.should.have.property('subtitle');
  res.body.blogPost.subtitle.should.equal(blogPost.subtitle);
  res.body.blogPost.should.have.property('createdOn');
  this.dateToString(res.body.blogPost.createdOn).should.equal(this.dateToString(blogPost.createdOn));
  res.body.blogPost.should.have.property('modifiedOn');
  this.dateToString(res.body.blogPost.modifiedOn).should.equal(this.dateToString(blogPost.modifiedOn));
  res.body.blogPost.should.have.property('author');
  res.body.blogPost.author.should.equal(blogPost.author);
  res.body.blogPost.should.have.property('imageURL');
  res.body.blogPost.imageURL.should.equal(blogPost.imageURL);
  this.validateEachTag(blogPost.tags, res);
};

TestUtilities.verifyValidUser = function (user, res) {
  res.body.should.have.property('user');
  res.body.user.should.have.property('username');
  res.body.user.username.should.equal(user.username);
  res.body.user.should.have.property('password');
  res.body.user.password.should.equal(user.password);
  res.body.user.should.have.property('firstName');
  res.body.user.firstName.should.equal(user.firstName);
  res.body.user.should.have.property('lastName');
  res.body.user.lastName.should.equal(user.lastName);
  res.body.user.should.have.property('createdOn');
  this.dateToString(res.body.user.createdOn).should.equal(this.dateToString(user.createdOn));
};

TestUtilities.verifyUpdatedBlogPostProperties = function (updatedTitle, updateTags, res) {
  res.body.blogPost.should.have.property('title');
  res.body.blogPost.title.should.equal(updatedTitle);
  this.validateEachTag(updateTags, res);
};

module.exports = TestUtilities;
