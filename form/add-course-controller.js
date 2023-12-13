/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const add_course = (req, res) => {
    let newC = req.body;
    console.log(newC);

    for (i = 0; i < newC.selected_course.length; i++) {
        for (ii = 0; ii < newC.selected_degree_stream.length; ii++) {
            for (iii = 0; iii < newC.selected_degree_stream[ii].streams.length; iii++) {
                let stream = "";
                if (newC.selected_degree_stream[ii].streams[iii] == "elective") {
                    stream = "elec"
                } else {
                    stream = newC.selected_degree_stream[ii].streams[iii];
                }
                
                let qq = "INSERT INTO degree_course ( degree, stream, supplement, courses, name ) VALUES ( '" + newC.selected_degree_stream[ii].degree_name + "', '" + stream + "', '', '" + newC.selected_course[i].course_subject_code + newC.selected_course[i].course_name + "', '" + newC.selected_course[i].course_name + "' );"

                mysqlConnection.query(qq);
            }
        }
    }

    res.send({ msg: "POST succeed!" })
}

/* Export the function to be used by routes.js */
module.exports = add_course;