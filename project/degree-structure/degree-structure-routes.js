/* Import Express framework */
const express = require('express');
/* Import router module */
const router = express.Router();

/* Import functions that will be used under these routes */
const {renderDegreeStructure} = require('./degree-structure-controller');
const {getDegreeData} = require('./degree-structure-controller');
const get_degree_streams = require('./get-degree-streams-controller');

/* Specifiy what function will be used after accessing a route with a http request */
router.route('/get-degree-streams').get(get_degree_streams);
router.route('/:degreeName').get(renderDegreeStructure);
router.route('/:degreeName/getDegreeData').get(getDegreeData);

/* Export router to be used by app.js */
module.exports = router;