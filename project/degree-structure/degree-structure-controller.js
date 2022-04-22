/* Import DAO object which contains data access function */
const { DegreeStructureDAO } = require("./degree-structure-dao");


/* Get core courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    let degreeStructure = {};
    degreeStructure.core = DegreeStructureDAO.getCoreCourses(req.params.degreeID);
    degreeStructure.elec = DegreeStructureDAO.getElectoveCourses(req.params.degreeID);

    res.status(200).send(`${degreeStructure.core} <br> ${degreeStructure.elec} <br> Render!!`);
}

module.exports = renderDegreeStructure;
    
