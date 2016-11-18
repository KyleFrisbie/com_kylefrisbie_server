const BlogPost = require('../models/blog-post-model.js');
const BlogPostController = {};

BlogPostController.getAllBlogPosts = function (req, res, next) {
    BlogPost.find(function (err, blogPosts) {
        if (err) {
            return res.json({"success": false});
        }
        return res.json(
            {
                "success": true,
                "blogPosts": blogPosts
            }
        );
    });
};

BlogPostController.getBlogPost = function (req, res, next) {
    BlogPost.findOne({'_id': req.params.id}, function (err, blogPost) {
        if (err) {
            return res.json({"success": false});
        }
        return res.json(
            {
                "success": true,
                "blogPost": blogPost
            }
        )
    });
};

module.exports = BlogPostController;