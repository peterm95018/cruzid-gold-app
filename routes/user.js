var express = require('express');
var router = express.Router();
var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;

/**
 * Define configuration for Passport SAML
 */

passport.use(new SamlStrategy({
  path: '/login/callback',
  entryPoint: 'https://login.ucsc.edu/idp/shibboleth',
  issuer: 'https://nodejs-crm.ucsc.edu/shibboleth'
  },
  function(profile, done) {
    findByEmail(profile.email, function(err, user) {
      if(err) {
        return done(err);
      }
      return done(null, user);
    });
  })
);


/* Home Page */
router.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index', {
      user: req.user
    });
  } else {
    res.render('index', {
      user: null
    });
  }
});

/* route to path spec'd in passport.use */
router.post('/login/callback',
  passport.authenticate('saml', { 
    failureRedirect: '/users/login', 
    failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

/* authenticate the user */
router.get('/login',
  passport.authenticate('saml', { 
    failureRedirect: '/login', 
    failureFlash: true }),
  function(req, res) {
  	/* we're authenticated */
    res.redirect('/map');
  }
);

/* authenticated Profile page outputs attributes */
router.get('/profile', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/');
  }
});

/* logout */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;
