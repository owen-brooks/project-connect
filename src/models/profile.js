var db = require("../db");

exports.get = function(id, connection) {
  /**
   * Reduces a sequence of names to initials.
   * @param  {Int} name  Space Delimited sequence of names.
   * @return {Array}       array of rows and fields
   */

  db.execute("SELECT * FROM `profile` WHERE `id` = ?", [id], function(
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(":project/models/profiles:: error:" + err);
      return null;
    }
    return [rows, fields];
  });
};

exports.login = function(user, pass) {
  /**
   * Reduces a sequence of names to initials.
   * @param  {String} user  username
   * @param  {String} pass  password
   * @return {Boolean}       True if user exists
   * 
   */

  db.query("SELECT * FROM `profile` WHERE `id` = ?", [id], function(
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log("ERROR project/models/profiles");
      throw err;
    }
    return [rows, fields];
  });
};

exports.update = function(id, profile) {};

exports.new = function(profile) {};
