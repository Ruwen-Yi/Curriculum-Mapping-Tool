/* Access database*/
const mysqlConnection = require('../app');

const delete_degree = (req,res)=>{
   

console.log(req.body);
if (req.body.delete==true){
    let qq =  'DELETE FROM adelaide.degree WHERE degree = "'+req.body.degree_name+'";'
    mysqlConnection.query(qq);

    let sql = `DELETE FROM degree_streams WHERE degree = '${req.body.degree_name}'`
    mysqlConnection.query(sql);
    res.send({msg:"delete succeed!"})
}

}

module.exports = delete_degree;