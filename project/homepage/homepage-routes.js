/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

/* Import functions that will be used under these routes */
const {addNewDegree} = require('./degree-overview-controller');
const {renderAllDegreeName} = require('./degree-overview-controller');
const renderAllCourses = require('./course-overview-controller');

/* Specifiy what function will be used after accessing a route with a http request */
router.route('/').get(renderAllDegreeName);
router.route('/add-new-degree').post(addNewDegree);
router.route('/course-overview').get(renderAllCourses);

/* Export router to be used by app.js */
module.exports = router;