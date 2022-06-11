/* Access database*/
const mysqlConnection = require('../app');

/* Get core/elec courses from the database and then render them */
const renderDegreeStructure = (req, res) => {
    // Search database[Unfinished]

    // Render data, according to your UI desing
    res.render("../views/degree-structure-page.ejs");
}

const getDegreeData = async(req, res) => {
    /* Taken by yuhao */
    let degreeName = req.params.degreeName;
    degreeName = degreeName.split('-').join(' ');
    
    console.log(degreeName);
    let degree_structure = await getStructure(degreeName);
    res.json(degree_structure)

}

/* Access database*/
async function getStructure(degreeName) {
    console.log(degreeName);

    const mysql2 = require('mysql2/promise');

    const connection = await mysql2.createConnection({
    host: 'database-2.cwlp4i7l59rt.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678', //请与上一步在数据库设置的密码相同
    database: 'adelaide'
    });

    // list = [ {}, {}, ... ]
    const name1 = degreeName;
    //let [list] = await connection.execute('SELECT * FROM adelaide.course');
    let [list] = await connection.execute('SELECT degree_course.name,degree_course.degree, degree_course.courses,degree_course.stream,degree_course.supplement,course.course_code, course.course_name, course.courselink_href, course.pre_requisite,course.belongs_to, course.Incompatibale FROM `degree_course` left JOIN course ON course.fullname=degree_course.courses WHERE `degree` = "'+name1+'";');

    for (i=0; i<list.length; i++){

        [b_to] = await connection.execute('SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = "'+ list[i].courses +'";');
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
    //console.log(list);

    li = setData1(list)
    return li;   
}

/* Format data */
function setData1(data11){
    let courses=[];
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
            
            
            major:[
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
    //console.log(data11)
    degree.degree_name=data11[0].degree;
    let cout ="0";
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

        if(data11[i].course_name==null){
            course.course_name =  data11[i].name;
            
        }
        else{
        course.course_name =  data11[i].course_name;
        }

        //course.course_name =  data11[i].fullname;
        course.course_url =  data11[i].courselink_href;
        course.pre_requisite =  data11[i].pre_requisite;
        course.incompatible = data11[i].Incompatibale;
        course.belongs_to = data11[i].belongs_to;
        //courses.push(course);

        //console.log(course)
        if (data11[i].stream == "core"||data11[i].stream == "core "){
        
        //console.log(data11[i].stream)
        degree.stream.core.course_list.push(course)
        //console.log(degree.stream.core.course_list)
        }
        else if (data11[i].stream == "elec"){
            degree.stream.elective.course_list.push(course);
        }
        else if (data11[i].stream == "project"){
            degree.stream.project.course_list.push(course);
        }
        else{
            
            if(degree.stream.major.length==0){
                cout++;
                
                degree.stream.major.push(
                    {
                    stream_name: data11[i].stream,
                    course_list:[course] // a list of course object
                    }
                )
            }
            else{
                
                let set = 1;
                for(ii=0;ii<degree.stream.major.length;ii++){
                    set=0;
                    if(degree.stream.major[ii].stream_name==data11[i].stream){
                        degree.stream.major[ii].course_list.push(course);
                        ii=degree.stream.major.length; 
                        set=1;
                    } 
                }  
                if(set==0){
                    degree.stream.major.push(
                        {
                            stream_name:data11[i].stream,
                            course_list:[course]
                        }
                    )
                    ii=degree.stream.major.length;
                }                
            }

        }
    }
    return degree;
};

module.exports = {renderDegreeStructure, getDegreeData};
    
