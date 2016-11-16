/**
 * Created by kylel on 11/14/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();
var port = 3000;
var dbConfig = config.get('server.dbConfig');

mongoose.connect('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.name);


