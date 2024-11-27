link = document.getElementById("ParamURL");

document.getElementById('codeButton').onclick = function(){
    if (code.value == 1) {
      link.href = "index.html?code=1";
    } else if (code.value == 2) {
      link.href = "index.html?code=2";
    } else {
      warning.style.visibility = "visible";
    }
  };