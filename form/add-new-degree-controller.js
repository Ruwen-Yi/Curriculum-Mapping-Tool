/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const add_new_degree = (req, res) => {
    console.log(req.body);
    let q = "INSERT INTO degree ( degree, content ) VALUES ( '" + req.body.new_degree_name + "','' );"
    mysqlConnection.query(q);

    for (i = 0; i < req.body.stream.length; i++) {
        let qq = "INSERT INTO degree_course ( degree, stream, supplement, courses, name ) VALUES ( '" + req.body.new_degree_name + "', '" + req.body.stream[i] + "', '', '', '' );"
        mysqlConnection.query(qq);

        /* add to degree_streams table */
        let stream = "";
        if (req.body.stream[i] == "core") stream = "Core";
        if (req.body.stream[i] == "elec") stream = "Elective";
        if (req.body.stream[i] == "project") stream = "Project";
        let sql = `INSERT INTO degree_streams (degree, streams) VALUES ('${req.body.new_degree_name}', '${stream}')`
        mysqlConnection.query(sql);
    }
    res.send({ msg: "POST succeed!" }) // must do res.send
}

/* Export the function to be used by routes.js */
module.exports = add_new_degree;