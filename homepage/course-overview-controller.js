/* Access database*/
const mysqlConnection = require('../app');

function renderAllCourses(req, res) {
    new Promise((resolve, reject) => {
        // fetch courses
        mysqlConnection.execute(
            "SELECT * FROM `course`",
            null,
            (err, courses) => (err ? reject(err) : resolve(courses))
        );
    })
    .then(courses => {
        console.log(courses);
        // fetch degrees info of every course and store into the course object
        const promises = courses.map(course => fetchDegreesInfoByCourse(course));
        return Promise.all(promises);
    })
    .then(courses => {
        console.log(JSON.stringify(courses, null, 2));
        // make a new course list with formatted info of each course
        let list = formatCoursesInfo(courses);
        res.render("../views/homepage-course-overview.ejs", { course_list: list });
    })
    .catch(err => {
        console.error(err.stack);
    })
}

// this function return a course object with a new property called "belongs_to"
// the value of the property is an array
// the array contains all the degrees that the course belongs to. 
function fetchDegreesInfoByCourse(course) {
    return (
        new Promise((resolve, reject) => {
            const query = 'SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = ?';
            mysqlConnection.execute(
                query, 
                [course.fullname],
                (err, result) => (err ? reject(err) : resolve(result))
            );
        })
        .then(degrees => {
            course.belongs_to = [];
            
            // format each degree info
            degrees.forEach((item, index) => {
                let {degree, stream, supplement} = item;
                
                degree = degree.trim() ? degree.replace("Master of ", "Ms-").replace("Bachelor of ", "Bc-") : "";
                stream = stream.trim() ? ("-" + stream) : "";
                supplement = supplement.trim() ? ("-" + supplement) : "";
                
                // to be edited
                course.belongs_to[index] = {};
                course.belongs_to[index].full = degree + stream + supplement;
            })

            return course;
        })
    )   
}

function formatCoursesInfo(data11){
    let courses=[];
    for(i=0;i<data11.length;i++){
        let course = {
            course_subject_code: "COMP SCI 0000",
            course_name: "Computer course name",
            course_url:"http://course-outline/.....",
            belongs_to: [],
            pre_requisite: "One of COMP SCI 7777, COMPSCI 7777, ...",
            incompatible: "COMP SCI 7777, COMPSCI 7777, and ...",
        };
        course.course_subject_code = data11[i].course_code;
        course.course_name =  data11[i].course_name;
        course.course_url =  data11[i].courselink_href;
        course.pre_requisite =  data11[i].pre_requisite;
        course.incompatible = data11[i].Incompatibale;
        course.belongs_to = data11[i].belongs_to;
        courses.push(course);
    }
    return courses;
};

/* Export the function to be used by routes.js */
module.exports = {renderAllCourses};
