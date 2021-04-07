//DELETE VOTE
async function downvoteClickHandler(event) {
    event.preventDefault()


    console.log('hello');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(id)

    const response = await fetch(`/api/posts/upvote?post_id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });
        
        if (response.ok) {
        document.location.reload();
        } else {
        alert("Failed to remove vote on this post... Please try again.");
        }
}

document.querySelector('.unvote-btn').addEventListener('click', downvoteClickHandler);