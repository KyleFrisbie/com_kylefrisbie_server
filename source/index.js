const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./router');

const app = express();
const dbConfig = config.get('server.dbConfig');

mongoose.connect('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.name);
app.use(bodyParser.json({'type': '*/*'}));
router(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

module.exports = server;
