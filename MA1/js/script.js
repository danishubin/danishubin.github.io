// detecting key movement based on source from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
const ball = document.querySelector('#ball');
leftPos = -500;
topPos = 0;
move = 5;
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38' && topPos > 0) {
        // up arrow
        topPos -= move;
    } else if (e.keyCode == '40' && topPos < 400) {
        // down arrow
        topPos += move;
    } else if (e.keyCode == '37' && leftPos > -500) {
        // left arrow
        leftPos -= move;
    } else if (e.keyCode == '39') {
        // right arrow
        leftPos += move;
    }
    ball.style.left = `${leftPos}px`;
    ball.style.top = `${topPos}px`;
}