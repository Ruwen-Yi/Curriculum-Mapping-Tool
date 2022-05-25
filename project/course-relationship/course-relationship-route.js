/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

const getRelationship = require('./course-relationship-controller');
router.route('/:course_name').get(getRelationship);

module.exports = router;