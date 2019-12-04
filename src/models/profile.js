/**
 * Module: profile
 * Functions that use profile table
 */
"use strict";
var db = require("../db");
var EventEmitter = require("events").EventEmitter;

/**
 * @param  {String} user
 * @param  {String} pass
 * @return {Boolean}
 */

class Profile extends EventEmitter {
  constructor() {
    super();
  }
  
  login(username, password) {
    /**
     * Purpose:
     *      Checks if username and password exist in profile table to allow for signing in.
     *      
     * Parameters:
     *      user: Username entered at login
     *      pass: Password entered at login
     */
    console.log("testing");
    var qryStr = 'SELECT * FROM PROFILE WHERE username = "' + username + '" AND password = "' + password +'";';
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function (err, rows, fields) {
        if (err)
            console.log('Error during query processing');
        else {
            self.emit('loggedin')
            if (rows > 0) {
                console.log('logged in');
                self.emit(1)
            }
            else {
                console.log('user does not exist');
                self.emit(0)
            }
        }
    });
  };

  get(profileID) {
    /**
     * Purpose:
     *    Fetches and returns a user's profile in JSON using the profileID.
     *
     * Parameters:
     *    profileID: unique identifier for the profile
     */
    var qryStr = "SELECT * FROM PROFILE WHERE profileID = " + profileID;
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("got profile!");
        self.emit("success", rows);
      }
    });
  }

  update(profile) {}

  add(profile) {
    /**
     * Purpose:
     *    Adds a Profile to the profile SQL table.
     *
     * Parameters:
     *    profile
     *      .profileID: unique identifier for the profile
     *      .first: first name for the profile
     *      .last: last namde for the profile
     *      .username: username for the profile
     *      .password: password for the profile
     *      .description: profile description (like a bio?)
     *      .skills: skill sets for the profile
     */
    var qryStr =
      "INSERT INTO profile (profileID,first,last,username,password,description,skills)" +
      " VALUES(" +
      profile.profileID +
      ',"' +
      profile.first +
      '","' +
      profile.last +
      '","' +
      profile.username +
      '","' +
      profile.password +
      '","' +
      profile.description +
      '","' +
      profile.skills +
      '")';
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("added profile!");
        self.emit("success", "added");
      }
    });
  }
}
exports.Profile = Profile;
