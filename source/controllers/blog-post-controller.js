const BlogPost = require('../models/blog-post-model.js');
const TagUtility = require('../utilities/tag-utility');

const BlogPostController = {};

BlogPostController.getAllBlogPosts = function (req, res, next) {
    BlogPost.find(function (err, blogPosts) {
        if (err) {
            return res.json({"success": false});
        }
        return res.json({
            "success": true,
            "blogPosts": blogPosts
        });
    });
};

BlogPostController.getBlogPost = function (req, res, next) {
    BlogPost.findOne({'_id': req.params.id}, function (err, blogPost) {
        if (err) {
            return res.json({"success": false});
        }
        return res.json({
            "success": true,
            "blogPost": blogPost
        });
    });
};

BlogPostController.createBlogPost = function (req, res, next) {
    var tagList = req.body.tags;
    if (tagList) {
        var promise = TagUtility.addTags(req.body.tags);
        promise.then(function (tags) {
            tagList = tags;
        });
    }
    const blogPost = new BlogPost({
        'title': req.body.title,
        'subtitle': req.body.subtitle,
        'createdOn': req.body.createdOn,
        'modifiedOn': req.body.modifiedOn,
        'author': req.body.author,
        'imageURL': req.body.imageURL,
        'tags': tagList,
        'postBody': req.body.postBody
    });

    blogPost.save(function (err) {
        if (err) {
            return res.json({
                "success": false,
                "blogPost": blogPost
            });
        }
        return res.json({
            "success": true,
            "blogPost": blogPost
        });
    });
};

BlogPostController.updateBlogPost = function (req, res, next) {

    BlogPost.findOne({'_id': req.params.id}, function (err, blogPost) {
        if (err) {
            return res.json({
                "success": false,
                "blogPost": req.body
            });
        }
        blogPost = req.body;
        return res.json({
            "success": true,
            "blogPost": blogPost
        });
    });
};

module.exports = BlogPostController;