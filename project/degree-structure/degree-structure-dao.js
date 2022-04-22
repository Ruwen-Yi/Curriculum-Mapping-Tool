/* Access core courses and elective courses */
let DegreeStructureDAO = {};

DegreeStructureDAO.getCoreCourses = (degreeID) => {
    return `search core courses of degree ${degreeID}`;
}

DegreeStructureDAO.getElectiveCourses(degreeID){
    return `search elective courses of degree ${degreeID}`;
}

export default DegreeStructureDAO;