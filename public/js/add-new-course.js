function add_new_course() {
    close_add_board();
    show_add_board();
}

function close_add_board() {
    let add_board = document.getElementById('add_board');
    if (add_board) add_board.remove();
}


function show_add_board() {

    let innerHTML = `
    <div id="add_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; background-color: rgba(0, 0, 0, 0.3);z-index:10;text-align: center;">
        <div style="width: 700px; height: 400px; background-color: white;padding: 0.5rem 2rem;border-radius: 0.5rem; max-width: 100%;overflow-y: scroll;overflow-x: hidden;font-family: "Blinker";">
        <style>
        @import url("https://fonts.googleapis.com/css?family=Blinker:400,300,700,600");
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
        
        * {
            box-sizing: border-box;
        }
        
        
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

        .form {
            margin: 1rem 0;
            font-family: "Blinker";
        }
        
        label {
            width: 30%;
            text-align: left;
            vertical-align: top;
            display: inline-block;
        }
        
        .box1 {
            width: 69%;
        
            border-radius: 3px;
            border: 1px solid darkgrey;
            font-family: Montserrat;
        }
        
        .box2 {
            width: 69%;
            height: 4rem;
            font-family: Montserrat;
            border-radius: 3px;
            border: 1px solid darkgrey;
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

        .delete {
            float: left;
            background-color: red;
        }

        /* Green */
        .save:hover {
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
        </style>

        <!-- title and close icon -->
        <div class="modal-header">
            <div class="header-content">
                <h1 class="section" >Add new course</h1>
            </div>
            <div class="header-close" id="button-close" onclick="close_add_board()">
                <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
            </div>
        </div>
        <hr>
        <!-- editable content -->
        <div class="modal-body">
            <!-- separate into two columns -->
            <form>
                <div class="form">
                    <label for="course-num">Course number : </label>
                    <input type="text" id="course-num" name="" class="box1">
                </div>

                <div class="form">
                    <label for="course-name">Course name : </label>
                    <input type="text" id="course-name" name="" class="box1">
                </div>

                <div class="form">
                    <label for="course-pre">Prerequisite course : </label>
                    <textarea id="course-pre" name="" placeholder="" class="box2"></textarea>
                </div>

                <div class="form">
                    <label for="course-incom">Incompatible courses : </label>
                    <textarea id="course-incom" name="" placeholder="" class="box2"></textarea>
                </div>
            </form>

        </div>
        <hr>
        <!-- footer : two buttons -->
        <div class="modal-footer">
            <button class="btn cancel" id="button-cancel" onclick="close_add_board()">Cancel</button>
            <button class="btn save" id="button-add-new" onclick="get_add_form_data()">Add</button>
        </div>
    </div>
    </div>`

    document.getElementsByClassName('main-part')[0].insertAdjacentHTML('afterend', innerHTML);

}

function get_add_form_data() {
    let new_course = {};
    let course_code = document.getElementById('course-num').value;
    new_course.course_subject_code = `COMP SCI ${course_code}`;
    new_course.course_name = document.getElementById('course-name').value;
    new_course.pre_requisite = document.getElementById('course-pre').value;
    new_course.incompatible = document.getElementById('course-incom').value;

    send_form_data(new_course);
}

function send_form_data(new_course) {
    let response = request('/add-new-course', 'POST', new_course);
    response.then(res => { console.log('response :>> add_new', res) });

    //location.reload();
    return;
}
