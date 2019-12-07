 /**
 * Module: auth
 * Middleware for authentication
 */

var EventEmitter = require("events").EventEmitter;

class Auth extends EventEmitter {
  constructor() {
    super();
  }
  
  isAuthenticated (userid) {
	if (userid) {
		console.log("Logged in");
		this.emit("success", true);
    } else {
		console.log("Not logged in");
		this.emit("success", false);
    } 
    console.log("");
  };
}
 
exports.Auth = Auth;
