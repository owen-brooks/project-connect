module.exports = function(req, res, next) {
  //   if (req.user) {
  //     next();
  //   } else {
  //     res.status(401).end();
  //   }
  console.log("Requires auth");
  next();
};
