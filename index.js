var express = require('express');
var htpp =  require('http');
var session = require('express-session');
var cookieParser =  require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var creatError = ('http-errors');
var path = require ('path');
var expressValidator = require ('express-validator');
var mysql = require('mysql');
var app = express();
var passport = ('passport');
var flash =  require('connect-flash');
var connection = require("./data/database");
// require('./data/passport')(passport);



var expressFlash = require('express-flash');



// // var session = require('session');


var { check } = require('express-validator/check');
// var { sanitizeBody } = require('express-validator/filter')

// var myconnection = require('express-myconnection')


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded  ({extended :true}));


app.use(session({
secret: 'ghdyudodgsgfyuej5968',
resave: true,
saveUninitialized: true
}));


app.use(expressFlash());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'VIEW'));
app.set('view engine', 'ejs');


// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
app.use(expressValidator());


// app.use(expressFlash())

  
  app.get('/alimant', function(req, res) {
    res.render("line");
  });

  app.get('/form', function(req, res) {
    res.render("form");
  });
  /*connexion*/

  app.get('/alimant/connexion/mail', function(req, res) {
    res.render("mail", {message:req.flash('mailMessage')});
  });
 

  app.get('/alimant/inscription', function(req, res) {
    res.render("inscription");
  });

  app.post('/alimant/inscription', function(err, req, res, next){
    connection.query('INSERT INTO utilisateurs(name, email, password, lastname, phone, passwordconfirm) VALUES(?, ?, ?, ?, ?, ?)', 
    [req.body.name, req.body.email, req.body.password, req.body.lastname, req.body.phone, req.body.passwordconfirm], function(err, result, next){
         console.log(req.body)
      if(err){
           console.log(err.message)
         }
         else
         {
           res.redirect('/alimant/connexion/ahiline')
         }
    })
      
    
    check('name').notEmpty().isLength({ min:2 }),
      check('email').notEmpty().isEmail(),
    check('password').notEmpty().isLength({ min: 5 }),

    
    check('lastname').notEmpty().isLength({ min:2 }),
    check('phone').notEmpty().isLength({ min:8,max:8 }),
    check("password", "invalid password").notEmpty().isLength({ min: 5 }).custom((value,{req, loc, path}) => {
        if (value !== req.body.passwordconfirm) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
    
  });
  

 
  app.get('/alimant/connexion/ahiline', function(req, res) {
    res.render("ahiline");
  });




//route des recettes//

app.use((err,req,res,next ) => {
  console.log.err
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

res.status(err.status || 500);
})

app.listen(3000, function(){
  console.log('Example app listening on port 3000 !');
})