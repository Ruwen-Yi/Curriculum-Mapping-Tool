/* Once a edit-icon is clicked, a edit board will show up */
var stream_name;
function edit_course(fullname, clicked_element) {
    close_edit_board();

    fetch(`/course-relationships/${fullname.split(' ').join('-')}/getRelationship`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            let a_course = JSON.parse(data);
            a_course = JSON.stringify(a_course);

            show_edit_board(a_course);
            get_stream_name(clicked_element);
            add_click_listener();
        })
        .catch(err => {
            console.log(err);
        })
}

/* get the stream name where a course is edited */
function get_stream_name(element) {
    stream_name = element.parentNode.parentNode.parentNode.children[0].children[1].textContent.replace(/\s/g, '')
    console.log(stream_name);
}

function show_edit_board(a_course) {
    a_course = JSON.parse(a_course);

    let innerHTML = `
    <div id="edit_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; background-color: rgba(0, 0, 0, 0.3);z-index:10;text-align: center;">
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
        

        
        .save {
            background-color: #053742;
        }

        .save:hover{
            background-color: #03232a;
            color:white;
        }
        
        .delete {
            float: left;
            background-color: red;
        }
        .delete:hover{
            background-color: #c43b3b;
            color:white;
        }
        
        /* Green */
        .add:hover {
            background-color: #03232a;
        }
        
        
        
        .cancel {
            background-color: #e7e7e7;
            color: black;
        }
        
        /* Gray */
        .cancel:hover {
            background: #ddd;
        }
        
        .modal-body{
            padding:0.5rem 0;
        }
        .module {
            text-align: left;
            font-family: Montserrat;
        
        }
        
        .c-attribute {
            display: inline-block;
            margin: 0 0 1.5rem;
            font-size: 1rem;
            color: #053742;
        }
        
        .c-info {
            display: inline-block;
            font-size: 0.9rem;
            margin: 0 0 1.5rem;
        }
        
        .c-attribute-2 {
            display: inline-block;
            margin: 0 0 0.5rem;
            font-size: 1rem;
            color: #053742;
        }
        
        .c-info-2 {
            padding: 0 5%;
            font-size: 0.9rem;
            margin: 0 0 1rem;
            line-height: 1.5;
        }
        
        .edit-btn {
            border-style: none;
            background-color: #fff;
            margin-top: 3px;
            float: right;
            cursor: pointer;
            color: #053742;
        }
        
        [contenteditable]:focus {
            outline: 2px solid darkgrey;
        }
        
        </style>

                <div class="modal-header">
                <div class="header-content">
                    <h1 class="section" id="edit-course">Edit course</h1>
                </div>
                <div class="header-close" id="button-close">
                    <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true" onclick="close_edit_board()"></i></button>
                </div>
            </div>
            <hr>
            <!-- editable content -->
            <div class="modal-body">
                <!-- separate into two columns -->

                <div class="module c-num">
                    <h5 class="c-attribute">
                        Course number :
                    </h5>
                    <p class="c-info" id="c-number">${JSON.stringify(a_course.course_subject_code).replace(/["]+/g, '')}
                    </p>
                    <!-- <button class="edit-btn" id="btn-c-num"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button> -->
                </div>
                <div class="module c-name">
                    <h5 class="c-attribute">
                        Course name :
                    </h5>
                    <p class="c-info" id="c-name">${JSON.stringify(a_course.course_name).replace(/["]+/g, '')}</p>
                    <!-- <button class="edit-btn" id="btn-c-name"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button> -->
                </div>

                <div class="module c-prerequisite">
                    <h5 class="c-attribute-2">
                        Prerequisite courses :
                    </h5>
                    <button class="edit-btn" id="btn-c-pre"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button>
                    <p class="c-info-2" id="c-pre" contenteditable="false">${JSON.stringify(a_course.pre_requisite).replace(/["]+/g, '')}
                    </p>

                </div>

                <div class="module c-incompatible">
                    <h5 class="c-attribute-2">
                        Incompatible courses :
                    </h5>
                    <button class="edit-btn" id="btn-c-incom"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button>
                    <p class="c-info-2" id="c-incom" contenteditable="false">${JSON.stringify(a_course.incompatible).replace(/["]+/g, '')}</p>

                </div>
            </div>
            <hr>
            <!-- footer : three buttons -->
            <div class="modal-footer">
                <button class="btn delete" id="button-delete">Delete</button>
                <button class="btn cancel" id="button-cancel" button onclick="close_edit_board()">Cancel</button>
                <button class="btn save" id="button-save">Save</button>
            </div>
           
        </div>
    </div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend', innerHTML);
}

function close_edit_board() {
    let edit_board = document.getElementById('edit_board');
    if (edit_board) edit_board.remove();
}

//click edit button to make contenteditable, will combine into one function later
function add_click_listener() {
    $("#btn-c-pre").click(function () {
        if ($("#c-pre").attr("contenteditable") == "false") {
            $("#c-pre").attr("contenteditable", "true");
            $("#c-pre").focus();
            $("#btn-c-pre").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
        } else {
            $("#c-pre").attr("contenteditable", "false");
            $("#btn-c-pre").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
        }
    });

    $("#btn-c-incom").on("click", function () {
        if ($("#c-incom").attr("contenteditable") == "false") {
            $("#c-incom").attr("contenteditable", "true");
            $("#c-incom").focus();
            $("#btn-c-incom").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
        } else {
            $("#c-incom").attr("contenteditable", "false");
            $("#btn-c-incom").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
        }
    });

    document.getElementById('button-save').onclick = () => {
        let form_data = get_edit_form_data(false);
        let response = request('/edit-course', 'POST', form_data);
        response.then(res => { console.log('response :>> edit', res) });

        location.reload();
        return;
    }

    document.getElementById('button-delete').onclick = () => {
        let form_data = get_edit_form_data(true);
        let response = request('/edit-course', 'POST', form_data);
        response.then(res => { console.log('response :>> delete', res) });

        location.reload();
        return;
    }
}

/* collect form data */
function get_edit_form_data(if_delete) {
    let edit_form_data = {};

    edit_form_data.delete = if_delete;
    edit_form_data.degree = document.getElementById('academic-degree-name').innerHTML;
    edit_form_data.stream = stream_name;
    edit_form_data.course_subject_code = document.getElementById("c-number").innerText;
    edit_form_data.course_name = document.getElementById("c-name").innerText;
    edit_form_data.pre_requisite = document.getElementById("c-pre").innerText;
    edit_form_data.incompatible = document.getElementById("c-incom").innerText;
    console.log(edit_form_data);

    return edit_form_data;
}