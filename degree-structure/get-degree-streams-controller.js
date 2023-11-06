/* Access database*/
const mysqlConnection = require('../app');

/* Access data and render degree names*/
const get_degree_streams = (req, res) => {

    // 'CREATE TABLE degree_streams (degree VARCHAR(255), streams VARCHAR(255))'
    // "INSERT INTO degree_streams (degree, streams) VALUES ('Master of Computer Science', 'Core')"
    // "INSERT INTO degree_streams (degree, streams) VALUES ('Master of Computer Science', 'Elective')"
    // "INSERT INTO degree_streams (degree, streams) VALUES ('Master of Computer Science', 'Project')"
    // "DELETE FROM degree_streams WHERE streams = '${stream_name}'"
    // "SELECT * FROM degree_streams"
    let qq = "SELECT * FROM degree_streams"
    mysqlConnection.query(qq, function (err, result) {
        if (err) throw err;
        //console.log("1 record insterd");

        res.send(result);
    });
    
};
/* Export the function to be used by routes.js */
module.exports = get_degree_streams;