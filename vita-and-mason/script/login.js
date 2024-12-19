link = document.getElementById("ParamURL");

// vitamason
// vitamason-rdg
// vitamason-g
// vitamason-rd

document.getElementById('codeButton').onclick = function(){
    // No Rehearsal
    if ((code.value).toLowerCase() == "vitamason") { // No Rehearsal No +1
      link.href = "index.html?code=vitamason";
    } else if ((code.value).toLowerCase() == "vitamason-rd") { // Rehearsal No +1
      link.href = "index.html?code=vitamason-rd";
    } else if ((code.value).toLowerCase()== "vitamason-g") { // No Rehearsal + 1
      link.href = "index.html?code=vitamason-g";
    } else if ((code.value).toLowerCase()== "vitamason-rdg") { // Rehearsal + 1
      link.href = "index.html?code=vitamason-rdg";
    } else {
      warning.style.visibility = "visible";
    }
  };


  // Get the input field
var input = document.getElementById("code");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    var codeToCheck = code.value.toLowerCase().trim();
    if (codeToCheck == "vitamason") { // No Rehearsal No +1
      window.location.href = "index.html?code=vitamason";  // Replace with your custom page URL
    } else if (codeToCheck == "vitamason-rd") { // Rehearsal No +1
      window.location.href = "index.html?code=vitamason-rd";  // Replace with your custom page URL
    } else if (codeToCheck == "vitamason-g") { // No Rehearsal + 1
      window.location.href = "index.html?code=vitamason-g";  // Replace with your custom page URL
    } else if (codeToCheck == "vitamason-rdg") { // Rehearsal + 1
      window.location.href = "index.html?code=vitamason-rdg";  // Replace with your custom page URL
    } else {
      warning.style.visibility = "visible";
    }
  }
});