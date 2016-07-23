// server.js
// load the things we need
var express = require('express');
var app = express();
var rezepte = require("../gemeinsame-dateien/rezepte");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static("public/"));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index', { rezepte : rezepte.Rezepte });
});


app.listen(8080);
console.log('8080 is the magic port');