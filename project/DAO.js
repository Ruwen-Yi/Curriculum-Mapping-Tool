
const mysqlConnection = require('./app');

const getAllDegree = mysqlConnection.query('SELECT * FROM adelaide.content;', (err, info, fields) => {
    if (!err) {
        let data = JSON.stringify(info);
        data = JSON.parse(data);
        console.log(data[1].degree)
    }
});

module.exports = getAllDegree;