code = (document.URL.split('?'))
url = document.getElementById("returnURL");

if (code == document.URL) {
    url.href = "index.html";
}

else {
    code = code[1].split("=")[1].split("#")[0];
    url.href = "index.html?code="+code;
}