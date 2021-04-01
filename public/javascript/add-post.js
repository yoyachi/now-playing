async function newFormHandler(event) {
    event.preventDefault();
  
    const artist = document.querySelector('input[name="post-artist"]').value;
    const album_title = document.querySelector('input[name="post-album"]').value;
    const genre = document.querySelector('input[name="post-genre"]').value;
    const photo_url = document.querySelector('input[name="post-photo"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        artist: artist,
        album_title: album_title,
        genre: genre,
        photo_url: photo_url
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