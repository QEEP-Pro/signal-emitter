const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const Data = require('./data/data.js');

const data = new Data({
    host     : 'localhost',
    user     : 'admin',
    password : 'admin', 
    database : 'digital-hack'
});

const emulatorPath = 'http://localhost/';

const app = express();

const port = 3002;

app.use(function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());

app.get('/parameters', function (req, res) {
    data.getData().then(function(result) {
        res.json(result);
    });
});

app.post('/parameters', function (req, res) {
    data.addData(req.body).then(function(result) {
        res.json(result);
    });
});

app.put('/parameters', function (req, res) {
    data.changeData(req.query.uid, req.body).then(function(result) {
        res.json(result);
    });
});

app.delete('/parameters', function (req, res) {
    data.deleteData(req.query.uid).then(function(result) {
        res.end();
    });
});

app.get('/laws', function (req, res) {
    data.getLaws().then(function(result) {
        res.json(result);
    });
});

app.get('/refreshData', function (req, res) {
    http.get(emulatorPath + '/refreshData', function(response) {
        response.pipe(res);
    });
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});
