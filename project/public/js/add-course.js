function add_course() {
    close_add_board();
    show_add_board();
    get_degree_streams();
    render_course(); //delete later
}
function get_degree_streams() {
    let response = request_table('/degree-structure/get-degree-streams', 'GET', {});
    response.then(res => {
        console.log(res)

        let data_list = []
        let data = { degree: "", streams: [] };

        data.degree = res[0].degree
        let i = 0;
        while (i < res.length) {

            if (data.degree == res[i].degree) {
                data.streams.push(res[i].streams);
                //console.log(data.streams)
            }
            else {
                data_list.push({ degree: data.degree, streams: data.streams });

                data.degree = res[i].degree
                data.streams = []
                data.streams.push(res[i].streams);
            }

            i++;

        }
        data_list.push({ degree: data.degree, streams: data.streams });

        console.log(data_list)
        render_options(data_list);
    });
}

function render_options(data_list) {
    if (!data_list) return;
    console.log(data_list);

    let innerHTML = ""
    for (let i = 0; i < data_list.length; i++) {
        innerHTML += `<optgroup label="${data_list[i].degree}" id="BCS">`

        for (let j = 0; j < data_list[i].streams.length; j++) {
            innerHTML += `<option value="${data_list[i].streams[j].toLowerCase().split(' ').join('-')}">${data_list[i].streams[j]}</option>`
        }

        innerHTML += `</optgroup>`
    }
    document.getElementById('stream').insertAdjacentHTML('beforeend', innerHTML);
}

function close_add_board() {
    let add_board = document.getElementById('add_board');
    if (add_board) add_board.remove();
}


