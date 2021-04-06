async function filterGenre(event) {
    event.preventDefault();

    var genreVal = document.querySelector('#post-genre').value;

    if (genreVal === "All") {
        document.location.replace(`/`);
    }

    else {
        document.location.replace(`/${genreVal}`);
    }
}

document.querySelector('#filter-genre').addEventListener('click', filterGenre);