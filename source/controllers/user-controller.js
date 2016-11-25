const User = require('../models/user-model');

const UserController = {};

UserController.getAllUsers = function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return res.json({'success': false});
    }
    return res.json({
      'success': true,
      'users': users
    });
  });
};

UserController.getUser = function (req, res, next) {
  User.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      return res.json({'success': false});
    }
    return res.json({
      'success': true,
      'user': user
    });
  });
};

UserController.createUser = function (req, res, next) {
  const user = new User({
    'username': req.body.username,
    'password': req.body.password,
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'createdOn': req.body.createdOn
  });

  user.save(function (err) {
    if (err) {
      return res.json({
        'success': false,
        'user': user
      });
    }
    return res.json({
      'success': true,
      'user': user
    });
  });
};

UserController.updateUser = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    User.findByIdAndUpdate(req.body._id, req.body, function (err, user) {
      if (err) {
        success = false;
      }
      resolve(user);
    });
  });
  promise.then(function (user) {
    return res.json({
      'success': success,
      'user': req.body
    });
  });
};

UserController.deleteUser = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
      if (err) {
        success = false;
      }
      resolve(user);
    });
  });

  promise.then(function (blogPost) {
    res.json({
      'success': success,
      'blogPost': blogPost
    });
  });
};

module.exports = UserController;
