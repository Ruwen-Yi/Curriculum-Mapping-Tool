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

function search_courses(course_name) {
}