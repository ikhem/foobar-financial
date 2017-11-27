const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

// Transaction schema
const transactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
  }
})

mongoose.model('Transaction', transactionSchema);