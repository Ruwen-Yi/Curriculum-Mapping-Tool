/* Access database*/
const mysqlConnection = require('../app');

const search_add_courses = (req, res)=> {
    
    // let course_name = req.query['course'].split('-').join(' ');
    // console.log(course_name);
    // let qq= '';
    // mysqlConnection.query(qq, (err, info, fields) => {
    //     if (!err){
    //         var data =JSON.stringify(info);
    //         data = JSON.parse(data);
            
    //         return process_course_list(req,res,data);
    //     }
    //     else{
    //         console.log(err);
    //     }
    // })
}

/* This function process the raw data and produce a course_list */
function process_course_list(req,res,data) {
    let course_list = [{},{}];
    /* check data stucture, output a course_list */
    res.send(course_list);
}

module.exports = search_add_courses;