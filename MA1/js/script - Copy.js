// open modal code from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// creating variables for the soccer ball and 4 players
const ball = document.querySelector('#ball');
const freekick1 = document.querySelector('#freekick1');
const freekick2 = document.querySelector('#freekick2');
const freekick3 = document.querySelector('#freekick3');
const freekick4 = document.querySelector('#freekick4');

// initial positions for players = 0,0
fkpositions = [
    [0, 0, freekick1],
    [0, 0, freekick2],
    [0, 0, freekick3],
    [0, 0, freekick4]
];

// function to randomize the position of the players between a certain interval
randomizeObstaclePosition()

// position of the ball (from left and top) in %
leftPos = 1;
topPos = 60;
move = 1;

// function to move, when key pressed
// detecting key movement based on source from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    // if modal open, don't move
    if (modal.style.display == "block") {
        return;
    }

    // if up arrow key pressed and no player blocking ball, move up
    if (e.keyCode == '38' && topPos > 20 && !isBallBlocked(leftPos, topPos - move)) {
        // up arrow
        topPos -= move;

    }
    // if down arrow key pressed and no player blocking ball, move down
    else if (e.keyCode == '40' && topPos < 100 && !isBallBlocked(leftPos, topPos + move)) {
        // down arrow
        topPos += move;
    }
    // if left arrow key pressed and no player blocking ball, move left
    else if (e.keyCode == '37' && leftPos > 0 && !isBallBlocked(leftPos - move, topPos)) {
        // left arrow
        leftPos -= move;
    }
    // if right arrow key pressed and no player blocking ball, move right
    else if (e.keyCode == '39' && leftPos < 95 && !isBallBlocked(leftPos + move, topPos)) {
        // right arrow
        leftPos += move;
    }
    //update ball position
    ball.style.left = `${leftPos}%`;
    ball.style.top = `${topPos}%`;

    // checking to see if goal
    if ((topPos > 50 && topPos < 70) && (leftPos > 90)) {
        // display modal
        modal.style.display = "block";
        // reposition ball
        leftPos = 1;
        topPos = 60;
        ball.style.left = `${leftPos}%`;
        ball.style.top = `${topPos}%`;
        // replace players
        randomizeObstaclePosition();
    }
}

// function to randomize player position between top (70-20) and left (80-20)
function randomizeObstaclePosition() {
    // change it for each player
    for (i = 0; i < fkpositions.length; i++) {
        fkpositions[i][0] = (Math.random() * (70 - 20 + 1)) + 20;
        fkpositions[i][1] = (Math.random() * (80 - 20 + 1)) + 20;
        fkpositions[i][2].style.top = `${fkpositions[i][0]}%`;
        fkpositions[i][2].style.left = `${fkpositions[i][1]}%`;
    }
}

// function to check if ball is blocked by one of the players
function isBallBlocked(newLeft, newTop) {
    for (i = 0; i < fkpositions.length; i++) {
        if (newLeft > fkpositions[i][1] - 4 && newLeft < fkpositions[i][1] + 4 && newTop > fkpositions[i][0] - 5 && newTop < fkpositions[i][0] + 15) {
            return true;
        }
    }
    return false;
}