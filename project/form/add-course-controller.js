/* Access database*/
const { NULL } = require('mysql/lib/protocol/constants/types');
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const add_course = (req,res)=>{
    let newC = req.body;
//     let newC = {
    // selected_course:[
    //     {
    //         course_subject_code: "COMP SCI 7102",
    //         course_name: "Computer System",
    //     },
    //     {
    //         course_subject_code: "COMP SCI 7102",
    //         course_name: "Computer System",
    //     },
    // ], //could be blank
    // selected_degree_stream:[
    //     {
    //         degree_name:"Master of Computer Science",
    //         stream:["core", "elective"] //could be blank
    //     },
    //     {
    //         degree_name:"Master of XXX",
    //         stream:["core", "elective","project", "major-ai-ml", "major-cybersecurity"]
    //     }
    // ]
// }
    console.log(newC);
     // must do res.send
    for(i=0;i<newC.selected_course.length;i++){
        for(ii=0;ii<newC.selected_degree_stream.length;ii++){
        for(iii=0;iii<newC.selected_degree_stream[ii].streams.length;iii++){
        let stream ="";
        if(newC.selected_degree_stream[ii].streams[iii]=="elective"){
            stream= "elec"
        }else{
            stream=newC.selected_degree_stream[ii].streams[iii];
        }
        let qq ="INSERT INTO adelaide.degree_course ( degree, stream, supplement, courses, name ) VALUES ( '"+newC.selected_degree_stream[ii].degree_name+"', '"+stream+"', '', '"+newC.selected_course[i].course_subject_code+newC.selected_course[i].course_name+"', '"+newC.selected_course[i].course_name+"' );"
        console.log(qq);
        mysqlConnection.query(qq);
        }
        }
    }

    res.send({msg:"POST succeed!"})
}

/* Export the function to be used by routes.js */
module.exports = add_course;