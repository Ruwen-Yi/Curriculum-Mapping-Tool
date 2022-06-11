
function delete_stream(stream_name) {
    let form_data = {};
    form_data.degree_name = document.getElementById('academic-degree-name').innerHTML;
    form_data.stream = stream_name;

    let question = "Are you sure to delete this stream?"
    let result = confirm(question);

    if (result) {
        console.log(form_data)
        let response = request('/delete-stream', 'POST', form_data);
        response.then(res=>{console.log('response :>> delete', res)});
        location.reload();
    }
}

// function remove_delete_stream_button(){
//     let btn = document.getElementsByClassName('delete_stream_button')[0];
//     if (btn)
//         btn.remove()
// }