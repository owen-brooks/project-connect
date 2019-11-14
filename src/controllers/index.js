/**
 * Module: index
 * Functions to serve views
 */

var express = require("express"),
  router = express.Router();

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

module.exports = router;
