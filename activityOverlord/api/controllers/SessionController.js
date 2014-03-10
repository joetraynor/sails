/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

  var bcrypt = require('bcrypt');

module.exports = {

  'new': function(req, res) {

    res.view('session/new');
  },

  create: function(req, res, next) {

    //check for email and passsword in params sent via the form, if none
    //redirect the browser back to the sign-in form
    if (!req.param('email') || !req.param('password')) {
      //return next({err: ["Password doesn't match the confirmation"]});

      var usernamePasswordRequiredError = [{name: 'usernamePasswordRequiredError', message: 'You must enter both a username and password'}]

      //remember that err is the object being passed down (aka the flash error), whose value is
      //another object with the key of usernamePasswordRequiredError
        req.session.flash = {
          err: usernamePasswordRequiredError
      }

      res.redirect('/session/new');
      return;
    }

    //testetsest
    //try to find the user by their email address
    User.findOneByEmail(req.param('email'), function foundUser (err, user) {
      if (err) return next(err);

      //if no user is found
      if (!user) {
        var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' not found.'}]
        req.session.flash = {
          err: noAccountError
        }
        res.redirect('/session/new');
        return;
      }

      //compare password from the form params to the encrypted password of the user found
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        //if the password from the form doesnt match the password from the database
        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatchError', message: 'Invalid username and password combination'}]
          req.session.flash = {
            err: usernamePasswordMismatchError
        }
        res.redirect('/session/new');
        return;
      }

      //log in user
        req.session.authenticated = true;
        req.session.User = user;

        //redirect the user to theur profile page (eg. /views/user/show.ejs)
        res.redirect('/user/show/' + user.id);
      });
    });
  },

  destroy: function(req, res, next) {

    //wipe out the session
    req.session.destroy();

    //redirect the browser to sign in screen
    res.redirect('/session/new');
  }

};
