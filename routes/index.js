var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'CruzID Gold App' });
});



// router.get('/map', ensureAuthenticated, function(req, res, next) {
//   res.render('map', { title: 'Map' });
// });

router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Map' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}


module.exports = router;
