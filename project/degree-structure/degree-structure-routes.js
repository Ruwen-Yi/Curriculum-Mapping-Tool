/* Import Express framework */
const express = require('express');

/* Import functions that will be used under these routes */
const renderDegreeStructure = require('./degree-structure-controller');

/* Import router module */
const router = express.Router();

/* Specifiy what function will be used after accessing a route with a http request */
// router.route('/:degreeID').get(getCoreCourses);
// router.route('/:degreeID').get(getElectiveCourses);
router.route('/:degreeID').get(renderDegreeStructure);

/* Export router to be used by app.js */
module.exports = router;