var Fuse = require("fuse.js");

exports.match = function(userProfile, listProjects) {
  var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
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
  const fuse = new Fuse(listProjects, options); // "list" is the item array
  return fuse.search(userProfile);
};

module.exports = utils;
