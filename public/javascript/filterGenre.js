async function filterGenre(event) {
    event.preventDefault();

    var filter = document.querySelector('#post-genre').value;
    var value = document.querySelector(`option[value='${filter}']`).id;

   
    if (filter === "All") {
        document.location.replace(`/`);
    }

    else {
        document.location.replace(`/${filter}?optgroup=${value}`);
            
    }
}


document.querySelector('#filter-genre').addEventListener('click', filterGenre);