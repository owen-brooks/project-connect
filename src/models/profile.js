/**
 * Module: profile
 * Functions that use profile table
 */
'use strict'
var db = require("../db");
var EventEmitter = require('events').EventEmitter;

/**
 * @param  {String} user
 * @param  {String} pass
 * @return {Boolean}
 */

class Profile extends EventEmitter{
  constructor(){
    super();
  }
  
  login(user, pass) {
    var [
      rows,
      fields,
      err
    ] = db.query("SELECT * FROM `profile` WHERE `user` = ? AND `pass` = ?", [
      user,
      pass
    ]);
  };

  get(profileId) {
    // for simplicity, profiles are fetched by profileID
    var qryStr = 'SELECT * FROM PROFILE WHERE profileID = '+profileId;
    var self = this;
    db.query(qryStr,function(err,rows,fields){
      if (err)
        console.log('Error during query processing');
      else{
        console.log('got profile!');
        self.emit('success',rows);
      }
    });
  };

  update(id, profile) {};

  add(id,fname,lname,uname,passwd,desc,skills){
    var qryStr = 'INSERT INTO profile (profileID,first,last,username,password,description,skills)'+
      ' VALUES('+id+',"'+fname+'","'+lname+'","'+uname+'","'+passwd+'","'+desc+'","'+skills+'")';
    console.log(qryStr);
    var self = this;
    db.query(qryStr,function(err,rows,fields){
      if (err)
        console.log('Error during query processing');
      else{
        console.log('added profile!');
        self.emit('success','added');
      }
    });
  };
}
exports.Profile = Profile;
