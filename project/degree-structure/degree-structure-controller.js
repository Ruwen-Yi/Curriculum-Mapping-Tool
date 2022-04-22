/* Import DAO object which contains data access function */
const { DegreeStructureDAO } = require("./degree-structure-dao");

/* Get core/elec courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    let degreeID = req.params.degreeID;

    // We only have 6 degrees, any other attempts are invalid
    if (degreeID < 0 || degreeID > 6)
        return res.status(200).send(`Not exists`);

    // Get core/elec courses by using functions in DAO
    let degreeStructure = {};
    degreeStructure.core = DegreeStructureDAO.getCoreCourses(degreeID);
    degreeStructure.elec = DegreeStructureDAO.getElectoveCourses(degreeID);

    // Render data, according to your UI desing
    res.status(200).send(`${degreeStructure.core} <br> ${degreeStructure.elec} <br> Render!!`);
}

module.exports = renderDegreeStructure;
    
