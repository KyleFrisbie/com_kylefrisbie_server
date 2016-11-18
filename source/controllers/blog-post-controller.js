const BlogPostController = {};

BlogPostController.getAllBlogPosts = function (req, res, next) {
    res.json({"success": true});
};

module.exports = BlogPostController;