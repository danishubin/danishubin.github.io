// Get the hamburger and menu elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open the menu
hamburgerBtn.addEventListener('click', (e) => {
    sideMenu.classList.add('active');
    hamburgerBtn.style.zIndex = "-1";

    // Stop propagation to prevent triggering the document click listener
    e.stopPropagation();
});

// Close the menu via the close button
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "1";
});

// Close the menu if clicking outside of it
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && e.target !== hamburgerBtn) {
        sideMenu.classList.remove('active');
        hamburgerBtn.style.zIndex = "1";
    }
});

// Prevent clicks inside the menu from propagating to the document
sideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});


const codeForm = document.getElementById("codeForm");
const rehearsal= document.getElementById("rehearsal");
const rehearsalField = document.getElementById("rehearsalField");
const rvspForm = document.getElementById("rvsp")
const warning = document.getElementById("warning");

let param = (document.URL.split('?')[1]).split("=")[1];

if (param == 2) {
  rvspForm.style.display = "flex";
  rehearsal.style.display = "flex";
} else {
  rvspForm.style.display = "flex";
  rehearsalField.required = false;  // Make it not required
}

document.getElementById('customForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting immediately

  
  // Show loading screen
  document.getElementById('loadingScreen').style.display = 'block';
  rvspForm.style.display = "none";

  // Create a new FormData object from the form
  var formData = new FormData(this);

  // Submit the form data using fetch (asynchronous)
  fetch(this.action, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      // Hide loading screen
      document.getElementById('loadingScreen').style.display = 'none';

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

      // Hide loading screen
      document.getElementById('loadingScreen').style.display = 'none';
      alert('There was an error submitting the form. Please try again.');
  });
});

// document.getElementById('codeButton').onclick = function() {
//   if (code.value == 1) {
//     rvspForm.style.display = "flex";
//     codeForm.style.display = "none";
//     rehearsalField.required = false;  // Make it not required
//   } else if (code.value == 2) {
//     rvspForm.style.display = "flex";
//     codeForm.style.display = "none";
//     rehearsal.style.display = "flex";
//   } else {
//     warning.style.visibility = "visible";
//   }
// };

let code = (document.URL.split('?')[1]).split("=")[1].split("#")[0];

document.getElementById("mainLink").href = "index.html?code=" + code +"#main";
document.getElementById("dateLink").href = "index.html?code=" + code +"#date";
document.getElementById("scheduleLink").href = "index.html?code=" + code +"#schedule";
document.getElementById("storyLink").href = "index.html?code=" + code +"#story";
document.getElementById("tidbitsLink").href = "index.html?code=" + code +"#tidbits";
document.getElementById("infoLink").href = "index.html?code=" + code +"#info";
document.getElementById("registryLink").href = "index.html?code=" + code +"#registry";
document.getElementById("qaLink").href = "index.html?code=" + code +"#QA";


function setValueRF(value) {
  document.getElementById('rehearsalField').value = value;
  yesButton = document.getElementById("yesButtonRF")
  noButton = document.getElementById("noButtonRF")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueCeremony(value) {
  document.getElementById('ceremonyField').value = value;
  yesButton = document.getElementById("yesButtonCeremony")
  noButton = document.getElementById("noButtonCeremony")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueBeach(value) {
  document.getElementById('beachField').value = value;
  yesButton = document.getElementById("yesButtonBeach")
  noButton = document.getElementById("noButtonBeach")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueShuttle(value) {
  document.getElementById('shuttleField').value = value;
  yesButton = document.getElementById("yesButtonShuttle")
  noButton = document.getElementById("noButtonShuttle")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}