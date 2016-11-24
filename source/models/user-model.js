const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;