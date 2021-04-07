//ADD VORE
async function upvoteClickHandler(event) {
    event.preventDefault()
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log(id)
  
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to vote on this post... Please try again.");
      }
  }


  
  document.querySelector('.vote-btn').addEventListener('click', upvoteClickHandler);
  
