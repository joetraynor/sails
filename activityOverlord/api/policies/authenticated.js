//
//  Allow any authenticated users
//
module.exports = function (req, res, ok) {

  //user is allowed, proceed to controller
  if (req.session.authenticated) {
    return ok();
  }

  //user is not allowed
  else {
    var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}]
    req.session.flash = {
      err: requireLoginError
    }
    res.redirect('/session/new');
    return;
  }
};
