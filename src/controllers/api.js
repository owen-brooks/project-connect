/**
 * Module: api
 * Functions for api resources
 */
var bodyParser = require("body-parser"),
  express = require("express"),
  router = express.Router(),
  ProfileModule = require("../models/profile"),
  Profile = new ProfileModule.Profile(),
  ProjectModule = require("../models/project"),
  Project = new ProjectModule.Project(),
  ConnectModule = require("../models/connect"),
  Connect = new ConnectModule.Connect(),
  match = require("../utils/match"),
  AuthModule = require("../middleware/auth");
Auth = new AuthModule.Auth();

var session = require("client-sessions");
router.use(
  session({
    cookieName: "session",
    secret: "asdfasdf23423"
  })
);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.get("/", auth, function(req, res) {
//   res.write("You have reached the api");
//   res.end();
// });

/******************************* 
    Profile related requests   *
 *******************************/

// Check if authenticated
router.get("/isAuthenticated", function(req, res) {
  Auth.once("success", function(msg) {
    res.json(msg);
    res.end;
  });
  Auth.isAuthenticated(req.session.userid);
});

// Get a specific profile by session's user id
router.get("/user", (req, res) => {
  Profile.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  Profile.get(req.session.userid);
});

//update user information
router.post("/updateuser", (req, res) => {
  Profile.once("success", function(msg) {
    console.log(msg);
    res.json(msg);
    res.end();
  });
  Profile.update(req.session.userid, req.body.field, req.body.newvalue);
});

// Get a profile by profileID
router.get("/profile", (req, res) => {
  Profile.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  Profile.get(req.query.profileID);
});

// Add a profile
router.post("/profile", (req, res) => {
  console.log("api:");
  console.log(req.body);
  var profile = req.body;
  Profile.once("success", function(msg) {
    if (msg == "ER_DUP_ENTRY") {
      return res.redirect(
        "/newprofile.html?error=" + msg + "&username=" + req.body.username
      );
    } else if (msg == -1) {
      return res.redirect("/newprofile.html?error=unknown");
    } else {
      req.session.userid = req.body.username;
      return res.redirect("/index.html");
    }
    res.write(msg);
    res.end();
  });
  Profile.add(profile);
});

// Log in to profile
router.post("/login", function(req, res) {
  console.log("Reached login api");
  Profile.once("loggedin", function(msg) {
    if (msg == 1) {
      req.session.userid = req.body.username;
      return res.redirect("/index.html");
    } else {
      console.log("Log in Failed");
      return res.redirect("/signin.html");
    }
  });
  Profile.login(req.body.username, req.body.password);
});

//Log out of profiel
router.get("/logout", function(req, res) {
  req.session.reset();
  console.log("logged out");
  res.send("success");
  res.end();
});

/******************************* 
    Project related requests   *
 *******************************/
// Get a specific project
router.get("/project", (req, res) => {
  Project.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  Project.get(req.query.projectID);
});

// Search projects by title and/or skills
router.get("/search", function(req, res) {
  console.log("fetching projects...");
  Project.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  Project.search(req.query.title, req.query.skills);
});

//Get a specific users projects
router.get("/userprojects", (req, res) => {
  Project.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  console.log(req);
  Project.getbyuser(req.session.userid);
});

//update project information
router.post("/updateproject", (req, res) => {
  Project.once("success", function(msg) {
    console.log(msg);
    res.json(msg);
    res.end();
  });
  Project.update(req.body.id, req.body.field, req.body.newvalue);
});

// Create a new project
router.post("/project", (req, res) => {
  console.log(req.body);
  var project = req.body;
  var currentDate = new Date().toISOString();
  // add current date and time to the project
  // sliceing puts the date in the format yyyy-mm-dd hh:mm:ss
  project.dateCreated =
    currentDate.slice(0, 10) + " " + currentDate.slice(11, 19);
  project.lastUpdated =
    currentDate.slice(0, 10) + " " + currentDate.slice(11, 19);
  project.owner = req.session.userid;
  Project.once("success", function(msg) {
    return res.redirect("/myprojects.html");
  });
  Project.add(project);
});

/******************************* 
    Connect related requests   *
 *******************************/
// Get a connects for project
router.get("/connect", (req, res) => {
  Connect.once("success", function(json) {
    //console.log(json);
    res.json(json);
    res.end();
  });
  Connect.get(req.query.projectID);
});

// Remove connection
router.post("/remove", (req, res) => {
  var projectID = req.body.projectID;
  console.log("Here is the projectID:");
  console.log(projectID);
  Profile.once("success", function(id) {
    Connect.once("success", function(msg) {
      console.log("Removed");
    });
    Connect.remove(id, projectID);
  });
  Profile.getID(req.session.userid);
});

// Get all connects for user
router.get("/userconnections", (req, res) => {
  Connect.once("connections", function(json) {
    //console.log(json);
    res.json(json);
    res.end();
  });
  Connect.getbyuser(req.session.userid);
});

// Add connection
router.post("/connect", (req, res) => {
  var projectID = req.body.projectID;
  var connectInfo = req.body.info;
  Profile.once("success", function(id) {
    Connect.once("success", function(msg) {
      //return res.redirect('/connect.html');
      res.write(msg);
      res.end();
    });
    Connect.add(projectID, id, connectInfo);
  });
  Profile.getID(req.session.userid);
});

// Match with project
router.get("/match", (req, res) => {
  if (req.session.userid) {
    Profile.once("success", function(json) {
      // console.log(json);
      Project.once("success", function(projects) {
        var matches = match(json, projects);
        res.json(matches);
        res.end();
      });
      Project.getall();
    });
    Profile.get(req.session.userid);
  }
});

module.exports = router;
