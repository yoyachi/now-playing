function addBioForm() {
    var addBioForm = document.createElement("form");
    var textArea = document.createElement("textarea");
    var submitButton = document.createElement("button");

    var existingButton = document.querySelector('#add-bio');

    addBioForm.setAttribute('class', 'row flex-column w-50')

    submitButton.textContent = 'Submit';
    submitButton.setAttribute('class', 'btn btn-primary align-self-center');
    submitButton.setAttribute('type', 'submit');
    addBioForm.appendChild(textArea);
    addBioForm.appendChild(submitButton);

    document.querySelector('#bioInfo').replaceChild(addBioForm, existingButton);

    document.querySelector('#bioInfo').addEventListener('submit', addBio);
}

async function addBio(event) {
    event.preventDefault();

    var newBio = document.querySelector('textarea').value;
    var id = document.querySelector('.userIdAccess').id;

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          bio: newBio
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

document.querySelector('#add-bio').addEventListener('click', addBioForm);