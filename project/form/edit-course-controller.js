/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const edit_course = (req,res)=>{
    console.log(req.body);
    // let qq= 'SELECT * FROM adelaide.degree;'
    // mysqlConnection.query(qq, (err, info, fields) => {
    //     if (!err){
    //         var data =JSON.stringify(info);
    //         data = JSON.parse(data);
    //         console.log(data[1].degree);
    //         res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
    //     }
    //     else{
    //         console.log(err);
    //     }
    // })
}

/* Export the function to be used by routes.js */
module.exports = edit_course;