/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

/* Import functions that will be used under these routes */
const renderAllDegreeName = require('./degree-name-controller');

/* Specifiy what function will be used after accessing a route with a http request */
router.route('/').get(renderAllDegreeName);

/* Export router to be used by app.js */
module.exports = router;