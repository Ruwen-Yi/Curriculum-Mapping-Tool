/* Access database*/
const mysqlConnection = require('../app');

/* Get core/elec courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    let degreeName = req.params.degreeName;
    degreeName = degreeName.split('-').join(' ');
    // Search database[Unfinished]

    // Render data, according to your UI desing
    res.status(200).send(`Find core & elec courses of ${degreeName} <br> <br> Render degree structure of ${degreeName}`);
}

module.exports = renderDegreeStructure;
    
