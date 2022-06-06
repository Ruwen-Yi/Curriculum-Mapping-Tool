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
    <div id="edit_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; z-index:10;">
        <div style="width: 700px; height: 400px; background-color: white;">

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
                <button class="btn cancel" id="button-cancel">Cancel</button>
                <button class="btn save" id="button-save">Save changes</button>
            </div>
            Edit Board: </br>
            -----Code & Name: </br>
            ${JSON.stringify(a_course.course_subject_code)} </br>
            ${JSON.stringify(a_course.course_name)}  </br>

            -----Belongs to:  </br>
            ${JSON.stringify(a_course.belongs_to)}  </br>

            -----Pre_requisite:  </br>
            ${JSON.stringify(a_course.pre_requisite)}  </br>

            -----Incompatible:  </br>
            ${JSON.stringify(a_course.incompatible)}  </br>
            <button onclick="close_edit_board()">
                Cancel
            </button>
        </div>
    </div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend',innerHTML);

}

function close_edit_board(){
    let edit_board = document.getElementById('edit_board');
    if (edit_board) edit_board.remove();
}