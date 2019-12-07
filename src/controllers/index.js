/**
 * Module: index
 * Functions to serve views
 */
var express = require("express"),
  router = express.Router(),
  render = require("../middleware/render.js"),
  ProfileModule = require("../models/profile"),
  Profile = new ProfileModule.Profile(),
  ProjectModule = require("../models/project"),
  Project = new ProjectModule.Project(),
  ConnectModule = require("../models/connect"),
  match = require("../utils/match"),
  auth = require("../middleware/auth");

// route all api requests to ./api.js
router.use("/api", require("./api"));

router.get("/", function(req, res) {
  console.log("test");
  // Comments.all(function (err, comments) {
  //   res.render('index', { comments: comments })
  // })
  res.write("home");
  res.end();
});

/******************************* 
    Project related requests   *
 *******************************/
router.get("/project",function(req,res){
  console.log('fetching profile');
  // get data
  Project.once("success", function(json){
    // make page
    console.log(json);
    render.view('project',json[0],res);
  });
  Project.get(req.query.projectID);
});

router.get("/search",function(req,res){
  console.log('fetching projects...');
  Project.once("success", function(json){
    // make page
    console.log(json);
    render.view('projectSearch',json,res);
  });
  Project.search(req.query.title,req.query.skills);
});

router.get("/newproject",function(req,res){
  render.view('newproject',"",res);
});

/******************************* 
    Profile related requests   *
 *******************************/
router.get("/profile",function(req,res){
  console.log('fetching profile');
  Profile.once("success", function(json){
    console.log(json);
    render.view('profile',json[0],res);
  });
  Profile.get(req.query.username);
});
module.exports = router;

/******************************* 
        Connect requests       *
 *******************************/
router.get("/connect",function(req,res){
  console.log('fetching projects...');
  Project.once("success", function(json){
    // make page
    console.log(json);
    render.view('project',json[0],res);
  });
  Project.get(req.query.projectID);
});
