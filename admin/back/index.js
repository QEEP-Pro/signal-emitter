const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');
const Data = require('./data/data.js');

const data = new Data(config.db);

const emulatorPath = config.emulatorPath;

const app = express();

app.use(function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.append('Access-Control-Allow-Methods', '*');
    res.append('Access-Control-Request-Headers', '*');
    next();
});

app.use(bodyParser.json());

app.get('/parameters', function (req, res) {
    data.getAllData().then(function(result) {
        res.json(result);
    });
});

app.post('/parameters', function (req, res) {
    const parameter = Object.assign({law_id: req.body.law.id}, req.body)
    delete parameter['law']

    data.addData(parameter).then(function(result) {
        res.json(result);
    });
});

app.put('/parameters', function (req, res) {
    data.changeData(req.body.id, req.body).then(function(result) {
        res.json(result);
    });
});

app.delete('/parameters', function (req, res) {
    data.deleteData(req.query.id).then(function(result) {
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

app.listen(config.port, function () {
    console.log("Running on port: " + config.port)
});
