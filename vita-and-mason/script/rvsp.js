document.getElementById('customForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting immediately

  // Create a new FormData object from the form
  var formData = new FormData(this);

  // Submit the form data using fetch (asynchronous)
  fetch(this.action, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (response.ok) {
          // Redirect to a custom page after the form is successfully submitted
          window.location.href = 'success.html';  // Replace with your custom page URL
      } else {
          // Handle the error if the submission fails
          alert('There was an error submitting the form. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
  });
});

const code = document.getElementById("code");
const codeForm = document.getElementById("codeForm");
const rehearsal= document.getElementById("rehearsal");
const rehearsalField = document.getElementById("rehearsalField");
const rvspForm = document.getElementById("rvsp")
const warning = document.getElementById("warning");

document.getElementById('codeButton').onclick = function() {
  if (code.value == 1) {
    rvspForm.style.display = "flex";
    codeForm.style.display = "none";
    rehearsalField.required = false;  // Make it not required
  } else if (code.value == 2) {
    rvspForm.style.display = "flex";
    codeForm.style.display = "none";
    rehearsal.style.display = "flex";
  } else {
    warning.style.visibility = "visible";
  }
};