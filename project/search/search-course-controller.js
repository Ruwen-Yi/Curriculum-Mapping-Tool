/* Access database*/
const mysqlConnection = require('../app'); 

/* Search data */
const searchCourse = (req, res)=>{
    /* all, degrees, courses */
    if (req.query.course_name){
        
        // Find the course name and return it from database[taken by Yuhao]
        let queryCourseName = req.query.course_name;
        
        /* ..[taken by Yuhao].. */

        res.status(200).send(`Search course with course_name "${queryCourseName}" in database
        </br> And then render it according to UI design`);
    }
    else if (req.query.major_name){
        
        // Find all the courses under this major from database[taken by Yuhao]
        let queryMajor = req.query.major_name;
        
        /* ..[taken by Yuhao].. */
        
        
        res.status(200).send(`Search all the courses under major "${queryMajor}" in database
        </br> And then render it according to UI design`);
    }
    else{
        res.status(200).send(`Invalid searching`);
    }
}

module.exports = searchCourse;