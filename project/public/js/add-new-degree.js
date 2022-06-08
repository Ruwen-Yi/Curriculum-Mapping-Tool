window.onload = ()=>{
    close_add_degree_board();
    let add_degree_button = document.getElementById('add-new-degree-btn')
    add_degree_button.addEventListener('mouseover',()=>{
        add_degree_button.style.cursor = "pointer";
    })
    add_degree_button.onclick = ()=>{
        show_add_degree_board();
    }

}

function show_add_degree_board() {
    let innerHTML=`
    <div id="add_degree_board" style="position: fixed; display: flex; width: 100%; height: 100%; justify-content: center; align-items:center; z-index:10;">
        <div style="position: relative; left: -9%; width: 700px; height: 400px; background-color: white;">
            Add new degree Board: </br>
            </br>
            <button onclick="close_add_degree_board()">
                Close
            </button>
        </div>
    </div>`

    document.getElementsByClassName('overlap-group')[0].insertAdjacentHTML('afterbegin',innerHTML);
}

function close_add_degree_board() {
    let add_degree_board = document.getElementById('add_degree_board');
    if (add_degree_board) add_degree_board.remove();
}