// detecting key movement based on source from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// open modal code from https://www.w3schools.com/howto/howto_css_modals.asp
const ball = document.querySelector('#ball');

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


const freekick1 = document.querySelector('#freekick1');
const freekick2 = document.querySelector('#freekick2');
const freekick3 = document.querySelector('#freekick3');
const freekick4 = document.querySelector('#freekick4');

fkpositions = [
    [0, 0, freekick1],
    [0, 0, freekick2],
    [0, 0, freekick3],
    [0, 0, freekick4]
];

randomizeObstaclePosition()


leftPos = 1;
topPos = 60;
move = 1;
document.onkeydown = checkKey;


function checkKey(e) {

    e = e || window.event;

    if (modal.style.display == "block") {
        return;
    }

    if (e.keyCode == '38' && topPos > 20 && !isBallBlocked(leftPos, topPos - move)) {
        // up arrow
        topPos -= move;
    } else if (e.keyCode == '40' && topPos < 100 && !isBallBlocked(leftPos, topPos + move)) {
        // down arrow
        topPos += move;
    } else if (e.keyCode == '37' && leftPos > 0 && !isBallBlocked(leftPos - move, topPos)) {
        // left arrow
        leftPos -= move;
    } else if (e.keyCode == '39' && leftPos < 95 && !isBallBlocked(leftPos + move, topPos)) {
        // right arrow
        leftPos += move;
    }
    ball.style.left = `${leftPos}%`;
    ball.style.top = `${topPos}%`;

    if ((topPos > 50 && topPos < 70) && (leftPos > 90)) {
        modal.style.display = "block";
        leftPos = 1;
        topPos = 60;
        ball.style.left = `${leftPos}%`;
        ball.style.top = `${topPos}%`;
        randomizeObstaclePosition();
    }
}

function randomizeObstaclePosition() {
    for (i = 0; i < fkpositions.length; i++) {
        fkpositions[i][0] = (Math.random() * (70 - 20 + 1)) + 30;
        fkpositions[i][1] = (Math.random() * (80 - 20 + 1)) + 20;
        fkpositions[i][2].style.top = `${fkpositions[i][0]}%`;
        fkpositions[i][2].style.left = `${fkpositions[i][1]}%`;
    }
}

function isBallBlocked(newLeft, newTop) {
    for (i = 0; i < fkpositions.length; i++) {
        if (newLeft > fkpositions[i][1] - 4 && newLeft < fkpositions[i][1] + 4 && newTop > fkpositions[i][0] - 5 && newTop < fkpositions[i][0] + 15) {
            return true;
        }
    }
    return false;
}