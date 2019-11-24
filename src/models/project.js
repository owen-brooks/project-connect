/**
 * Module: project
 * Functions that use project table
 */
'use strict'

var db = require("../db");
var EventEmitter = require('events').EventEmitter;

class Project extends EventEmitter{
    constructor(){
      super();
    }
    get(projectId) {
        // for simplicity, profiles are fetched by profileID
        var qryStr = "SELECT * FROM project WHERE projectID = "+projectId+";";
        console.log(qryStr);
        var self = this;
        db.query(qryStr,function(err,rows,fields){
          if (err)
            console.log('Error during query processing');
          else{
            console.log('got project!');
            self.emit('success',rows);
          }
        });
    };
    add(id,title,owner,desc,dateCreated,lastUpdated,skills){
      var qryStr = 'INSERT INTO project (projectID,title,owner,description,dateCreated,lastUpdated,skillsNeeded)'+
        ' VALUES('+id+',"'+title+'",'+owner+',"'+desc+'","'+dateCreated+'","'+lastUpdated+'","'+skills+'")';
      console.log(qryStr);
      var self = this;
      db.query(qryStr,function(err,rows,fields){
        if (err)
          console.log('Error during query processing');
        else{
          console.log('added project!');
          self.emit('success','added');
        }
      });
    };
}  
exports.Project = Project;