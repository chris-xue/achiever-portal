var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/achiever');

/* GET home page. */
router.get('/', function(req, res, next){
	res.redirect('/signup');
})
router.get('/signup', function (req, res, next) {
  res.render('signup.hbs');
});

router.post('/signup', function (req, res, next){
	var user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		sport: req.body.sport,
    });
    User.register(user, req.body.password, function(registrationError) {
      if(!registrationError) {
        req.login(user, function(loginError)
         {
          if (loginError) { return next(loginError); }
          	res.render('home.hbs', {user: user});
        });
      } else {
        res.send(registrationError);
      }
  });
});

router.get('/home', function (req, res, next){
	if (req.isAuthenticated()){
		res.render('home.hbs', {user: req.user});
	}
	else{
		res.redirect('/signup');
	}
})

router.post('/login', passport.authenticate('local', 
	{ successRedirect: '/home',
      failureRedirect: '/signup'})
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;
