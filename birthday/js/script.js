questionOne();

function gallery() {
    var gallery = document.getElementsByClassName("gallery")[0];
    gallery.style.display = "inherit";
}

function questionFour() {
    var q4 = document.getElementsByClassName("q4")[0];
    q4.style.display = "inherit";

    var letterOne = document.getElementsByClassName("letterOne")[0];
    var letterTwo = document.getElementsByClassName("letterTwo")[0];
    var letterThree = document.getElementsByClassName("letterThree")[0];
    var letterFour = document.getElementsByClassName("letterFour")[0];

    letterOne.focus();
    letterOne.addEventListener("input", function() {
        // Do something when the value of the input field changes 
        if (letterOne.value.localeCompare("") != 0) {
            letterTwo.focus();
        }
    });

    letterTwo.addEventListener("input", function() {
        // Do something when the value of the input field changes 
        if (letterTwo.value.localeCompare("") != 0) {
            letterThree.focus();
        }
    });

    letterThree.addEventListener("input", function() {
        // Do something when the value of the input field changes 
        if (letterThree.value.localeCompare("") != 0) {
            letterFour.focus();
        }

    });

    letterFour.addEventListener("input", function() {
        if (letterFour.value.localeCompare("") != 0) {
            if (letterOne.value.localeCompare("S") == 0 && letterTwo.value.localeCompare("H") == 0 && letterThree.value.localeCompare("E") == 0 && letterFour.value.localeCompare("R") == 0) {
                sleep(100).then(() => {
                    q4.style.display = "none";
                    gallery();
                });
            }
        }
    });

    letterTwo.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            if (letterTwo.value.localeCompare("") == 0) {
                letterOne.focus();
            } else {
                letterTwo.value = "";
            }
        }
    };

    letterThree.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            if (letterThree.value.localeCompare("") == 0) {
                letterTwo.focus();
            } else {
                letterThree.value = "";
            }
        }
    };

    letterFour.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            if (letterFour.value.localeCompare("") == 0) {
                letterThree.focus();
            } else {
                letterFour.value = "";
            }
        }
    };

}

function questionThree() {
    var q3 = document.getElementsByClassName("q3")[0];
    q3.style.display = "inherit";

    var jack = document.getElementsByClassName("jack")[0];
    var brain = document.getElementsByClassName("brain")[0];

    // Make the DIV element draggable:
    dragElement(brain);

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            if ((elmnt.offsetTop > jack.offsetTop && elmnt.offsetTop < (jack.offsetTop + jack.offsetHeight)) && (elmnt.offsetLeft > jack.offsetLeft && elmnt.offsetLeft < (jack.offsetLeft + jack.offsetWidth))) {
                q3.style.display = "none";
                questionFour();
            }
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

function questionTwo() {
    var q2 = document.getElementsByClassName("q2")[0];
    q2.style.display = "inherit";

    var boat = document.getElementsByClassName("pirate_boat")[0];
    var greenLight = document.getElementsByClassName("green-light")[0];
    var degrees = 0;
    var timer = false;

    boat.onmousemove = function() {
        // console.log("hover");
        if (timer == false) {
            console.log(false);
            timer = setInterval(function() {
                boat.style.transform = "rotate(" + degrees + "deg)";
                degrees += 1;
                if (degrees > 360) {
                    degrees = 0;
                }
            }, 5);
        }
    };

    boat.onmouseout = function() {
        clearInterval(timer); // The setInterval it cleared and doesn't run anymore.
        timer = false;
        if (degrees < 200 && degrees > 160) {
            greenLight.style.animationName = "green-pulse";
            sleep(1000).then(() => {
                q2.style.display = "none";
                questionThree();
            });
        }
    }
}


function questionOne() {
    var q1 = document.getElementsByClassName("q1")[0];

    var sun = document.getElementsByClassName("sun")[0];
    var sky = document.getElementsByClassName("sky")[0];
    var gandalf = document.getElementsByClassName("gandalf")[0];
    var count = 0;

    var sunYellow = [255, 255, 0];
    var sunWhite = [241, 241, 214];
    var diffWhiteR = sunYellow[0] - sunWhite[0];
    var diffWhiteG = sunYellow[1] - sunWhite[1];
    var diffWhiteB = sunYellow[2] - sunWhite[2];
    var diffWhite = [diffWhiteR, diffWhiteG, diffWhiteB];

    var skyblue = [135, 206, 235];
    var skyblack = [19, 1, 77];
    var diffBlueR = skyblue[0] - skyblack[0];
    var diffBlueG = skyblue[1] - skyblack[1];
    var diffBlueB = skyblue[2] - skyblack[2];
    var diffBlue = [diffBlueR, diffBlueG, diffBlueB];

    // console.log(diffBlue);
    var percentFade = 0.0;

    gandalf.addEventListener('click', function handleClick() {
        q1.style.display = "none";
        questionTwo();
    });

    dragElement(sun);

    function dragElement(elmnt) {
        var pos2 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos2 = pos4 - e.clientY;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

            percentFade = 1 - (elmnt.offsetTop + 100) / sky.offsetHeight;
            diffBlue[0] = diffBlue[0] * percentFade + skyblack[0];
            diffBlue[1] = diffBlue[1] * percentFade + skyblack[1];
            diffBlue[2] = diffBlue[2] * percentFade + skyblack[2];

            diffWhite[0] = diffWhite[0] * percentFade + sunWhite[0];
            diffWhite[1] = diffWhite[1] * percentFade + sunWhite[1];
            diffWhite[2] = diffWhite[2] * percentFade + sunWhite[2];

            sky.style.backgroundColor = "rgb(" + diffBlue[0] + "," + diffBlue[1] + "," + diffBlue[2] + ")";
            sun.style.backgroundColor = "rgb(" + diffWhite[0] + "," + diffWhite[1] + "," + diffWhite[2] + ")";

            if (((elmnt.offsetTop + 100) > sky.offsetHeight - 20)) {
                pos2 = 0;
                pos4 = 0;
                elmnt.style.top = (0) + "px";
                diffBlue = [diffBlueR, diffBlueG, diffBlueB];
                sky.style.backgroundColor = "rgb(" + skyblue[0] + "," + skyblue[1] + "," + skyblue[2] + ")";
                sun.style.backgroundColor = "rgb(" + sunYellow[0] + "," + sunYellow[1] + "," + sunYellow[2] + ")";
                percentFade = 0.0;
                closeDragElement();
                count += 1;
                if (count == 5) {
                    gandalf.style.display = "inherit";
                }
            }
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}