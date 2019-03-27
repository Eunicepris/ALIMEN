const express = require('express')
const app = express()
const path = require ('path')
const expressFlash = require('express-flash')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const { check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const expressValidator = require ('express-validator')
var connection = require("./data/database")



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

    
     
    
    traitementForm(function(req, res, next)
    {
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

  });

  // route des utilisateurs //
  app.get('/alimant/connexion/password', function(req, res) {
    res.render("password"); 
  });
   app.post('/alimant/connexion/password', function (req, res) {
     connection.query('SELECT utilisateurs(password) VALUES(?)', [req.body.password], function(err, result){
       if(err){
         console.log(err.message)
       }
       else res.redirect('/alimant/connexion/password/ahiline')
     })
   })

  app.get('/alimant/connexion/mail', function(req, res) {
    res.render("mail");
  });
  app.post('/alimant/connexion/mail', function (req, res) {
    connection.query('INSERT INTO utilisateurs(email) VALUES(?)', [req.body.email], function(err, result){
      if(err){
        console.log(err.message)
      }
      else res.redirect('/alimant/connexion/mail')
    })
  })

  app.get('/alimant/inscription', function(req, res) {
    res.render("inscription");
  });

  app.post('/alimant/inscription', function(req, res){
    connection.query('INSERT INTO utilisateurs(name, email, password, lastname, phone, passwordconfirm) VALUES(?, ?, ?, ?, ?, ?)', 
    [req.body.name, req.body.email, req.body.password, req.body.lastname, req.body.phone, req.body.passwordconfirm], function(err, result){
         if(err){
           console.log(err.message)
         }
         else
         {
           res.redirect('/alimant/connexion/mail')
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