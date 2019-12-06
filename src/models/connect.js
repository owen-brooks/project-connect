/**
 * Module: connect
 * Functions that use connect table
 */
"use strict";

var db = require("../db");
var EventEmitter = require("events").EventEmitter;

class Connect extends EventEmitter {
  constructor() {
    super();
  }
  get(projectID) {
    /**
     * Purpose:
     *    Fetches and returns connections in JSON using the projectID.
     */
    var qryStr = "SELECT * FROM connect WHERE projectID = " + projectID + ";";
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("got connections!");
        console.log(rows);
        self.emit("success", rows);
      }
    });
  }
  getbyuser(userid) {
    /**
     * Purpose:
     *    Fetches and returns all connections of a user.
     * 
     * Parameters:
     *    Userid: username
     */
    var qryStr = "SELECT connect.projectID, owner, title, connectInfo FROM connect INNER JOIN project ON connect.projectID=project.projectID INNER JOIN profile ON connect.profileID=profile.profileID WHERE username = '" + userid + "';";
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("got connections!");
        self.emit("connections", rows);
      }
    });
  }
  add(connect) {
    /**
     * Purpose:
     *    Adds a Connect to the connect SQL table.
     *
     */
    var self = this;
    var qryStr =
      "INSERT INTO connect (projectID,profileID,connectInfo)" +
      " VALUES(" +
      connect.projectID +
      '",' +
      connect.profileID +
      ',"' +
      connect.connectInfo +
      '")';
    console.log(qryStr);
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("added connect!");
        self.emit("success", "added");
      }
    });
  }
}
exports.Connect = Connect;
