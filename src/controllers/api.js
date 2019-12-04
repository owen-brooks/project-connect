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
  auth = require("../middleware/auth");

router.use(bodyParser.urlencoded({extended:false})); 
router.use(bodyParser.json());

router.get("/", auth, function(req, res) {
  res.write("You have reached the api");
  res.end();
});

/******************************* 
    Profile related requests   *
 *******************************/
// Get a specific profile
router.get("/profile", (req, res) => {
  Profile.once('success',function(json){
    console.log(json);
    res.json(json);
    res.end();
  });
  Profile.get(req.query.profileID);
});

// Create a specific profile
router.post("/profile", (req,res) => {
  console.log('api:');
  console.log(req.body);
  var profile = req.body;
  Profile.once('success',function(msg){
    res.write(msg);
    res.end();
  });
  Profile.add(profile);
});

// Log in to profile
router.post("/login", function (req, res) {
    console.log("Reached login api");
    Profile.once('loggedin', function (msg) {
        if (msg == 1) {
            return res.redirect('/index.html')
        }
        else {
            console.log('Log in Failed')
            return res.redirect('/signin.html')
        }
    });
    Profile.login(req.body.username, req.body.password)
});

/******************************* 
    Project related requests   *
 *******************************/
// Get a specific project
router.get("/project", (req, res) => {
  Project.once('success',function(json){
    console.log(json);
    res.json(json);
    res.end();
  });
  Project.get(req.query.projectID);
});

// Create a new project
router.post("/project", (req,res) => {
    var project = req.body
    var currentDate = new Date().toISOString();
    // add current date and time to the project
    // sliceing puts the date in the format yyyy-mm-dd hh:mm:ss
    project.dateCreated = currentDate.slice(0,10)+' '+currentDate.slice(11,19);
    project.lastUpdated = currentDate.slice(0,10)+' '+currentDate.slice(11,19);

    Project.once('success',function(msg){
    res.write(msg);
    res.end();
  });
  Project.add(project);
});

/******************************* 
    Connect related requests   *
 *******************************/
// Get a connects for project
router.get("/connect", (req, res) => {
  Project.once("success", function(json) {
    console.log(json);
    res.json(json);
    res.end();
  });
  Connect.get(req.query.projectID);
});

router.post("/connect", (req, res) => {
  var connect = req.body;
  Connect.once("success", function(msg) {
    res.write(msg);
    res.end();
  });
  Connect.add(connect);
});

module.exports = router;
