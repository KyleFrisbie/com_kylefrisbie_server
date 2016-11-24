const mongoose = require('mongoose');
const tagSchema = require('./tag-model').tagSchema;
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: String,
  subtitle: String,
  createdOn: Date,
  modifiedOn: Date,
  author: String,
  imageURL: String,
  tags: [tagSchema],
  postBody: String
});

const BlogPostModel = mongoose.model('blogPosts', blogPostSchema);
module.exports = BlogPostModel;
