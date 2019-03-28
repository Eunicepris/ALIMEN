const express = require('express');
const htpp =  require('http');

const path = require ('path');

const expressFlash = require('express-flash');

const session = require('express-session');

// const session = require('session');
const bodyParser = require('body-parser');

const { check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const expressValidator = require ('express-validator');

const flashConnect =  require('connect-flash');

// const cookiesParser =  require('cookie-parser');

const passport = ('passport');

// const creatError = ('http-error')

const mysql = require('mysql');
var connection = require("./data/database");
const app = express()


 app.use(session({
  secret: 'ghdyudodgsgfyuej5968',
  resave: true,
  saveUninitialized: true
})
 )
// app.use(passport.initialize())
// app.use(passport.session())
app.use(flashConnect())
app.use(expressFlash())
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded  ({extended :true}))
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'VIEW'));
app.set('view engine', 'ejs')

  
  app.get('/alimant', function(req, res) {
    res.render("line");
  });

  app.get('/form', function(req, res) {
    res.render("form");
  });
  
 
  app.post('/', function(req, res, next) {
    res.render("index");
    console.log(req.body)
  });
  app.get('/alimant/connexion/password', function(req, res) {
    res.render("password")
  })

  app.get('/alimant/connexion/mail', function(req, res) {
    res.render("mail")
  })

  app.get('/alimant/inscription', function(req, res) {
    res.render("inscription");
  });

  app.post('/alimant/inscription', function(err, req, res, next){
    connection.query('INSERT INTO utilisateurs(name, email, password, lastname, phone, passwordconfirm) VALUES(?, ?, ?, ?, ?, ?)', 
    [req.body.name, req.body.email, req.body.password, req.body.lastname, req.body.phone, req.body.passwordconfirm], function(err, result){
         if(err){
           console.log(err.message)
         }
         else
         {
           res.redirect('/alimant/connexion')
         }
    })

      check('email').isEmail(),
    check('password').isLength({ min: 5 }),

    check('name').isLength({ min:2 }),
    check('lastname').isLength({ min:2 }),

    check('phone').isLength({ min:8,max:8 }),

    check("password", "invalid password")
     .isLength({ min: 5 })
     .custom((value,{req, loc, path}) => {
        if (value !== req.body.passwordconfirm) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
  })
  
   
  

 
  app.get('/ahiline', function(req, res) {
    res.render("ahiline");
  });

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
})




//route des recettes//

app.use((err,req,res,next ) => {
  console.log.err
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

res.status(err.status || 500);
})