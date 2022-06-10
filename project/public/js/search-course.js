function search_course(){
    let searched_course = document.getElementById('search-bar').value;
    console.log(searched_course);
    window.open(`/search?course-name=${searched_course}`, '_blank').focus();
}