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
  add(projectID, profileID, connectInfo) {
    /**
     * Purpose:
     *    Adds a Connect to the connect SQL table.
     *
     * Params:
     *    ProjectID, ProfileID, and connection Information
     */
    var self = this;
    var qryCheck = "SELECT * FROM connect WHERE projectID = " + projectID + " AND profileID = " + Object.values(profileID[0])[0] +";"
    var qryStr =
      "INSERT INTO connect (projectID,profileID,connectInfo)" +
      " VALUES (" +
      projectID +
      ',' +
      Object.values(profileID[0])[0] + 
      ',"' +
      connectInfo +
      '")';
    console.log(qryCheck);
    console.log(qryStr);
    db.query(qryCheck, function(err,rows,field){
      if (err) console.log("Error during query processing");
      else {
        if (rows.length > 0){
          console.log(console.log("Connect already exists"));
          self.emit("success","You are already connected to this project!");
        }
        else{
          db.query(qryStr, function(err, rows, fields) {
            if (err) console.log("Error during query processing");
            else {
              console.log("Connection has been added!");
              self.emit("success", "Connection has been added!");
            };
          });
        };
      };
    });
  };
  remove(profileID, projectID){
    /**
     * Purpose:
     *    Removes connection from mysql table
     *
     * Params:
     *    ProjectID, ProfileID, and connection Information
     */
    var qryStr = "DELETE FROM connect WHERE profileID = " + Object.values(profileID[0])[0] + " AND projectID = " + projectID + ";";
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during remove query processing");
      else {
        console.log("Connection has been removed!");
        self.emit("success", "Connection has been removed!");
      }
    });
  };
};

exports.Connect = Connect;
