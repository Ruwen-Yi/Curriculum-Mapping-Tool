/* Import DAO object which contains data access function */
const { default: DegreeStructureDAO } = require("./degree-structure-dao");


/* Get core courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    let degreeStructure = {};
    degreeStructure.core = DegreeStructureDAO.getCoreCourses();
    res.status(200).send(`Render Data: \n`);
}

module.exports = renderDegreeStructure;
    
