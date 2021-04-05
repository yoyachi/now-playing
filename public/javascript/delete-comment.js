async function deleteComment() {
    if (confirm('Are you sure you want to delete this comment?')) {
        let comment = event.target.id;
        console.log('yes!');

    const response = await fetch(`/api/comments/${comment}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    } else {
        console.log('no!');
    }
    
    
}

