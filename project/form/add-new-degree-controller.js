/* Access database*/
const mysqlConnection = require('../app');

/* This function add one or more course to multiple degrees' streams  */
const add_new_degree = (req,res)=>{
    console.log(req.body);
    let q = "INSERT INTO adelaide.degree ( degree, content ) VALUES ( '"+req.body.new_degree_name+"','' );"
    mysqlConnection.query(q);
    for (i=0;i<req.body.stream.length;i++){
        let qq  ="INSERT INTO adelaide.degree_course ( degree, stream, supplement, courses, name ) VALUES ( '"+req.body.new_degree_name+"', '"+req.body.stream[i]+"', '', '', '' );"
        mysqlConnection.query(qq);
    }
    res.send({msg:"POST succeed!"}) // must do res.send
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
module.exports = add_new_degree;