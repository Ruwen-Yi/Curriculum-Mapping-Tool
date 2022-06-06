/* Access database*/
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
    // list = list.slice(0,50)

    for (i=0; i<list.length; i++){

        [b_to] = await connection.execute('SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = "'+ list[i].fullname +'";');
        let bt=[];
        let info={ 
                degree:"",
                courses:"",
                stream:"",
                supplement:"",
                full:""}
        for(ii=0;ii<b_to.length;ii++){
            var reg =RegExp(/Master/)
            var part1,part2,part3;
            
            if(b_to[ii].degree.match(reg)){
                part1=b_to[ii].degree.replace("Master of ","M-");
            }else if(b_to[ii].degree==""){
                part1=""
            }else{
                part1=b_to[ii].degree.replace("Bachelor of ","B-");
            }
            if(b_to[ii].stream==""){
                part2="";
            }else{
                part2="-" +b_to[ii].stream;
            }
            if(b_to[ii].supplement==""){
                part3="";
            }else{
                part3="-"+b_to[ii].supplement
            }

            bb = part1+part2+part3;
            info = b_to[ii];
            info.full=bb;
            bt.push(info)
        }
        list[i].belongs_to = bt;
    }

    list = setData1(list)
    res.render("../views/homepage-course-overview.ejs",{course_list:list});
    //res.send(list)
    
}


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
        course.belongs_to = data11[i].belongs_to;
        courses.push(course);

        //console.log(course)
    }
    return courses;
};

/* Export the function to be used by routes.js */
module.exports = main;







/* Export the function to be used by routes.js */
//module.exports = renderAllCourses;