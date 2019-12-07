/**
 * Module: project
 * Functions that use project table
 */
"use strict";

var db = require("../db");
var EventEmitter = require("events").EventEmitter;

class Project extends EventEmitter {
  constructor() {
    super();
  }
  get(projectID) {
    /**
     * Purpose:
     *    Fetches and returns a project in JSON using the projectID.
     *
     * Parameters:
     *    projectID: unique identifier for the project
     */
    var qryStr = "SELECT * FROM project WHERE projectID = " + projectID + ";";
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("got project!");
        self.emit("success", rows);
      }
    });
  }

  update(projectid, field, newvalue) {
    /**
   * Purpose:
   *    Updates field for the given projectid
   *
   * Parameters:
   *    projectid: unique identifier for the project
 *	  field: the field to be updated 
 *	  newvalue: the new value
   */
   var qryStr = "UPDATE PROJECT SET " + field + "= '" +  newvalue + "' WHERE projectID = '" + projectid + "'";
   var self = this;
   var self = this;;
   db.query(qryStr, function(err, rows, fields) {
    if (err) console.log(err);
    else {
    console.log('success');
    self.emit('success', projectid);

    }
  });
  
}

  getall() {
    /**
     * Purpose:
     *    Fetches all projects.
     */
    var qryStr = "SELECT * FROM project;";
    console.log(qryStr);
    var self = this;
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("got all projects!");
        self.emit("success", rows);
      }
    });
  }
  add(project) {
    /**
     * Purpose:
     *    Adds a Project to the project SQL table.
     *
     * Parameters:
     *    project
     *      .projectId: unique identifier for the project
     *      .title: first name for the profile
     *      .owner: profileID of the profile that owns the project
     *      .description: project description
     *      .dateCreated: current date
     *      .lastUpdated: current date
     *      .skillsNeeded: skill sets needed on the project
     */
    var self = this;
    var qryStr =
      "INSERT INTO project (projectID,title,owner,description,dateCreated,lastUpdated,skillsNeeded)" +
      " VALUES(" +
      project.projectID +
      ',"' +
      project.title +
      '",' +
      project.owner +
      ',"' +
      project.description +
      '","' +
      project.dateCreated +
      '","' +
      project.lastUpdated +
      '","' +
      project.skillsNeeded +
      '")';
    console.log(qryStr);
    db.query(qryStr, function(err, rows, fields) {
      if (err) console.log("Error during query processing");
      else {
        console.log("added project!");
        self.emit("success", "added");
      }
    });
  }
  find(skills) {}
}
exports.Project = Project;
