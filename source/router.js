const BlogPostController = require('./controllers/blog-post-controller');
const UserController = require('./controllers/user-controller');

module.exports = function (app) {
    /* blog post routes */
    app.get('/posts', BlogPostController.getAllBlogPosts);
    app.get('/posts/:id', BlogPostController.getBlogPost);
    app.post('/posts/create', BlogPostController.createBlogPost);
    app.put('/posts/:id', BlogPostController.updateBlogPost);
    app.delete('/posts/:id', BlogPostController.deleteBlogPost);

    /* user routes */
    app.get('/users', UserController.getAllUsers);
};