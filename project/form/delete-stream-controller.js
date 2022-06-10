/* Access database*/
const mysqlConnection = require('../app');

const delete_stream = (req,res)=>{
    console.log(req.body);
    res.send({msg:"delete succeed!"})
}

module.exports = delete_stream;