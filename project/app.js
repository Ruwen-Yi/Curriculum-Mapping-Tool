/* Import express framework */
const express = require('express');
const app = express();

/* Import Mysql */

/* Import routes for showing degree name */
const degreeName = require('./homepage-degree-name/degree-name-routes');
/* Import routes for showing degree structure */
const degreeStructure = require('./degree-structure/degree-structure-routes');


/* Set up parent routes for degreeName */
app.use('/', degreeName);

/* Set up parent routes for degree structure */
app.use('/degree-structure', degreeStructure);

/* Set up a server */
app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
});