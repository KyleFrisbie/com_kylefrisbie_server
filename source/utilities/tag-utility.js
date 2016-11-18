const mongoose = require('mongoose');
const TagModel = require('../models/tag-model').TagModel;
const TagUtility = {};

TagUtility.addTags = function (tagList) {
    return new Promise(function (resolve, reject) {
        var tags = [];
        tagList.forEach(function (tag) {
            mongoose.model('tags').findOne({'name': tag.name}, function (err, foundTag) {
                if (err) {
                    reject(Error(err));
                }
                if (!foundTag) {
                    foundTag = new TagModel({
                        'name': tag.name
                    });
                    foundTag.save();
                }
                tags.push(foundTag);
            });
        });
        resolve(tags);
    });
};

module.exports = TagUtility;