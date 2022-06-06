/* Once a edit-icon is clicked, a edit board will show up */
function edit_course(fullname){
    
    close_edit_board();

    fetch(`/course-relationships/${fullname.split(' ').join('-')}/getRelationship`)
    .then(response=>{
        return response.text();
    })
    .then(data=>{
        let a_course = JSON.parse(data);
        a_course = JSON.stringify(a_course);

        show_edit_board(a_course);
        
    })
    .catch(err=>{
        console.log(err);
    })
}

function show_edit_board(a_course){
    a_course = JSON.parse(a_course);
    console.log(a_course)

    let innerHTML=`
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

                <div class="modal-header">
                <div class="header-content">
                    <h1 class="section" id="edit-course">Edit course</h1>
                </div>
                <div class="header-close" id="button-close">
                    <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
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
                    <p class="c-info" id="c-number">COMP SCI 7315
                    </p>
                    <!-- <button class="edit-btn" id="btn-c-num"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button> -->
                </div>
                <div class="module c-name">
                    <h5 class="c-attribute">
                        Course name :
                    </h5>
                    <p class="c-info" id="c-name">Computer Vision</p>
                    <!-- <button class="edit-btn" id="btn-c-name"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button> -->
                </div>

                <div class="module c-prerequisite">
                    <h5 class="c-attribute-2">
                        Prerequisite courses :
                    </h5>
                    <button class="edit-btn" id="btn-c-pre"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button>
                    <p class="c-info-2" id="c-pre" contenteditable="false">COMP SCI 7103, COMP SCI 7202, COMP SCI
                        7202B,
                        COMP SCI 7208 or COMP SCI 7211 COMP SCI 7208 or COMP SCI 7211 COMP SCI 7208 or COMP SCI 7211
                    </p>

                </div>

                <div class="module c-incompatible">
                    <h5 class="c-attribute-2">
                        Incompatible courses :
                    </h5>
                    <button class="edit-btn" id="btn-c-incom"><i class="fa fa-pencil-square-o fa-lg"
                            aria-hidden="true"></i></button>
                    <p class="c-info-2" id="c-incom" contenteditable="false">None</p>

                </div>
            </div>
            <hr>
            <!-- footer : three buttons -->
            <div class="modal-footer">
                <button class="btn delete" id="button-delete">Delete</button>
                <button class="btn cancel" id="button-cancel" button onclick="close_edit_board()">Cancel</button>
                <button class="btn save" id="button-save">Save changes</button>
            </div>
           
        </div>
    </div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend',innerHTML);

}

function close_edit_board(){
    let edit_board = document.getElementById('edit_board');
    if (edit_board) edit_board.remove();
}

// Edit Board: </br>
// -----Code & Name: </br>
// ${JSON.stringify(a_course.course_subject_code)} </br>
// ${JSON.stringify(a_course.course_name)}  </br>

// -----Belongs to:  </br>
// ${JSON.stringify(a_course.belongs_to)}  </br>

// -----Pre_requisite:  </br>
// ${JSON.stringify(a_course.pre_requisite)}  </br>

// -----Incompatible:  </br>
// ${JSON.stringify(a_course.incompatible)}  </br>
// <button onclick="close_edit_board()">
//     Cancel
// </button>