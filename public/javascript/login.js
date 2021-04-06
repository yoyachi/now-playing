async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/profile/user');
      } else {
        alert("Login failed... Double check your username and password and try again.");
      }
    }
  }
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);