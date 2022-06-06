/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

const {renderCourseRelationship} = require('./course-relationship-controller')
const {getRelationship} = require('./course-relationship-controller');

router.route('/:course_name').get(renderCourseRelationship);
router.route('/:course_name/getRelationship').get(getRelationship);

module.exports = router;