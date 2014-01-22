var express = require('express');
var app = express();

var db = require('./model/db'),
    $ = require('jquery'),
    cons = require('consolidate'),
    hb = require('handlebars'),
    main = require('./controllers/main'),
    querystring = require('querystring');

var main = require('./controllers/main');

app.listen(1999);
app.engine('html', cons.handlebars);
app.set('view engine', 'html')
app.set('views', __dirname + '/public');
app.use('/public', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/assets'));


app.get('/', function(req, res){
  res.render('index');
})