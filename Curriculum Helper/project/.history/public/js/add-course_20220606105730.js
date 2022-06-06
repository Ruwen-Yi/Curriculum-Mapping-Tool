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
    `

    document.getElementById('degree-section').insertAdjacentHTML('afterend', innerHTML);

}