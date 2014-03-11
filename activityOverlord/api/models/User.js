/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

  },

  beforeValidation: function (valyes, next) {
    console.log(values)
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      }
      else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

  beforeCreate: function (values, next) {
    //this checks to see if the password and password confirmation are the same before creating the password
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match the password confirmation"]});
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }

};
