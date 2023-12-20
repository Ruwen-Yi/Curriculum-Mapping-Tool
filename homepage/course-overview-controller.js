/* Access database*/
// const asyncConnection = require('../db/asyncConnection.js');
const mysqlConnection = require('../app');

const connection = mysqlConnection;

async function main(req, res) {
    let list = []; 
    new Promise((resolve, reject) => {
        connection.execute(
            "SELECT * FROM `course`",
            null,
            (err, courses) => (err ? reject(err) : resolve(courses.slice(0,5)))
        );
    })
    .then(courses => {
        console.log(courses);
        // add degrees info to every course
        const promises = courses.map(course => fetchDegreesByCourse(course));
        return Promise.all(promises);
    })
    .then((results) => {
        console.log(JSON.stringify(results, null, 2));
        let list = setData1(results);
        res.render("../views/homepage-course-overview.ejs", { course_list: list });
    })
    .catch(err => {
        console.error(err.stack);
    })

    // for (i = 0; i < list.length; i++) {

    //     const query = 'SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = ?';
    //     [b_to] = await connection.execute(query, [list[i].fullname]);
    //     let bt = [];
    //     let info = {
    //         degree: "",
    //         courses: "",
    //         stream: "",
    //         supplement: "",
    //         full: ""
    //     }
    //     for (ii = 0; ii < b_to.length; ii++) {
    //         var reg = RegExp(/Master/)
    //         var part1, part2, part3;

    //         if (b_to[ii].degree.match(reg)) {
    //             part1 = b_to[ii].degree.replace("Master of ", "M-");
    //         } else if (b_to[ii].degree == "") {
    //             part1 = ""
    //         } else {
    //             part1 = b_to[ii].degree.replace("Bachelor of ", "B-");
    //         }

    //         if (b_to[ii].stream == "") {
    //             part2 = "";
    //         } else {
    //             part2 = "-" + b_to[ii].stream;
    //         }

    //         if (b_to[ii].supplement == "") {
    //             part3 = "";
    //         } else {
    //             part3 = "-" + b_to[ii].supplement
    //         }

    //         bb = part1 + part2 + part3;
    //         info = b_to[ii];
    //         info.full = bb;
    //         bt.push(info)
    //     }
    //     list[i].belongs_to = bt;
    // }

    // list = setData1(list)
    // res.render("../views/homepage-course-overview.ejs", { course_list: list });
}

function fetchDegreesByCourse(course) {
    return (
        new Promise((resolve, reject) => {
            const query = 'SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = ?';
            connection.execute(
                query, 
                [course.fullname],
                (err, result) => (err ? reject(err) : resolve(result))
            );
        })
        .then(degrees => {
            course.belongs_to = [];
            
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

function setData1(data11){
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

        //console.log(course)
    }
    return courses;
};

/* Export the function to be used by routes.js */
module.exports = main;
