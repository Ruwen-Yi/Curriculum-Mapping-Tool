const getAllDegree = require('./DAO');

const renderDegree = (req,res) => {
    let data = getAllDegree();
    
    if(data != -1){
        res.send(data);
    }
    else{
        res.status(202).send(`error in DAO.js: data passed in renderDegree() function should not have been equal to -1`);
    }
}

module.exports = renderDegree;