function add_course() {
    close_add_board();
    show_add_board();
}

function close_add_board() {
    let add_board = document.getElementById('add_board');
    if (add_board) add_board.remove();
}


function show_add_board(){

    let innerHTML=`
    <div id="add_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; z-index:10;">
        <div style="width: 700px; height: 400px; background-color: white;">
            Add Course Board: </br>
            -----search a course: </br>
            </br>

            -----add this course: </br>
            </br>

            <button onclick="close_add_board()">
                Cancel
            </button>
        </div>
    </div>`

    document.getElementById('degree-section').insertAdjacentHTML('afterend',innerHTML);

}