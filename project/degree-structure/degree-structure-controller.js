/* Get core courses from the database */
const getAllCoreCourses = (req, res, next) => {
    let degreeID = req.params.degreeID;
    res.status(200).send(`Expect all core course of degree ${degreeID}\n`);
};

const getAllElectiveCourses = (req, res, next) => {
    let degreeID = req.query.degreeID;
    res.status(200).send(`Expect all elective courses of degree ${degreeID}`);
};

module.exports = {
    getAllCoreCourses,
    getAllElectiveCourses,
};