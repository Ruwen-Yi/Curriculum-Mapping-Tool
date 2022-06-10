function add_delete_button() {
    let footer = document.getElementsByClassName('app-bottom')[0];
    let innerHTML = `
    <div style="z-index:1000; width=100%;margin-top: 56px; display:flex; justify-content:space-between;">
        <button class="blinker-semi-bold-storm-gray-20px" style="margin-left: 43em; height:3em; width:10em;" onclick="delete_degree()">
            Delete This Degree
        </button>
    </div>
    `
    footer.insertAdjacentHTML('beforebegin', innerHTML);
}

function delete_degree() {
    let result = if_delete_degree();
    if (result) {
        let degree_name = document.getElementById('academic-degree-name').innerHTML;
        let form_data = {delete:true, degree_name:degree_name}
        
        let response = request('/delete-degree', 'POST', form_data);
        response.then(res=>{
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