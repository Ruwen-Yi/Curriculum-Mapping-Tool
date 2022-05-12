const mysqlConnection = require('./app');

const renderDegree = (req,res) => {
    let qq= 'SELECT * FROM adelaide.content;'
    mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);
            console.log(data[1].degree);
            res.render("main",{degreeContent:data});
        }
        else{
            console.log(err);
        }
    })
};

module.exports = renderDegree;