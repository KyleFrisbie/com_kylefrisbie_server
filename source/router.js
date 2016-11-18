module.exports = function (app) {
    app.get('/posts', function (req, res) {
        res.send('hello world');
    });
};