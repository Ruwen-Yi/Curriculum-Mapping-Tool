/* Access database*/
const mysqlConnection = require('../app');

const renderAllCourses = (req, res) => {
    let qq = 'SELECT * FROM adelaide.course;';
    mysqlConnection.query(qq, async(err, info, fields) => {
    if (!err){
        var data =JSON.stringify(info);
        data = JSON.parse(data);

        tem = setData1(data);

        console.log(tem[0])
        
        res.render("../views/homepage-course-overview.ejs",{course_list:tem});
    }
    else{
        console.log(err);
    }
    });
};


function setData1(data11){
    let courses=[];
    for(i=0;i<data11.length;i++){
        let course = {
            course_subject_code: "COMP SCI 0000",
            course_name: "Computer course name",
            course_url:"http://course-outline/.....",
            belongs_to: [
            ],
            pre_requisite: "One of COMP SCI 7777, COMPSCI 7777, ...",
            incompatible: "COMP SCI 7777, COMPSCI 7777, and ...",
        };
        course.course_subject_code = data11[i].course_code;
        course.course_name =  data11[i].course_name;
        course.course_url =  data11[i].courselink_href;
        course.pre_requisite =  data11[i].pre_requisite;
        course.incompatible = data11[i].Incompatibale;
        courses.push(course);

        //console.log(course)
    }
    return courses;
};

/* Export the function to be used by routes.js */
module.exports = renderAllCourses;