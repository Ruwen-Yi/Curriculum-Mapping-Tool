function search_course(){
    let searched_course = document.getElementById('search-bar').value;
    console.log(searched_course);
    window.open(`/search?all-categories=${searched_course}`, '_blank').focus();
}