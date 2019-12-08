/**
 * Module: match
 * Functions for matching user profile and projects
 */
var Fuse = require("fuse.js");

function match(userProfile, listProjects) {
  var projects = []; // build objects for fuzzy search
  for (var i = 0; i < listProjects.length; i++) {
    projects.push({
      index: i,
      title: listProjects[i].title,
      projectID: listProjects[i].projectID,
      description: listProjects[i].description,
      skillsNeeded: listProjects[i].skillsNeeded
    });
  }
  console.log(projects);

  userProfile = userProfile[0].skills;

  var options = {
    id: "index",
    shouldSort: true,
    tokenize: true,
    includeScore: true,
    threshold: 1,
    location: 0,
    maxPatternLength: 640,
    minMatchCharLength: 3,
    keys: [
      {
        name: "description",
        weight: 0.3
      },
      {
        name: "skillsNeeded",
        weight: 0.7
      }
    ]
  };
  const fuse = new Fuse(projects, options);
  var results = fuse.search(userProfile);

  // get original rows by index
  project_rows = [];
  for (const res of results) {
    project_rows.push(listProjects[res.item]);
  }
  return project_rows;
}

module.exports = match;
