// detecting key movement based on source from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// open modal code from https://www.w3schools.com/howto/howto_css_modals.asp
const ball = document.querySelector('#ball');

// Get the modal
var modal = document.getElementById("myModal");


leftPos = 1;
topPos = 60;
move = 1;
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38' && topPos > 20) {
        // up arrow
        topPos -= move;
    } else if (e.keyCode == '40' && topPos < 100) {
        // down arrow
        topPos += move;
    } else if (e.keyCode == '37' && leftPos > 0) {
        // left arrow
        leftPos -= move;
    } else if (e.keyCode == '39' && leftPos < 95) {
        // right arrow
        leftPos += move;
    }
    ball.style.left = `${leftPos}%`;
    ball.style.top = `${topPos}%`;

    if ((topPos > 55 && topPos < 65) && (leftPos > 90)) {
        modal.style.display = "block";
        leftPos = 1;
        topPos = 60;
        ball.style.left = `${leftPos}%`;
        ball.style.top = `${topPos}%`;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}