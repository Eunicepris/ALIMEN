const express = require('express')
const app = express()
const path = require ('path')
app.set('views', path.join(__dirname, 'VIEW'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
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
  app.get('/password', function(req, res) {
    res.render("password");
  });
 
app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
})