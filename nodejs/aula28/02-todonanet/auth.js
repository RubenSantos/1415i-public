var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');

passport.use(new LocalStrategy(function(username, password, done){
    db.User.getById(username, function(err, user) {
      if(err) return done(err);
      // TODO: Check password
      if(user == null) return done(null, false);

      console.log("INFO: user", user.id, "has logged in.", user);
      return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser");
  db.User.getById(id, function(err, user)
  {
    if(err) return done(err);

    user.isAuthenticated = true;
    user.roles.push("Editor"); // TODO, FIXME

    return done(null, user);
  });
});


module.exports = function(app)
{
    app.use(function(req, res, next) {
      res.locals.user = req.user || new db.User();
      console.log(req.user);
      next();
    });


    app.get('/login', function (req, res) {
        return res.render('auth/login');
    });

    app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                              failureRedirect: '/login',
                                              failureFlash: true }));

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });
}