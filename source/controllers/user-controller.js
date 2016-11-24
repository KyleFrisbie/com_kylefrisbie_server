const User = require('../models/user-model');

const UserController = {};

UserController.getAllUsers = function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return res.json({"success": false});
        }
        return res.json({
            "success": true,
            "users": users
        });
    });
};

module.exports = UserController;