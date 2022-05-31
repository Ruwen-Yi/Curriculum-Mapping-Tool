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