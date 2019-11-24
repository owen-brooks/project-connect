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
router.get("/getProfile", (req, res) => {
  Profile.once('success',function(json){
    console.log(json);
    res.json(json);
    res.end();
  });
  Profile.get(req.query.profileId);
});

router.post("/addProfile", (req,res) => {
  console.log('api:');
  console.log(req.body);
  var profileId = req.body.profileId,
      fname = req.body.fname,
      lname = req.body.lname,
      uname = req.body.uname,
      passwd = req.body.passwd,
      desc = req.body.desc,
      skills = req.body.skills;

  Profile.once('success',function(msg){
    res.write(msg);
    res.end();
  });
  Profile.add(profileId,fname,lname,uname,passwd,desc,skills);
});

/******************************* 
    Project related requests   *
 *******************************/
router.get("/getProject", (req, res) => {
  Project.once('success',function(json){
    console.log(json);
    res.json(json);
    res.end();
  });
  Project.get(req.query.projectId);
});

router.post("/addProject", (req,res) => {
  console.log(req.body);
  var projectId = req.body.projectId,
      title = req.body.title,
      owner = req.body.owner,
      desc = req.body.desc,
      dateCreated = new Date().toISOString().slice(0,10);
      lastUpdated = new Date().toISOString().slice(0,10);
      skills = req.body.skillsNeeded;

  Project.once('success',function(msg){
    res.write(msg);
    res.end();
  });
  Project.add(projectId,title,owner,desc,dateCreated,lastUpdated,skills);
});


module.exports = router;
