async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    const artist = document.querySelector('#post-artist').value;
    const album_title = document.querySelector('#post-album').value;
    const genre = document.querySelector('#post-genre').value;
    const photo_url = document.querySelector('#post-photo').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            artist,
            album_title,
            genre,
            photo_url
          }),
          headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/profile/user');
    } else {
        alert(response.statusText);
    }
  
  }
  
  document.querySelector('.add-post-form').addEventListener('submit', editFormHandler);