link = document.getElementById("ParamURL");

document.getElementById('codeButton').onclick = function(){
    // No Rehearsal
    if ((code.value).toLowerCase() == "vitamason") { // No Rehearsal No +1
      link.href = "index.html?code=vitamason";
    } else if ((code.value).toLowerCase() == "vitamason-rd") { // Rehearsal No +1
      link.href = "index.html?code=vitamason-rd";
    } else if ((code.value).toLowerCase()== "vitamason-1") { // No Rehearsal + 1
      link.href = "index.html?code=vitamason-1";
    } else if ((code.value).toLowerCase()== "vitamason-rd1") { // Rehearsal + 1
      link.href = "index.html?code=vitamason-rd1";
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
    if ((code.value).toLowerCase() == "vitamason") { // No Rehearsal No +1
      window.location.href = "index.html?code=vitamason";  // Replace with your custom page URL
    } else if ((code.value).toLowerCase() == "vitamason-rd") { // Rehearsal No +1
      window.location.href = "index.html?code=vitamason-rd";  // Replace with your custom page URL
    } else if ((code.value).toLowerCase()== "vitamason-1") { // No Rehearsal + 1
      window.location.href = "index.html?code=vitamason-1";  // Replace with your custom page URL
    } else if ((code.value).toLowerCase()== "vitamason-rd1") { // Rehearsal + 1
      window.location.href = "index.html?code=vitamason-rd1";  // Replace with your custom page URL
    } else {
      warning.style.visibility = "visible";
    }
  }
});