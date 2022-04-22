/* Access core courses and elective courses */
/* Data Access Object */
let DegreeStructureDAO = {};

DegreeStructureDAO.getCoreCourses = (degreeID) => {
    return `search core courses of degree ${degreeID}`; // access database
}

DegreeStructureDAO.getElectoveCourses = (degreeID) => {
    return `search elective courses of degree ${degreeID}`;
}

module.exports = {DegreeStructureDAO};