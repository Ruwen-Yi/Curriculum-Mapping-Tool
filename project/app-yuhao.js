/* Import express framework */
const express = require('express');
const app = express();


const mysql = require('mysql');
const bodyParser = require("body-parser");
const database = require('mime-db');
const axios = require('axios')

app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public/`));
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Used for sending the Json Data to Node API   */
app.use(express.json());

/* Connection String to Database */
var mysqlConnection = mysql.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    port: '3306'
});

/* To check whether the connection is succeed for Failed while running the project in console. */  
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Db Connection Succeed");
    } else {
        console.log("Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2));
    }
});
/* Use adelaide database */
mysqlConnection.query(`USE adelaide;`);

/* Export database */
module.exports = mysqlConnection;



/* Import routes for showing degree name */
const homepage = require('./homepage/homepage-routes');
/* Import routes for showing degree structure */
const degreeStructure = require('./degree-structure/degree-structure-routes');
/* Import routes for searching functionality */
const courseSearching = require('./search/search-course-route');

/* Set up parent routes for degree structure */
app.use('/', homepage);
app.use('/degree-structure', degreeStructure);
app.use('/course-relationships', (req,res)=>{
    res.send("Course relationship page");
})
app.use('/search', courseSearching);

//get all course
app.get('/test3', (req,res)=>{

    
        let data1="";
        let data2="";


        qq = 'SELECT * FROM adelaide.course;';
        mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);

            tem = setData1(data);
            data1 = tem;
            //console.log(tem);
            res.send(tem);
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        });
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
        // function setData2(data22){
        //     for (i=0;i<data22.length;i++){
        //         temp = data22[i].degree+"-"+data22[i].stream+"-"+data22[i].supplement;
        //         data1.belongs_to.push(temp);
        //     }
        //     return data1;
        // };
        // q = 'SELECT * FROM adelaide.degree_course WHERE courses LIKE "%'+courseCode + '%";';
        //  mysqlConnection.query(q, (err, info, fields) => {
        // if (!err){
        //     var data =JSON.stringify(info);
        //     data2 = JSON.parse(data);
        //     //console.log(data2);
        //     tt = setData2(data2);
        //     //console.log(course);
        //     res.send(tt)
        //     //res.send(course);
        //     //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        // }
        // else{
        //     console.log(err);
        // }
        // })
        

    

});

//get one course
app.get('/test2', (req,res)=>{

    name1 = req.query.name;
    function getCourseInfo (courseCode) {
    
        let data1="";
        let data2="";
        let course = {
        course_subject_code: "COMP SCI 0000",
        course_name: "Computer course name",
        course_url:"http://course-outline/.....",
        belongs_to: [
        // "B-Computer Science-core",
        // "B-Cyber Security-core",
        // "M-Computing and innovation-elective",
        // "M-Data Science"
        ],
        pre_requisite: "One of COMP SCI 7777, COMPSCI 7777, ...",
        incompatible: "COMP SCI 7777, COMPSCI 7777, and ...",
        };

        

        qq = 'SELECT * FROM adelaide.course WHERE fullname = "' + courseCode + '";';
        mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);
            if (data==0){
                course.course_subject_code = "";
                course.course_name =  "";
                course.course_url =  "";
                course.pre_requisite =  "";
                course.incompatible = "";
                
            }else{
            setData1(data);
            }
            //console.log(data1[0]);
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        });
        function setData1(data11){
            course.course_subject_code = data11[0].course_code;
            course.course_name =  data11[0].course_name;
            course.course_url =  data11[0].courselink_href;
            course.pre_requisite =  data11[0].pre_requisite;
            course.incompatible = data11[0].Incompatibale;
            //console.log(course)
            
        };
        function setData2(data22){
            for (i=0;i<data22.length;i++){
                temp = data22[i].degree+"-"+data22[i].stream+"-"+data22[i].supplement;
                course.belongs_to.push(temp);
            }
        };
        q = 'SELECT * FROM adelaide.degree_course WHERE courses LIKE "%'+courseCode + '%";';
         mysqlConnection.query(q, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data2 = JSON.parse(data);
            //console.log(data2);
            setData2(data2);
            //console.log(course);
            res.send(course)
            //res.send(course);
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        })
        

        
        

    
    
    }
    getCourseInfo(name1);

});

/* Route for testing  get all course in the degree*/
app.get('/test', (req,res)=>{
    let course = {
    course_subject_code: "COMP SCI 0000",
    course_name: "Computer course name",
    course_url:"http://course-outline/.....",
    belongs_to: [
        // "B-Computer Science-core",
        // "B-Cyber Security-core",
        // "M-Computing and innovation-elective",
        // "M-Data Science"
    ],
    pre_requisite: "One of COMP SCI 7777, COMPSCI 7777, ...",
    incompatible: "COMP SCI 7777, COMPSCI 7777, and ...",
    };
    function getCourseInfo (courseCode) {
    

    
        let data1="";
        let data2="";


        

        qq = 'SELECT * FROM adelaide.course WHERE fullname = "' + courseCode + '";';
        mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data = JSON.parse(data);
            if (data==0){
                course.course_subject_code = "";
                course.course_name =  "";
                course.course_url =  "";
                course.pre_requisite =  "";
                course.incompatible = "";
                
            }else{
            setData1(data);
            }
            //console.log(data1[0]);
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        });
        function setData1(data11){
            course.course_subject_code = data11[0].course_code;
            course.course_name =  data11[0].course_name;
            course.course_url =  data11[0].courselink_href;
            course.pre_requisite =  data11[0].pre_requisite;
            course.incompatible = data11[0].Incompatibale;
            //console.log(course)
            
        };
        function setData2(data22){
            for (i=0;i<data22.length;i++){
                temp = data22[i].degree+"-"+data22[i].stream+"-"+data22[i].supplement;
                course.belongs_to.push(temp);
            }
        };
        q = 'SELECT * FROM adelaide.degree_course WHERE courses LIKE "%'+courseCode + '%";';
         mysqlConnection.query(q, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data2 = JSON.parse(data);
            //console.log(data2);
            setData2(data2);
            //console.log(course);
            
            //res.send(course);
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        })
        

        
        

    
    
    }
    //getCourseInfo("COMP SCI 2000 Computer Systems");



    function getDeegreeInfo (Name) {
        //degreeName = "Master of Computer Science";
        let qq= 'SELECT * FROM adelaide.degree_course WHERE degree = "'  + Name + '";';

        var data3 = "";
        mysqlConnection.query(qq, (err, info, fields) => {
        if (!err){
            var data =JSON.stringify(info);
            data3 = JSON.parse(data);
            //console.log(data3[1].degree);
            
            async function lo (){
                
                de = await setDegree(data3)
                console.log(de)
                
            }
                
            lo();

            
            
            //res.render("../views/homepage-degree-overview.ejs",{degreeContent:data});
        }
        else{
            console.log(err);
        }
        })

        function setDegree(data33){
                    let degree = {
    degree_name: "",
    stream:{
        core: {
            stream_name: "Core",
            course_list:[] // a list of course object
        }, 
        elective: {
            stream_name: "Elective",
            course_list:[] // a list of course object
        }, 

        project: {
            stream_name: "Project",
            course_list:[] // a list of course object
        }, 
        
        
        major:[    // a list of major
            // {
            //     stream_name: "",
            //     course_list:[] // a list of course object
            // },
            // {
            //     stream_name: "",
            //     course_list:[] // a list of course object
            // }
        ],
    }
    
    }
            degree.degree_name = data33[0].degree;
            for (i=0;i<data33.length;i++){
                url = "http://localhost:5000/test2?name="+data33[i].courses
                axios.get(url)
                    .then(function (response) {
                //console.log(response.data);
                if (data33[i].stream == "core"){
                    console.log(i)
                    //console.log(data33[i].stream)
                degree.stream.core.course_list.push(response.data)
                //console.log(degree.stream.core.course_list)
                }else if (data33[i].stream == "elec"){
                    degree.stream.elective.course_list.push(data33[i].courses);
                }else if (data33[i].stream == "project"){
                    degree.stream.project.course_list.push(data33[i].courses);
                }else{
                    if(degree.stream.major.length==0){
                        degree.stream.major.push(
                            {
                            stream_name: data33[i].stream,
                            course_list:[data33[i].courses] // a list of course object
                            }
                        )
                    }else{
                        for(i=0;i<degreeName.stream.major.length;i++){
                            if(degree.stream.major[i].stream_name==data33[i].stream){
                                degree.stream.major[i].course_list.push(data33[i].courses);
                            }else{
                                degree.stream.major.push(
                                    {
                                        stream_name:data33[i].stream,
                                        course_list:[data33[i].courses]
                                    }
                                )
                            }
                        }
                    }
                    
                }
                
                    //console.log(i)
            
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                
                
            }
           
        }


}
    // getCourseInfo ("COMP SCI 7092",function(x){
    //     console.log(course)
    // });
    getDeegreeInfo ("Bachelor of Computer Science");
    
})

/* Set up server */
app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...');
});