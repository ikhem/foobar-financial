const mongoose = require('mongoose');
const user     = mongoose.model('User');
require('../models/accounts');

// Bring in Account model
require('../models/accounts');
const Account = mongoose.model('Account');

// Response helper function
const sendJSONresponse = (res, status, content) => {
  res.status(status).json(content);
}

let verifyUser = (req, res, cb) => {
  if(req.payload && req.payload.username) {
    User.findOne({ username: req.payload.username })
        .exec((err, user) => {
          if(!user) {
            sendJSONresponse(res, 404, {"msg":"User not found"});
            return;
          } else if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return
          }
          cb(req, res, user.username);
        });
  } else {
    sendJSONresponse(res, 404, {"msg":"User not found"});
    return;
  }
};

module.exports = {
  getBalance: (req, res) => {
    // View numberical account balance

    sendJSONresponse(res, 200, {'msg': 'balance'});
  },
  getTransactions: (req, res) => {
    // List all transactions for an account
    sendJSONresponse(res, 200, {'msg':'transactions'});
  },
  createAccount: (req, res) => {
    // Open a new account
    verifyUser(req, res, (req, res, username) => {
      // Create the new account 
      sendJSONresponse(res, 200, {'msg':'account'});
    })
  },
  deleteAccount: (req, res) => {
    // Verify account blance is zero before removing
    sendJSONresponse(res, 200, {'msg': 'removed'});
  },
  createTransactions: (req, res) => {
    // Create a transaction that represents a credit(+) or debit(-) on an account
    sendJSONresponse(res, 200, {'msg': 'transaction created'});
  },
  createTransfer: (req, res) => {
    // Type of transaction
    // Able to transfer money from an account to antoher user's account
    // Able to transfer money between own account
    sendJSONresponse(res, 200, {'msg': 'transfer initiated'});
  }
}