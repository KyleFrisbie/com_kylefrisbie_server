const BlogPostController = require('./controllers/blog-post-controller');

module.exports = function (app) {
    app.get('/posts', BlogPostController.getAllBlogPosts);
    app.get('/posts/:id', BlogPostController.getBlogPost);
    app.post('/posts/create', BlogPostController.createBlogPost);
    app.put('/posts/:id', BlogPostController.updateBlogPost);
    app.delete('/posts/:id', BlogPostController.deleteBlogPost);
};