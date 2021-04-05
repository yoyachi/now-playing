async function filterGenre(event) {
    event.preventDefault();

    var genreVal = document.querySelector('#post-genre').value;

    document.location.replace(`/${genreVal}`);
}

document.querySelector('#genre-form').addEventListener('submit', filterGenre);