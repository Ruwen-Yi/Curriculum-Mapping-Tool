/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const add_new_course = (req,res)=>{
    console.log(req.body);
    let newC = req.body
    // must do res.send
    let qq= "INSERT INTO adelaide.course ( subject_area, code, course_code, course_name, fullname, career, courselink_href, pre_requisite, Incompatibale, units, term, belongs_to) VALUES ('', '', '"+newC.course_subject_code+"', '"+newC.course_name+"', '"+newC.course_subject_code+' '+newC.course_name+"', '', '', '"+newC.pre_requisite+"', '"+newC.incompatible+"', '', '', '');"
    mysqlConnection.query(qq)
    res.send({msg:"POST succeed!"}) 
}

/* Export the function to be used by routes.js */
module.exports = add_new_course;