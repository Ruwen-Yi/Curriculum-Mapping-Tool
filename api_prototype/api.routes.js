const express = require('express');
const router = express.Router(); // create a new router object to handle http req

// Import Functions from Controller
const {
    sayHi,
    sayBye,
} = require('./api.controller');

// Deal with http request by each route.
router.route('/').get(sayHi).post(sayBye);

module.exports = router;