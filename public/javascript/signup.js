// SIGN UP FORM
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const location = document.querySelector('#location-signup').value.trim();
    const bio = '';

  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          location,
          bio
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        document.location.replace('/profile/user');
      } else {
        alert("Failed to Sign Up. Please check that your input info is valid and try again.");
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);