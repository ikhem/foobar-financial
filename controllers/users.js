const passport = require('passport');
const mongoose = require('mongoose');
const User     = mongoose.model('User');

// Response helper function
const sendJSONresponse = (res, status, content) => {
  res.status(status).json(content);
}

module.exports = {
  getUser: (req, res) => {
    // Return authenticated user
    if(!req.body.username || !req.body.password) {
      sendJSONresponse(res, 400, { "msg":"All fields required"});
      return;
    }

    passport.authenticate('local', (err, user, info) => {
      let token;

      if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }

      if (user) {
        token = user.generateJwt();
        sendJSONresponse(res, 200, { "token" : token});
      } else {
        sendJSONresponse(res, 401, info);
      }
    }) (req, res);
  },
  createUser: (req, res) => {
    // Create a user in the database with encrypted password
    // Validate all fields are present
    if(!req.body.username || !req.body.password) {
      sendJSONresponse(res, 400, { "msg":"All fields required"});
      return;
    }

    // Create new user instance and pull name and email from body and set password
    let user       = new User();

    user.username  = req.body.username;
    user.name      = req.body.name;
    user.setPassword(req.body.password);

    // Save the user instance to the database
    user.save((err) => {
      let token;

      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        token = user.generateJwt();
        sendJSONresponse(res, 200, {"token":token});
      }
    });
  },
  updateUser: (req, res) => {
    // Be able to update Profile information
    
    sendJSONresponse(res, 200, {'msg':'user info updated'});
  }
}