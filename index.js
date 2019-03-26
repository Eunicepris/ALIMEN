const express = require('express')
const app = express()
const path = require ('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var connection = require("../ALIMEN-master/data/database")


app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded  ({extended :true}))
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'VIEW'));
app.set('view engine', 'ejs')

app.use((err,req,res,next ) => {
    
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
 })

  
  app.get('/', function(req, res) {
    res.render("index");
  });
  app.get('/form', function(req, res) {
    res.render("form");
  });
  
  app.get('/joni', function(req, res) {
    res.render("joni");
  });
  app.get('/mail', function(req, res) {
    res.render("mail");
  });
  app.post('/', function(req, res, next) {
    res.render("index");
    console.log(req.body)
  });
  app.get('/password', function(req, res) {
    res.render("password");
  });
 
  app.get('/ahiline', function(req, res) {
    res.render("ahiline");
  });
  app.get('/line', function(req, res) {
    res.render("line");
  });
app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
})