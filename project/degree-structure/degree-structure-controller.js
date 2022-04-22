/* Get core courses from the database */
let courseData = {};

// const getCoreCourses = (req, res, next) => {
//     let degreeID = req.params.degreeID;
//     courseData.core = `Expect all core course of degree ${degreeID}`;
// };

// const getElectiveCourses = (req, res, next) => {
//     let degreeID = req.query.degreeID;
//     courseData.elective = `Expect all elective courses of degree ${degreeID}`;
// };

const renderDegreeStructure = (req, res) => {
    // getCoreCourses();
    // getElectiveCourses();
    res.status(200).send(`Render Data: \n`);
}

module.exports = renderDegreeStructure;
    
