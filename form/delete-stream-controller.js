/* Access database*/
const mysqlConnection = require('../app');

const delete_stream = (req,res)=>{
    console.log(req.body);
    let stream ="";
    if(req.body.stream=="Elective"){
        stream= "elec"
    }else{
        stream=req.body.stream;
    }
    qq='DELETE FROM adelaide.degree_course WHERE stream = "'+stream+'" AND degree = "'+req.body.degree_name+'";'
    mysqlConnection.query(qq);

    /* update degree_streams table */
    sql=`DELETE FROM adelaide.degree_streams WHERE degree = '${req.body.degree_name}' AND streams = '${req.body.stream}'`;
    mysqlConnection.query(sql);

    res.send({msg:"delete succeed!"})
}

module.exports = delete_stream;