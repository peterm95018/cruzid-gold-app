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


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* route to path spec'd in passport.use */
router.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

/* authenticate */
router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
  	/* we're authenticated */
    res.redirect('/map');
  }
);


module.exports = router;
