/* Import Express framework */
const express = require('express');

/* Import router module */
const router = express.Router();

/* Import functions that will be used under these routes */
const add_course = require('./add-course-controller');
const edit_course = require('./edit-course-controller');
const add_new_course = require('./add-new-course-controller');
const add_new_degree = require('./add-new-degree-controller');
const delete_degree = require('./delete-degree-controller');
const delete_stream = require('./delete-stream-controller');


/* Specifiy what function will be used after accessing a route with a http request */
router.route('/add-course').post(add_course);
router.route('/edit-course').post(edit_course);
router.route('/add-new-course').post(add_new_course);
router.route('/add-new-degree').post(add_new_degree);
router.route('/delete-degree').post(delete_degree);
router.route('/delete-stream').post(delete_stream);

/* Export router to be used by app.js */
module.exports = router;