function show_add_board() {

    let innerHTML = `
    <div id="add_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; background-color: rgba(0, 0, 0, 0.3);z-index:10;text-align: center;">
    <div style="width: 700px; height: 400px; background-color: white;padding: 0.5rem 2rem;border-radius: 0.5rem;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); max-width: 100%;overflow-y: scroll;overflow-x: hidden;font-family: "Blinker";">
    <style>
        @import url("https://fonts.googleapis.com/css?family=Blinker:400,300,700,600");
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
        hr {
            margin: 1rem 0;
            opacity: 60%;
        }

        
        
        /* ---------------------------------------modal-header---------------------------- */
        
        .section {
            display: inline;
        }
        
        .modal-header {
            text-align: left;
            vertical-align: middle;
        }
        
        .header-content {
            display: inline;
            color: #053742;
            font-family: "Blinker";
            font-weight:bolder;
            font-size: 2rem;
        }
        
        .header-close {
            display: inline;
            line-height: 2.7rem;
            float: right;
        }
        
        .close {
            border-style: none;
            background-color: transparent;
            color: #808080;
            cursor: pointer;
        }
        
        /* ---------------------------------------modal-body---------------------------- */
        
        h2 {
            text-align: left;
            color: #053742;
            font-family: "Blinker";
            font-size: 1.2rem;
            font-weight:400;
        }
        
        .title-group {
            display: flex;
            justify-content: space-between;
        }
        
        .title-left {
            display: inline-block;
            vertical-align: top;
            margin-top: 0px;
        
        }
        
        .button-to-add-new {
            display: inline-block;
            font-size: 1rem;
            margin-top: 0.5rem;
            font-family: "Blinker";
            border-style: none;
            background-color: #fff;
            vertical-align: top;
            margin-top: 0;
            padding-top: 0;
            cursor: pointer;
        }
        
        
        /* search bar */
        .search {
            width: 100%;
            position: relative;
            display: flex;
        }
        
        .searchTerm {
            width: 100%;
            border: 0.1rem solid #053742;
            border-right: none;
            padding: 5px;
            height: 36px;
            border-radius: 5px 0 0 5px;
            outline: none;
            color: #9DBFAF;
        }
        
        .searchTerm:focus {
            color: #39A2Db;
        }
        
        .searchButton {
            width: 40px;
            height: 36px;
            border: 0.1rem solid #053742;
            background: #053742;
            text-align: center;
            color: #fff;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            font-size: 20px;
        }
        
        
        .wrap {
            width: 95%;
            position: relative;
            margin: auto;
            margin-top: 16px;
        
        }
        
        #myInput {
            color: #053742;
            font-family: Montserrat;
        }
        
        
        
        /* cards */
        
        .cards {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            display: flex;
            align-items: center;
            margin: 1rem auto 0 auto;
        }
        
        .card {
            flex: 1 0 33.33%;
            position: relative;
            margin: 0.75em;
            padding: 0 0.6rem;
            height: 5em;
            background: white;
            border: 0.05rem solid lightgrey;
            border-radius: 5px;
            font-family: Montserrat;
        
        }
        
        .active {
            box-shadow: 0px 12px 30px #00000016, 0px 2px 4px #1b044c1a;
        }
        
        /* This is where the magic happens */
        input[type="checkbox"] {
            position: absolute;
            top: .5em;
            left: .5em;
            display: inline-block;
            cursor: pointer;
        }
        
        @media (pointer: coarse) {
            input[type="checkbox"] {
                height: 1rem;
                width: 1rem;
            }
        }
        
        /* Use z-index to make it accessible to keyboard navigation */
        @media (hover: hover) {
            input[type="checkbox"] {
                z-index: -1
            }
        
            .card:hover input[type="checkbox"],
            input[type="checkbox"]:focus,
            input[type="checkbox"]:checked {
                z-index: auto
            }
        }
        
        .course-number {
            margin: 0.75rem 0;
            font-size: 0.7rem;
        }
        
        .course-name {
            margin: 0.75rem 0;
            font-size: 0.8rem;
        }
        
        
        
        /* modal - footer */
        .modal-footer {
            text-align: right;
        }
        
        /* footer button */
        .btn {
            border: none;
            /* Remove borders */
            color: white;
            /* Add a text color */
            width: 6rem;
            height: 2.5rem;
            padding: auto;
            /* Add some padding */
            cursor: pointer;
            /* Add a pointer cursor on mouse-over */
            font-family: "Blinker";
            margin: 0 0 0 1rem;
            border-radius: 5px;
        }
        
        .add {
            background-color: #053742;
        }
        
        .save {
            background-color: #053742;
        }
        
        .delete {
            float: left;
            background-color: red;
        }
        
        /* Green */
        .add:hover {
            background-color: #03232a;
            color:white;
        }
        
        
        
        .cancel {
            background-color: #e7e7e7;
            color: black;
        }
        
        /* Gray */
        .cancel:hover {
            background: #ddd;
        }
        
        select {
            margin-bottom: 10px;
            margin-top: 10px;
            font-family: Montserrat;
            outline: 0;
            box-shadow: 0px 12px 30px #00000016, 0px 2px 4px #1b044c1a;
            padding: 4px;
            border-radius: 9px;
        }
        
        </style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    
        <!-- title and close icon -->
        <div class="modal-header">
            <div class="header-content">
                <h1 class="section" id="add-course">Add course</h1>
            </div>
            <div class="header-close" id="button-close">
                <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true" onclick="close_add_board()"></i></button>
            </div>
        </div>
        <hr>
        <!-- choose course and return card -->
        <div class="modal-body">
            <div class="addCourse">
                <div class="title-group">
                    <h2 class="title-left">Choose course</h2>
                    <!--
                    <button type="submit" class="button-to-add-new">
                        + new course
                    </button>
                    -->
                </div>
                <!-- wraped searchbar -->
                <div class="wrap">
                    <div class="search">
                        <input type="text" id="myInput" class="searchTerm"
                            placeholder="Enter course name">
                        <button type="submit" class="searchButton" onclick="search_course()">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- return cards -->
            <div class="cards">

                <!-- <div class="card">
                    <input type="checkbox" />
                    <h6 class="course-number">COMP SCI 3001</h6>
                    <h6 class="course-name">CNA</h6>
                </div> -->

            </div>
            
            <div class="addTo">
                <div class="title-group">
                    <h2 class="title-left">Add to</h2>

                </div>
            </div>
            <div class="choose-degree">
                <form action="#">

                    <select name="Stream" id="stream" multiple size="6">
                        <optgroup label="Bachelor of Computer Science" id="BCS">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                        <optgroup label="Bachelor of Computer Science Advanced">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                        <optgroup label="Bachelor of Information Technology">
                            <option value="core">Core</option>
                            <option value="major-cybersecurity">Cybersecurity Major</option>
                            <option value="major-ai-ml">AI and ML Major</option>
                        </optgroup>
                        <optgroup label="Master of Cyber Security">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                        <optgroup label="Master of Computer Science">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                        <optgroup label="Master of Computing and Innovation">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                        <optgroup label="Master of Artificial Intelligence and Machine Learning">
                            <option value="core">Core</option>
                            <option value="elective">Elective</option>
                            <option value="project">Project</option>
                        </optgroup>
                    </select>
                </form>
            </div>
        <hr>
        <!-- footer : two buttons -->
        <div class="modal-footer">
            <button class="btn cancel" id="button-cancel" onclick="close_add_board()">Cancel</button>
            <button class="btn add" id="button-add" onclick="get_form_data()">Add</button>
        </div>
    </div>
    </div>

</div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend', innerHTML);

}

/* search course, create course card and then render */
function search_course() {
    document.getElementsByClassName('cards')[0].innerHTML = ""; // clear previous searching result

    let searchingValue = document.getElementById("myInput").value.toLowerCase().split(' ').join('-');
    fetch(`/search/search-course?course=${searchingValue}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            //console.log(data);
            return render_course(data);
        })

}
/* render the searched result */
function render_course(data) {
    //console.log(data);
    if (!data) return;
    courses_list = data;
    let course_card = "";
    for (let i = 0; i < courses_list.length; i++) {
        let course_subject_code = courses_list[i].course_subject_code;
        let course_name = courses_list[i].course_name;
        course_card += create_course_card(course_subject_code, course_name);
    }

    if (course_card === "") {
        course_card = `
        <div class="card" style="height:40px">
            <h6 class="course-number">No result</h6>
        </div>`;
    }
    document.getElementsByClassName('cards')[0].insertAdjacentHTML('beforeend', course_card);
}

