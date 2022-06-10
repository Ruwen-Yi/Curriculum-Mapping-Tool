/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const edit_course = (req,res)=>{
    console.log(req.body);
    let edit_form_data = req.body
    let result ="";
    let qq="";
    let stream="";
    if (edit_form_data.stream=="Core"){
        stream="core";
    }else if(edit_form_data.stream=="Elective"){
        stream="elec";
    }else if(edit_form_data.stream=="Project"){
        stream="project";
    }
    if (edit_form_data.delete){
        result = "data successfully deleted";
        qq= 'DELETE FROM adelaide.degree_course WHERE courses LIKE "'+edit_form_data.course_subject_code+'%"'+' AND stream="'+stream+'" AND degree="'+req.body.degree+'";'
        console.log(qq);
    }
    else{
        result = "data successfully edited";
        qq= 'UPDATE adelaide.course SET Incompatibale="'+req.body.incompatible+'", pre_requisite="'+req.body.pre_requisite+'" WHERE course_code="'+req.body.course_subject_code+'";'
        console.log(qq);
    }   
    mysqlConnection.query(qq);
    res.send({msg:result}) // must do res.send

}

/* Export the function to be used by routes.js */
module.exports = edit_course;