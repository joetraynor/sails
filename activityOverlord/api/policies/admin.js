/**
* Allow any authenticated user
*/
module.exports = function (req, res, ok) {

  //user is allowed, prcoeed to the controller
  if (req.session.User && req.session.User.admin) {
    return ok();
  }

  //user is not allowed
  else {
    var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin'}]
    req.session.flash = {
      err: requireAdminError
    }
    res.redirect('/session/new');
    return;
  }
};
