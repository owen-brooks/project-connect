var express = require("express"),
  router = express.Router(),
  Profile = require("../models/profile"),
  Project = require("../models/project"),
  Connect = require("../models/connect"),
  auth = require("../middleware/auth");

router.get("/", auth, function(req, res) {
  res.write("You have reached the api");
  res.end();
});

// router.get("/:id", function(req, res) {
//   Comment.get(req.params.id, function(err, comment) {
//     res.render("comments/comment", { comment: comment });
//   });
// });

module.exports = router;
