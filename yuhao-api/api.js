const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser")
const database = require('mime-db');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
// Used for sending the Json Data to Node API  
app.use(express.json());
// Connection String to Database  
var mysqlConnection = mysql.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    port: '3306'
});
// To check whether the connection is succeed for Failed while running the project in console.  
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Db Connection Succeed");
    } else {
        console.log("Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2));
    }
});
//use adelaide database
mysqlConnection.query(`USE adelaide;`);
// To Run the server with Port Number  
app.listen(3000, () => console.log("Express server is running at port no : 3000"));
// CRUD Methods  
//get master information
app.get('/master', (req, res) => {

    if (req.query.degree == "all")
        q = 'SELECT majorname FROM master'
    else
        q = 'SELECT allcourses FROM master WHERE majorname = "'+req.query.degree+'"'
    
    console.log(req.query.degree);
    mysqlConnection.query(q, (err, info, fields) => {
        if (!err)
            res.send(info);
        else
            console.log(err);
    })
});
//get courses information 
app.get('/courses', (req, res) => {

    if (req.query.course == "all")
        q = 'SELECT name FROM comp'
    else
        q = 'SELECT * FROM comp WHERE coursename = "'+req.query.course+'"'
    
    //console.log(req.query.degree);
    mysqlConnection.query(q, (err, info, fields) => {
        if (!err)
            res.send(info);
        else
            console.log(err);
    })
});