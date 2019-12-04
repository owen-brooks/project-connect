var Fuse = require("fuse.js");

function match(userProfile, listProjects) {
  var projects = [];

  for (var i = 0; i < listProjects.length; i++) {
    projects.push({
      index: i,
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
  const fuse = new Fuse(projects, options); // "list" is the item array
  const results = fuse.search(userProfile);
  console.log(results);
}

module.exports = match;
