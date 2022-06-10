/* Access database*/
const mysqlConnection = require('../app');

const delete_degree = (req,res)=>{
    console.log(req.body);
    res.send({msg:"delete succeed!"})
}

module.exports = delete_degree;