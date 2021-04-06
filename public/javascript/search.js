async function searchForm(event) {
    event.preventDefault();

    const searchFor = document.querySelector('#search-for').value;
    const searchInput = document.querySelector('#search-form-input').value;

    if (searchFor && searchInput) {
        document.location.replace(`/search?name=${searchFor}&input=${searchInput}`);
    }
    
    
}

document.querySelector('#search-form').addEventListener('submit', searchForm);