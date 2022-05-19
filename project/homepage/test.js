/* Access database*/
const mysqlConnection = require('../app');

const async = require('async')

async function main(req, res) {

    const mysql2 = require('mysql2/promise');

    const connection = await mysql2.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    database: 'adelaide'
    });

    // list = [ {}, {}, ... ]
    let [list] = await connection.execute('SELECT * FROM adelaide.course');

    for (i=0; i<list.length; i++){

        [b_to] = await connection.execute('SELECT * FROM `degree_course` WHERE `courses` = "'+ list[i].fullname +'";');
        list[i].belongs_to = b_to;
    }

    res.send(list)
    
}



/* Access data and render degree names*/
// const test_course = (req, res) => {
//     let qq = 'SELECT * FROM adelaide.course;';

//     mysqlConnection.query(qq, async(err, info, fields) => {
//     if (!err){
//         var data =JSON.stringify(info);
//         data = JSON.parse(data);

//         tem = setData1(data);
        
//         console.log(tem[0])

//         tem = tem.slice(0,3);

//         /* Use async package to do for loop query */
//         async.forEachOf(tem, async function(tem_item, key, callback){
            
//             //tem[key].belongs_to = "test work!"

//             let q_for_each = 'SELECT * FROM adelaide.course;';
//             mysqlConnection.query(q_for_each, (err, info, fields) => {
//                 if (!err){
//                     var test_data =JSON.stringify(info);
//                     test_data = JSON.parse(test_data);
//                     tem[key].belongs_to = test_data;
//                 }
//                 else{
//                     console.log(err);
//                 }
//             });

//             } , function(err){
//                 if(err) {console.error(err.message);}
//         })
//         res.send(tem)
//         //res.render('../views/test.ejs', {arr:tem})
//     }
//     else{
//         console.log(err);
//     }
//     });
// };


/* 为了方便测试，暂未跑这个 */
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
        courses.push(course);

        //console.log(course)
    }
    return courses;
};

/* Export the function to be used by routes.js */
module.exports = main;