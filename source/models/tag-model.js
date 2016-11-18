const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tags = {};

tags.tagSchema = new Schema({
    name: String
});

tags.TagModel = mongoose.model('tags', tags.tagSchema);
module.exports = tags;