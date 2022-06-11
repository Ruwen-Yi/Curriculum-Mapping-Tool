/* Import express framework */
const express = require('express');
const app = express();


const mysql = require('mysql');
const bodyParser = require("body-parser");
const database = require('mime-db');
const path = require('path')


app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public/`));
app.use('/public', express.static(path.resolve(__dirname+'/public/')))
// app.use(bodyParser.urlencoded({
//   extended: true
// }));


/* Used for sending the Json Data to Node API   */
app.use(express.json());
app.use(express.urlencoded({extended: true}))

/* Connection String to Database */
var mysqlConnection = mysql.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    port: '3306'
});

/* To check whether the connection is succeed for Failed while running the project in console. */  
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Db Connection Succeed");
    } else {
        console.log("Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2));
    }
});
/* Use adelaide database */
mysqlConnection.query(`USE adelaide;`);

/* Export database */
module.exports = mysqlConnection;



/* Import routes for showing degree name */
const homepage = require('./homepage/homepage-routes');
/* Import routes for showing degree structure */
const degreeStructure = require('./degree-structure/degree-structure-routes');
/* Import routes for searching functionality */
const courseSearching = require('./search/search-course-route');
/* Import routes for course relationship */
const courseRelationship = require('./course-relationship/course-relationship-route');
/* Import routes for form control */
const formControl = require('./form/form-router');

/* Set up parent routes for degree structure */
app.use('/', homepage);
app.use('/degree-structure', degreeStructure);
app.use('/search', courseSearching);
app.use('/course-relationships', courseRelationship)
app.use('/form', formControl);


/* Build for test, checking if expected data can be sent to a blank page */
const text = require('./homepage/test');
app.get('/test', text) /* Route for testing */
/* End of test */

app.use('*', (req,res)=>{
    res.render('../views/error.ejs');
})
/* Set up server */
app.listen(9000, ()=>{
    console.log('Server is listening on port 9000...');
});