/* create course cards to be rendered */
function create_course_card(course_subject_code, course_name) {
    // course_subject_code = "COMP SCI 0000";
    // course_name = "CCCCCC";
    let innerHTML = `
    <div class="card">
        <input type="checkbox" class="card-box" data-subj-code="${course_subject_code} " data-name="${course_name}" />
        <h6 class="course-number">${course_subject_code}</h6>
        <h6 class="course-name">${course_name}</h6>
    </div>`;

    return innerHTML;
}


/* The get* method are for getting the user selected data */
function get_form_data() {
    let selected_course = get_checkbox_data();
    let selected_degree_stream = get_option_data();
    console.log(selected_course);

    let form_data = {}
    form_data.selected_course = selected_course;
    form_data.selected_degree_stream = selected_degree_stream;

    send_form(form_data);
    close_add_board();
    location.reload(); //reload the page
}

/* send data to backend */
function send_form(form_data) {
    let response = request('/add-course', 'POST', form_data);
    response.then(res => { console.log('response :>> ', res) });
    return;
}

/* get courses that are selected */
function get_checkbox_data() {
    let boxes = document.getElementsByClassName('card-box');
    let selected_course = [];

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            selected_course.push({
                course_subject_code: `${boxes[i].getAttribute('data-subj-code')}`,
                course_name: `${boxes[i].getAttribute('data-name')}`
            });
        }
    }
    //console.log(selected_course)
    return selected_course;
}

/* get degree - stream that are selected */
function get_option_data() {
    let optgroups = document.getElementsByTagName('optgroup');
    let selected_degree_stream = [];
    for (let i = 0; i < optgroups.length; i++) {
        let temp = {};
        temp.degree_name = optgroups[i].label;
        temp.streams = [];

        for (let j = 0; j < optgroups[i].children.length; j++) {
            if (optgroups[i].children[j].selected)
                temp.streams.push(optgroups[i].children[j].value);
        }

        selected_degree_stream.push(temp);
    }
    return selected_degree_stream;
}

