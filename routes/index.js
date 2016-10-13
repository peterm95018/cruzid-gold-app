var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Get Authenticated Pages Profile, Map */
router.get('/profile', ensureAuthenticated, function(req, res, next) {
	res.locals.testUser = req.session.passport.user;
  res.render('profile', { title: 'Profile' });
});

router.get('/map', ensureAuthenticated, function(req, res, next) {
  res.render('map', { title: 'map' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}


module.exports = router;
