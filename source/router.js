const BlogPostController = require('./controllers/blog-post-controller');

module.exports = function (app) {
    app.get('/posts', BlogPostController.getAllBlogPosts);
};