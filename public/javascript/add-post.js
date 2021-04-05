async function newFormHandler(event) {
    event.preventDefault();

    console.log('hello');
    const artist = document.querySelector('#post-artist').value;
    const album_title = document.querySelector('#post-album').value;
    const genre = document.querySelector('#post-genre').value;
    const year = document.querySelector('#post-year').value;
    const format = document.querySelector('#post-format').value;
    const photo_url = document.querySelector('#post-photo').value;
    const description = document.querySelector('#post-description').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        artist,
        album_title,
        genre,
        year,
        format,
        photo_url,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/profile/user');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.add-post-form').addEventListener('submit', newFormHandler);