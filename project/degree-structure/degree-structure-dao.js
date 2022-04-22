/* Access core courses and elective courses */
let DegreeStructureDAO = {};

DegreeStructureDAO.getCoreCourses = (degreeID) => {
    return `search core courses of degree ${degreeID}`;
}

DegreeStructureDAO.getElectoveCourses = (degreeID) => {
    return `search elective courses of degree ${degreeID}`;
}

module.exports = {DegreeStructureDAO};