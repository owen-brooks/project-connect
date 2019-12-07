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
            if (rows.length > 0) {
                console.log('logged in');
				        self.emit('loggedin', 1)
            }
            else {
                console.log('user does not exist');
                self.emit('loggedin', 0)
            }
        }
    });
  };

  get(username) {
    /**
     * Purpose:
     *    Fetches and returns a user's profile in JSON using the profileID.
     *
     * Parameters:
     *    username: unique identifier for the profile
     */
    var qryStr = "SELECT * FROM PROFILE WHERE username = \'" + username + "\'";
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
			if (rows.length > 0) {
                console.log('got user');
				self.emit('success', rows)
            }
            else {
                console.log('user does not exist');
                self.emit('success', 0)
            }
      }
    });
  }

  update(userid, field, newvalue) {
	    /**
     * Purpose:
     *    Updates field for the given userid
     *
     * Parameters:
     *    userid: unique identifier for the profile
	 *	  field: the field to be updated
	 *    newvalue: the new value
     */
	   var qryStr = "UPDATE PROFILE SET " + field + "= '" +  newvalue + "' WHERE username = '" + userid + "'";
	   var self = this;
	   var self = this;;
	   db.query(qryStr, function(err, rows, fields) {
		  if (err) console.log(err);
		  else {
			console.log('success');
			self.emit('success', 1)

		  }
		});
	  
  }

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
    var qryStr = 'INSERT INTO profile (first,last,username,password,description,skills)'+
      ' VALUES("'+profile.first+'","'
                +profile.last+'","'
                +profile.username+'","'
                +profile.password+'","'
                +profile.description+'","'
                +profile.skills+'")';
    console.log(qryStr);
    var self = this;
    db.query(qryStr,function(err,rows,fields){
      if (err){
		  if(err.code == 'ER_DUP_ENTRY'){
			  self.emit('success',err.code);
		  }else{
			  self.emit('success',-1);
		  }
        console.log('Error during query processing');
		console.log(err);
	  }
      else{
        console.log('added profile!');
        self.emit('success','added');
      }
    });
  }
}
exports.Profile = Profile;
