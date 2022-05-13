/* Access database*/
const mysqlConnection = require('../app');

/* Get core/elec courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    let degreeName = req.params.degreeName;
    degreeName = degreeName.split('-').join(' ');
    // Search database[Unfinished]

    // Render data, according to your UI desing
    res.render("../views/degree-structure-page.ejs");
}

module.exports = renderDegreeStructure;
    
