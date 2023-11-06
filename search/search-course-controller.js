/* Access database*/
const mysqlConnection = require('../app'); 
const async = require('async')
/* Search data */
async function searchCourse (req, res){
    const mysql2 = require('mysql2/promise');

    const connection = await mysql2.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    database: 'adelaide'
    });
    /* all category */
    if (req.query['all-categories']){
        
        // Find the course name and return it from database[taken by Yuhao]
        let queryAll = req.query['all-categories'].split('-').join(' ');
        
        /* ..[taken by Yuhao].. */

        let [list] = await connection.execute('SELECT * FROM adelaide.course WHERE fullname LIKE "%'+queryAll+'%";');

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
        let [AllDgree] = await connection.execute('SELECT * FROM adelaide.degree WHERE degree LIKE "%'+queryAll+'%";');
        //res.send(list)
        // Render this two 
        //console.log(list);
        //console.log(AllDgree);
        res.render("../views/searching-result-page.ejs",{courses:list,degrees:AllDgree})
//}
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


        // res.status(200).send(`Search "${queryAll}" in database
        // </br> And then render it according to UI design`);
    }
    else if (req.query['degree-name']){
        
        // Find all the courses under this major from database[taken by Yuhao]
        let queryDegree = req.query['degree-name'].split('-').join(' ');
        console.log(queryDegree);
        /* ..[taken by Yuhao].. */
        
        
        let qq= 'SELECT * FROM adelaide.degree WHERE degree LIKE "%'+queryDegree+'%";'
        mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);
            //console.log(data[1].degree);
            //res.send(data)
            res.render("../views/searching-result-page.ejs",{courses:{},degrees:data})
        }
        else{
            console.log(err);
        }
        });

        
        // res.status(200).send(`Search "${queryDegree}" in database
        // </br> And then render it according to UI design`);
    }
    else if (req.query['course-name']){
        
        // Find all the courses under this major from database[taken by Yuhao]
        let queryCourse = req.query['course-name'].split('-').join(' ');
        console.log(queryCourse);
        /* ..[taken by Yuhao].. */
        
        

    //async function main(req, res) {

    // list = [ {}, {}, ... ]
    let [list] = await connection.execute('SELECT * FROM adelaide.course WHERE fullname LIKE "%'+queryCourse+'%";');

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
    //res.send(list)
    res.render("../views/searching-result-page.ejs",{courses:list,degrees:{}})
    
//}


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

        
        // res.status(200).send(`Search "${queryCourse}" in database
        // </br> And then render it according to UI design`);
    }
    else{
        res.render('../views/error.ejs');
    }
}

module.exports = searchCourse;