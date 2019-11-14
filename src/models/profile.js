/**
 * Module: profile
 * Functions that use profile table
 */
var db = require("../db");

/**
 * @param  {String} user
 * @param  {String} pass
 * @return {Boolean}
 */
exports.login = function(user, pass) {
  var [
    rows,
    fields,
    err
  ] = db.query("SELECT * FROM `profile` WHERE `user` = ? AND `pass` = ?", [
    user,
    pass
  ]);
};

exports.get = function(id, connection) {};

exports.update = function(id, profile) {};

exports.new = function(profile) {};
