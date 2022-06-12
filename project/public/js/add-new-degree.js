window.onload = () => {
    close_add_degree_board();
    let add_degree_button = document.getElementById('add-new-degree-btn')
    add_degree_button.addEventListener('mouseover', () => {
        add_degree_button.style.cursor = "pointer";
    })
    add_degree_button.onclick = () => {
        show_add_degree_board();
    }

}

function show_add_degree_board() {
    let innerHTML = `
    <div id="add_degree_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; z-index:10;">
        <div style="position: relative; left: -13%; width: 700px; height: auto; background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); padding: 0.5rem 2rem; border-radius: 0.5rem;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); max-width: 100%;overflow-y: hidden;overflow-x: hidden;font-family: "Blinker";"">
            
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
            font-size: 1rem;
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

        .modal-body{
            margin:10% 5%;
        }
        
        label {
            width: 23%;
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
        </style>

            <!-- title and close icon -->
            <div class="modal-header">
                <div class="header-content">
                    <h1 class="section">Add new degree</h1>
                </div>
                <div class="header-close" id="button-close" onclick="close_add_degree_board()">
                    <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
                </div>
            </div>
            <hr>
            <!-- editable content -->
            <div class="modal-body">
                <style>
                    .add_degree_level {
                        display: flex;
                        margin-top: 1rem;
                        margin-right: 0px;
                        margin-bottom: 1rem;
                        margin-left: 21px;
                    }
                    .level-option {
                        width: 7em;
                    }
                    .level_options {
                        margin-left: 46px;
                    }
                </style>
                <div class="add_degree_level">
                    <span>Degree level:</span>
                    <div class="level_options">
                        <label class="level-option">
                            <input type="radio" class="selected-level" name="degree-level" value="Bachelor" checked>Bachelor
                        </label>
                        <label class="level-option">
                            <input type="radio" class="selected-level" name="degree-level" value="Master">Master
                        </label>
                    </div>
                </div>

                <form>
                    <div class="form">
                        <label for="course-num">Degree name: </label>
                        <input type="text" id="degree-name" name="" class="box1" autocomplete="off">
                    </div>
                </form>

                <style>
                    .add_streams {
                        display: flex;
                        margin-top: 1rem;
                        margin-right: 0px;
                        margin-bottom: 1rem;
                        margin-left: 21px;
                    }
                    .stream_option {
                        width: 6em;
                    }
                    .stream_options {
                        margin-left: 44px;
                    }
                </style>
                <div class="add_streams">
                    <span>Add streams:</span>
                    <div class="stream_options">
                        <label class="stream_option" style="pointer-events: none;">
                            <input type="checkbox" class="selected_stream" name="stream" value="core" checked style="pointer-events: none;">Core
                        </label>
                        <label class="stream_option">
                            <input type="checkbox" class="selected_stream" name="stream" value="elec">Elective
                        </label>
                        <label class="stream_option">
                            <input type="checkbox" class="selected_stream" name="stream" value="project">Project
                        </label>
                        <!-- <label class="stream_option">
                            <input type="checkbox" class="selected_stream" name="stream" value="major">Major
                        </label> -->
                    </div>
                </div>
            </div>
            <hr>
            
        <!-- footer : two buttons -->
        <div class="modal-footer">
            <button class="btn cancel" id="button-cancel" onclick="close_add_degree_board()">Cancel</button>
            <button class="btn save" id="button-add-new" onclick="send_add_new_degree_form()">Add</button>
        </div>
        </div>
    </div>`

    document.getElementsByClassName('overlap-group')[0].insertAdjacentHTML('afterbegin', innerHTML);
}

function send_add_new_degree_form() {
    let new_degree = get_add_new_degree_form();
    console.log(new_degree);

    let response = request('/add-new-degree', 'POST', new_degree);
    response.then(res => { console.log('response :>> ', res) });
    close_add_degree_board();
    location.reload(); //reload the page
    return;
}

function get_add_new_degree_form() {
    let new_degree = {};

    let level_options = document.getElementsByClassName('selected-level');
    let degree_level = "";
    for (i = 0; i < level_options.length; i++) {
        if (level_options[i].checked)
            degree_level = level_options[i].value;
    }

    new_degree.new_degree_name = `${degree_level} of ${document.getElementById('degree-name').value}`;

    let stream_options = document.getElementsByClassName('selected_stream');
    let stream = [];
    for (i = 0; i < stream_options.length; i++) {
        if (stream_options[i].checked)
            stream.push(stream_options[i].value);
    }
    new_degree.stream = stream;

    return new_degree;
}

function close_add_degree_board() {
    let add_degree_board = document.getElementById('add_degree_board');
    if (add_degree_board) add_degree_board.remove();
}