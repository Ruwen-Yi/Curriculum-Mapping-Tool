/* Access database*/
const mysqlConnection = require('../app');

/* Access data and render degree names*/
const get_degree_streams = (req, res) => {
    let qq = "SELECT * FROM degree_streams"
    mysqlConnection.query(qq, function (err, result) {
        if (err) throw err;
        res.send(result);
    });

};
/* Export the function to be used by routes.js */
module.exports = get_degree_streams;