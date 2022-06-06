const express = require('express');
const router = express.Router();

const searchCourse = require('./search-course-controller');

router.route('').get(searchCourse);

module.exports = router;