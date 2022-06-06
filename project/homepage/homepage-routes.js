/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

/* Import functions that will be used under these routes */
const renderAllDegreeName = require('./degree-name-controller');
const renderAllCourses = require('./course-name-controller');

/* Specifiy what function will be used after accessing a route with a http request */
router.route('/').get(renderAllDegreeName);
router.route('/course-overview').get(renderAllCourses);

/* Export router to be used by app.js */
module.exports = router;