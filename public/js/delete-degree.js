function add_delete_button() {
    let footer = document.getElementsByClassName('app-bottom')[0];
    let innerHTML = `
    <div style=" width:100%; margin-top:100px; display:flex; justify-content:space-around;font-family: 'Blinker';">
        <style>
        .degree-delete{
            background-color:#053742;
            border:none;
            margin-bottom: 3rem
        }
        </style>
        <button type="button" class="btn btn-danger degree-delete" onclick="delete_degree()" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete this degree" style="margin-bottom:70px">
        <i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;Delete degree
        </button>
    </div>
    `
    footer.insertAdjacentHTML('beforebegin', innerHTML);
}

function delete_degree() {
    let result = if_delete_degree();
    if (result) {
        let degree_name = document.getElementById('academic-degree-name').innerHTML;
        let form_data = { delete: true, degree_name: degree_name }

        let response = request('/delete-degree', 'POST', form_data);
        response.then(res => {
            console.log('response :>> ', res);
            window.location.replace('/');
        });
    }
}
function if_delete_degree() {
    let question = "Are you sure to delete this degree?"
    let result = confirm(question);
    return result;
}