async function filterGenre(event) {
    event.preventDefault();

    var genre = document.querySelector('#post-genre').value;
    var value = document.querySelector(`option[value='${genre}']`).id;

    // switch(value) {
    //     case 'genres':
    //         document.location.replace(`/${genre}?optgroup=${value}`);
    //         break;
    //     case 'decades':
    //         document.location.replace(`/${genre}?optgroup=${value}`);
    //         break;
    //     case 'formats':
    //         document.location.replace(`/${genre}?optgroup=${value}`);
    //         break;

    // }
    if (genre === "All") {
        document.location.replace(`/`);
    }

    else {
        document.location.replace(`/${genre}?optgroup=${value}`);
    }
}

document.querySelector('#filter-genre').addEventListener('click', filterGenre);