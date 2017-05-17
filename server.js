"use strict";
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    router = express.Router(),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Would normally copy necessary scripts into src folder (via grunt/gulp) but serving
//node_modules directly to keep everything as simple as possible
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//The src folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/src'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

// redirect all others to the index (HTML5 history)
app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

app.use("/", router);
router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

app.use("*", function (req, res) {
    res.sendFile(__dirname + "/src/404.html");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//Open browser
// var opn = require('opn');

// opn('http://localhost:3000').then(() => {
//     console.log('Browser closed.');
// });