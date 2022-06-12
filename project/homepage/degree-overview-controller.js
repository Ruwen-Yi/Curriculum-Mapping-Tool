/* Access database*/
const mysqlConnection = require('../app');

/* Access data and render degree names*/
const renderAllDegreeName = (req, res) => {

    let qq= 'SELECT * FROM adelaide.degree;'
    mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);
            console.log(data[1].degree);
            res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
    })
    
};

const addNewDegree = (req, res)=>{
    console.log("req.body");
    console.log(req.body);
    res.send(req.body)
}

/* Export the function to be used by routes.js */
module.exports = {renderAllDegreeName, addNewDegree};