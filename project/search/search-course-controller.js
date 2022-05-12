/* Access database*/
const mysqlConnection = require('../app'); 

/* Search data */
const searchCourse = (req, res)=>{
    
    /* all category */
    if (req.query['all_categories']){
        
        // Find the course name and return it from database[taken by Yuhao]
        let queryAll = req.query['all_categories'].split('-').join(' ');
        
        /* ..[taken by Yuhao].. */

        res.status(200).send(`Search "${queryAll}" in database
        </br> And then render it according to UI design`);
    }
    else if (req.query['degree-name']){
        
        // Find all the courses under this major from database[taken by Yuhao]
        let queryDegree = req.query['degree-name'].split('-').join(' ');
        
        /* ..[taken by Yuhao].. */
        
        
        res.status(200).send(`Search "${queryDegree}" in database
        </br> And then render it according to UI design`);
    }
    else if (req.query['course-name']){
        
        // Find all the courses under this major from database[taken by Yuhao]
        let queryCourse = req.query['course-name'].split('-').join(' ');
        
        /* ..[taken by Yuhao].. */
        
        
        res.status(200).send(`Search "${queryCourse}" in database
        </br> And then render it according to UI design`);
    }
    else{
        res.status(200).send(`Invalid searching`);
    }
}

module.exports = searchCourse;