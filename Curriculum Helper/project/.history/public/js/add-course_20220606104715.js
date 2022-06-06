function add_course() {
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
        
            <!-- title and close icon -->
            <div class="modal-header">
                <div class="header-content">
                    <h1 class="section" id="add-course">Add course</h1>
                </div>
                <div class="header-close" id="button-close">
                    <button class="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
                </div>
            </div>
            <hr>
            <!-- choose course and return card -->
            <div class="modal-body">
                <div class="addCourse">
                    <div class="title-group">
                        <h2 class="title-left">Choose course</h2>
                        <button type="submit" class="button-to-add-new">
                            + new course
                        </button>

                    </div>
                    <!-- wraped searchbar -->
                    <div class="wrap">
                        <div class="search">
                            <input type="text" id="myInput" onkeyup="mySearchFunction()" class="searchTerm"
                                placeholder="Course name or number">
                            <button type="submit" class="searchButton">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- return cards -->
                <div class="cards">
                    <div class="card">
                        <input type="checkbox" />
                        <h6 class="course-number">COMP SCI 3001</h6>
                        <h6 class="course-name">Artificial Intelligence and Machine Learning Research Project Part A
                        </h6>
                    </div>

                    <div class="card">
                        <input type="checkbox" />
                        <h6 class="course-number">COMP SCI 3001</h6>
                        <h6 class="course-name">CNA</h6>
                    </div>

                    <!-- <div class="card">
                        <input type="checkbox" />
                    </div>

                    <div class="card">
                        <input type="checkbox" />
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
                            <optgroup label="Bachelor of Computer Science">
                                <option value="BCS-core">Core</option>
                                <option value="BCS-elective">Elective</option>
                                <option value="BCS-Project">Project</option>
                            </optgroup>
                            <optgroup label="Bachelor of Computer Science (Advanced)">
                                <option value="BCSA-core">Core</option>
                                <option value="BCSA-elective">Elective</option>
                                <option value="BCSA-Project">Project</option>
                            </optgroup>
                            <optgroup label="Bachelor of Information Technology">
                                <option value="BIT-core">Core</option>
                                <option value="BIT-cs-major">Cybersecurity Major</option>
                                <option value="BIT-AIML-major">AI and ML Major</option>
                            </optgroup>
                            <optgroup label="Master of Cyber Security">
                                <option value="MCyS-core">Core</option>
                                <option value="MCyS-elective">Elective</option>
                                <option value="MCyS-Project">Project</option>
                            </optgroup>
                            <optgroup label="Master of Computing and Innovation">
                                <option value="MCI-core">Core</option>
                                <option value="MCI-elective">Elective</option>
                                <option value="MCI-Project">Project</option>
                            </optgroup>
                            <optgroup label="Master of Artificial Intelligence and Machine Learning">
                                <option value="MAIML-core">Core</option>
                                <option value="MAIML-elective">Elective</option>
                                <option value="MAIML-Project">Project</option>
                            </optgroup>
                        </select>
                    </form>
                </div>
            <hr>
            <!-- footer : two buttons -->
            <div class="modal-footer">
                <button class="btn cancel" id="button-cancel">Cancel</button>
                <button class="btn add" id="button-add">Add</button>
            </div>
        </div>
        </div>

    </div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend', innerHTML);

}