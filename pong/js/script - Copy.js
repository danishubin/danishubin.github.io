// ball, speed, left, top
var ball = [document.getElementsByClassName("ball")[0], 3, -1, 1];
var ballBounds = ball[0].getBoundingClientRect();

var leftHalf = document.getElementsByClassName("left-half")[0];
var rightHalf = document.getElementsByClassName("right-half")[0];

var leftSlider = document.getElementsByClassName("left-slider")[0];
var leftSliderBounds = leftSlider.getBoundingClientRect();
var rightSlider = document.getElementsByClassName("right-slider")[0];
var rightSliderBounds = rightSlider.getBoundingClientRect();
var sliderMoveSpeed = 3;
var keysPressed = [];

var scoreLeft = 0;
var scoreRight = 0;
var scoreboard = document.getElementsByClassName("score")[0];

var start = document.getElementsByClassName("start")[0];

var playing = false;
var moveBall;

function increaseSpeed() {
    if (ball[1] < 10) {
        ball[1] = ball[1] + 0.5;
    }
}

function updateScore() {
    scoreboard.innerHTML = scoreLeft + " - " + scoreRight;
    clearInterval(moveBall);
    ball[0].style.left = "calc(50% - 10px)";
    ball[0].style.top = "calc(50% - 10px)";
    ball[1] = 3;
    ballBounds = ball[0].getBoundingClientRect();

    leftSlider.style.left = "calc(10px)";
    leftSlider.style.top = "calc(50% - 25px)";
    leftSliderBounds = leftSlider.getBoundingClientRect();

    rightSlider.style.left = "calc(100% - 10px)";
    rightSlider.style.top = "calc(50% - 25px)";
    rightSliderBounds = leftSlider.getBoundingClientRect();

    keysPressed = [];
    playing = false;
    start.style.display = "inherit";
}


function hitBoundary() {
    if (ball[0].offsetLeft <= -5) {
        scoreRight = scoreRight + 1;
        updateScore();
    }

    if (ball[0].offsetLeft >= document.body.offsetWidth - 10) {
        scoreLeft = scoreLeft + 1;
        updateScore();
    }

    if (ball[0].offsetTop <= 0 && (ball[3] < 0)) {
        ball[3] = ball[3] * -1;
    }

    if (ball[0].offsetTop >= document.body.offsetHeight - 20 && (ball[3] > 0)) {
        ball[3] = ball[3] * -1;
    }
}

function hitSlider() {
    ballBounds = ball[0].getBoundingClientRect();
    if (!(ballBounds.right < leftSliderBounds.left ||
            ballBounds.left > leftSliderBounds.right ||
            ballBounds.bottom < leftSliderBounds.top ||
            ballBounds.top > leftSliderBounds.bottom) && (ball[2] < 0)) {
        ball[2] = ball[2] * -1;
        increaseSpeed();
    } else if (!(ballBounds.right < rightSliderBounds.left ||
            ballBounds.left > rightSliderBounds.right ||
            ballBounds.bottom < rightSliderBounds.top ||
            ballBounds.top > rightSliderBounds.bottom) && (ball[2] > 0)) {
        ball[2] = ball[2] * -1;
        increaseSpeed();
    }
}

function moveSlider() {
    if (keysPressed.includes("AL") && (rightSlider.offsetLeft > (document.body.offsetWidth / 2))) {
        // Left Arrow Key
        rightSlider.style.left = rightSlider.offsetLeft - sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("AR") && (rightSlider.offsetLeft < (document.body.offsetWidth - 10))) {
        // Right Arrow Key
        rightSlider.style.left = rightSlider.offsetLeft + sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("AU") && (rightSlider.offsetTop > 0)) {
        // Up Arrow Key
        rightSlider.style.top = rightSlider.offsetTop - sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("AD") && (rightSlider.offsetTop < (document.body.offsetHeight - 100))) {
        // Down Arrow Key
        rightSlider.style.top = rightSlider.offsetTop + sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("A") && (leftSlider.offsetLeft > 0)) {
        // A Key
        leftSlider.style.left = leftSlider.offsetLeft - sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("D") && (leftSlider.offsetLeft < (document.body.offsetWidth / 2 - 10))) {
        // D Key
        leftSlider.style.left = leftSlider.offsetLeft + sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("W") && (leftSlider.offsetTop > 0)) {
        // W Key
        leftSlider.style.top = leftSlider.offsetTop - sliderMoveSpeed + "px";
    }
    if (keysPressed.includes("S") && (leftSlider.offsetTop < (document.body.offsetHeight - 100))) {
        // S Key
        leftSlider.style.top = leftSlider.offsetTop + sliderMoveSpeed + "px";
    }
    leftSliderBounds = leftSlider.getBoundingClientRect();
    rightSliderBounds = rightSlider.getBoundingClientRect();
}

// function to move, when key pressed
// detecting key movement based on source from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
document.onkeydown = pushKey;

function pushKey(e) {

    e = e || window.event;

    if (e.keyCode == '32' && (playing == false)) {
        // Space Key
        start.style.display = "none";
        moveBall = setInterval(
            function() {
                ball[0].style.left = ball[0].offsetLeft + (ball[2] * ball[1]) + "px";
                ball[0].style.top = ball[0].offsetTop + (ball[3] * ball[1]) + "px";
                moveSlider();
                hitBoundary();
                hitSlider();
            }, 10
        );
        playing = true;
    }
    if (e.keyCode == '37' && !keysPressed.includes("AL")) {
        // Left Arrow Key
        keysPressed.push("AL");
    }
    if (e.keyCode == '39' && !keysPressed.includes("AR")) {
        // Right Arrow Key
        keysPressed.push("AR");
    }
    if (e.keyCode == '38' && !keysPressed.includes("AU")) {
        // Up Arrow Key
        keysPressed.push("AU");
    }
    if (e.keyCode == '40' && !keysPressed.includes("AD")) {
        // Down Arrow Key
        keysPressed.push("AD");
    }
    if (e.keyCode == '65' && !keysPressed.includes("A")) {
        // A Key
        keysPressed.push("A");
    }
    if (e.keyCode == '68' && !keysPressed.includes("D")) {
        // D Key
        keysPressed.push("D");
    }
    if (e.keyCode == '87' && !keysPressed.includes("W")) {
        // W Key
        keysPressed.push("W");
    }
    if (e.keyCode == '83' && !keysPressed.includes("S")) {
        // S Key
        keysPressed.push("S");
    }
}

document.onkeyup = popKey;

function popKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
        // Left Arrow Key
        keysPressed.splice(keysPressed.indexOf("AL"), 1);
    }
    if (e.keyCode == '39') {
        // Right Arrow Key
        keysPressed.splice(keysPressed.indexOf("AR"), 1);
    }
    if (e.keyCode == '38') {
        // Up Arrow Key
        keysPressed.splice(keysPressed.indexOf("AU"), 1);
    }
    if (e.keyCode == '40') {
        // Down Arrow Key
        keysPressed.splice(keysPressed.indexOf("AD"), 1);
    }
    if (e.keyCode == '65') {
        // A Key
        keysPressed.splice(keysPressed.indexOf("A"), 1);
    }
    if (e.keyCode == '68') {
        // D Key
        keysPressed.splice(keysPressed.indexOf("D"), 1);
    }
    if (e.keyCode == '87') {
        // W Key
        keysPressed.splice(keysPressed.indexOf("W"), 1);
    }
    if (e.keyCode == '83') {
        // S Key
        keysPressed.splice(keysPressed.indexOf("S"), 1);
    }
}