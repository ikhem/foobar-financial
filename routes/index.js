var express     = require('express');
var router      = express.Router();
var jwt         = require('express-jwt');
var auth        = jwt({ secret: process.env.JWT_SECRET, userProperty: 'payload'});
var ctrlUser    = require('../controllers/users');
var ctrlAccount = require('../controllers/accounts');

// Creating and logging in a user
router.post('/login', ctrlUser.getUser);
router.post('/register', ctrlUser.createUser);

router.put('/user/:userid', auth, ctrlUser.updateUser);

// Authenticated accounts route
router.get('/account/:userid/balance', auth, ctrlAccount.getBalance);
router.get('/account/:userid/transactions', auth, ctrlAccount.getTransactions);
router.post('/account/:userid/', auth, ctrlAccount.createAccount);
router.delete('/account/:userid/remove', auth, ctrlAccount.deleteAccount);
router.post('/account/:userid/transactions', auth, ctrlAccount.createTransactions);
router.post('/account/:userid/transfer', auth, ctrlAccount.createTransfer);

module.exports = router;
