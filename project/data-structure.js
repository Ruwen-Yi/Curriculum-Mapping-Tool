/* Course object */
let course = {
    course_subject_code: "COMP SCI 0000",
    course_name: "Computer course name",
    course_url:"http://course-outline/.....",
    belongs_to: [
        "B-Computer Science-core",
        "B-Cyber Security-core",
        "M-Computing and innovation-elective",
        "M-Data Science"
    ],
    pre_requisite: "One of COMP SCI 7777, COMPSCI 7777, ...",
    incompatible: "COMP SCI 7777, COMPSCI 7777, and ...",
};

/* Degree object */
let degree = {
    degree_name: "Master of Computer Science",
    stream:{
        core: {
            stream_name: "Core",
            course_list:[course, course] // a list of course object
        }, 
        elective: {
            stream_name: "Elective",
            course_list:[course, course] // a list of course object
        }, 

        project: {
            stream_name: "Project",
            course_list:[course, course] // a list of course object
        }, 
        
        
        major:[    // a list of major
            {
                stream_name: "Cyber Security",
                course_list:[course, course] // a list of course object
            },
            {
                stream_name: "Machine Learning",
                course_list:[course, course] // a list of course object
            }
        ],
    }
}
/* 注：property为空则null*/


/* Search course in "add course" card in the degree structure page */
// Input: course name (string) (eg, Computer) (eg, System)
// Output: similar courses
// Output:
let course_list = [
    {
        course_subject_code: "COMP SCI 0000",
        course_name: "Computer course name",
    },
    {
        course_subject_code: "COMP SCI 7777",
        course_name: "Artificial Intelligence and Machine Learning Research Project Part A",
    },

]

const search_courses = (req, res)=> {
    /* ... */
}

/* The data structure of add course form in degree structure page */
let add_course_form = {
    selected_course:[
        {
            course_subject_code: "COMP SCI 7102",
            course_name: "Computer System",
        },
        {
            course_subject_code: "COMP SCI 7102",
            course_name: "Computer System",
        },
    ], //could be blank
    selected_degree_stream:[
        {
            degree_name:"Master of Computer Science",
            stream:["core", "elective"] //could be blank
        },
        {
            degree_name:"Master of XXX",
            stream:["core", "elective","project", "major-ai-ml", "major-cybersecurity"]
        }
    ]
}

/* two examples of data sent from edit form */
let edit_form_data = {
    delete: false,
    degree: 'Bachelor of Information Technology',
    stream: 'Core',
    course_subject_code: "COMP SCI 7102",
    course_name: "Computer System",
    incompatible: "COMP SCI 1102, COMP SCI 1202, COMP SCI 2009, COMP SCI 2202, or (COMP SCI 1013 and COMP SCI 1015)",
    pre_requisite: "COMP SCI 1102, COMP SCI 1202, COMP SCI 2009, COMP SCI 2202, or (COMP SCI 1013 and COMP SCI 1015)"
}

edit_form_data = {
    delete: true,
    degree: 'Bachelor of Information Technology',
    stream: 'Core',
    course_subject_code: "COMP SCI 7102",
    course_name: "Computer System",
    incompatible: "COMP SCI 1102, COMP SCI 1202, COMP SCI 2009, COMP SCI 2202, or (COMP SCI 1013 and COMP SCI 1015)",
    pre_requisite: "COMP SCI 1102, COMP SCI 1202, COMP SCI 2009, COMP SCI 2202, or (COMP SCI 1013 and COMP SCI 1015)"
}

/* from course overview page to add-new-course-controller.js */
let add_new_course_form_data = { 
    course_subject_code: 'COMP SCI c444',
    course_name: 'cna',
    pre_requisite: 'afWEW',
    incompatible: 'DSFWEFE' 
}

let add_new_degree_form_data = {
    new_degree_name: 'Master of XXXXX',
    stream: [ 'core', 'project', 'elective' ]
}

add_new_degree_form_data = {
    new_degree_name: 'Master of XXXXX',
    stream: []
}

let delete_degree_data = {
    delete: true, //will always be true
    degree_name: "Master of XXX"
}

let delete_stream_data = { //not "delete" data provided. once you receive data, just delete the stream
    degree_name: "Master of XXX",
    stream: "core"
}
