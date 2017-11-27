const mongoose   = require('mongoose');

const userSchema = require('./user');
const transactionSchema = require('./transactions'); 

// Account Schema
const accountSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  type: {
    // e.g. Checking/saving
    type: String,
    required: true
  },
  balance: {
    type: Number,
    "default": 0,
    required: true
  },
  createdOn: {
    // Date opened
    type: Date,
    "default": Date.now
  },
  transactions: [transactionSchema]
});

mongoose.model('Account', accountSchema);