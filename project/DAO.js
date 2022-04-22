
const mysqlConnection = require('./app');

function getAllDegree(){
    let qq= 'SELECT * FROM adelaide.content;'
    let data = -1;
    mysqlConnection.query(qq, (err, info, fields) => {
        if (!err) {
            data = JSON.stringify(info);
            data = JSON.parse(data);
            console.log(data[1].degree);
        }
    });
    return data;
};


module.exports = getAllDegree;