/**
 * Module: db
 * Set-up mysql db connection
 */
var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "projectConnect"
});

connection.connect(function(err) {
  if (err) throw err;
});

exports.query = function(queryStr, params) {
  connection.query(queryStr, params, function(err, rows, fields) {
    if (err) {
      console.log("DB query error:" + err);
    }
    return [rows, fields, err];
  });
};

module.exports = connection;
