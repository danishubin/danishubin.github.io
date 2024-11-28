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