const express = require('express');
const router = express.Router();

const searchCourse = require('./search-course-controller');
const search_add_courses = require('./search-add-course-controller');

router.route('/search-course').get(search_add_courses);
router.route('').get(searchCourse);

module.exports = router;