/**
 * Module: app
 * Entry point to launch express server
 */

var express = require("express"),
  app = express();

app.use(express.static(__dirname + "/views"));
// app.use(require("./middlewares/profiles"));
app.use(require("./controllers"));

app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
