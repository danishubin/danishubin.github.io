birthday = document.getElementsByClassName("birthday")[0];
six = document.getElementsByClassName("six")[0];
calendar = document.getElementById("calendar");
calendar.onmousedown = checkCalendarClick;

var source = document.getElementById('audioSource');

one = document.getElementsByClassName("one")[0];
rose_bud = document.getElementById("bud");
rose_stem = document.getElementById("stem");


two = document.getElementsByClassName("two")[0];
river_one = document.getElementById("river-one");
river_two = document.getElementById("river-two");


three = document.getElementsByClassName("three")[0];
cheese = document.getElementById("cheese");
grapes = document.getElementById("grapes");

dragElement(cheese);
dragElement(grapes);

dragElement(rose_bud);

dragElement(river_one);
dragElement(river_two);

four = document.getElementsByClassName("four")[0];
mom = document.getElementById("mom");

mom.onmousedown = checkMomClick;

intro = document.getElementsByClassName("intro")[0];
video = document.getElementById("video");
start = document.getElementById("playAudio");
start.addEventListener("click", function() {
    one.style.display = "initial";
    intro.style.display = "none";
    audio = document.getElementById("songs");
    audio.muted = false; // Unmute the audio
    audio.play().then(() => {
        console.log("Audio is playing");
    }).catch(error => {
        console.log("Error playing audio:", error);
    });
    // video.play().catch(error => console.log("Autoplay prevented:", error));
    // setTimeout(() => {
    // }, 32000); // Wait for 3 seconds (3000 milliseconds)


});

function checkMomClick(e) {
    const rect = mom.getBoundingClientRect(); 

    const clickX = e.clientX - rect.left;
  
    const clickY = e.clientY - rect.top;
  
    const divCenterX = rect.width / 2;
  
    const divCenterY = rect.height / 2;
  
    if (clickX > divCenterX - 20 && clickX < divCenterX + 70 && 
  
        clickY > divCenterY - 40 && clickY < divCenterY + 60) {
        four.style.display = "none";
        five.style.display = "initial";
        source.src = "songs/HTTYD.mp3";

        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    }
}


function checkCalendarClick(e) {
    const rect = calendar.getBoundingClientRect(); 

    const clickX = e.clientX - rect.left;
  
    const clickY = e.clientY - rect.top;
  
    const left = rect.width;
  
    const bottom = rect.height;
  
    if (clickX > left - 250 && clickY > bottom - 250) {
        six.style.display = "none";
        birthday.style.display = "initial";
        source.src = "songs/ghibli.mp3";

        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    }
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;  
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

      if (elmnt.id == "river-one") {
        if ((elmnt.offsetTop - pos2) > 10 && elmnt.offsetTop - pos2 < window.innerHeight/2) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        elmnt.style.height = window.innerHeight/(elmnt.offsetTop - pos2)+ "%";
      } else if (elmnt.id == "river-two") {
        if (e.clientY  < window.innerHeight -30) {
            elmnt.style.height = e.clientY - window.innerHeight/2 + "px";
        }
        // if ((elmnt.offsetTop - pos2) < window.innerHeight - 100 && (elmnt.offsetTop - pos2) + 300 > window.innerHeight/2) {
        //     elmnt.style.height = elmnt.offsetTop - pos2 - 300 + "px";
        // }
      } else {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      if(elmnt.id == "bud") {
        if (checkTaskOneComplete()) {
            one.style.display = "none";
            two.style.display = "initial";
            source.src = "songs/riverbend.mp3";

            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away

        }
      } else if (elmnt.id == "river-one" || elmnt.id == "river-two") {
        if (checkTaskTwoComplete()) {
            two.style.display = "none";
            three.style.display = "initial";
            source.src = "songs/ratotuille.mp3";

            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away
        }
      } else if (elmnt.id == "cheese" || elmnt.id == "grapes") {
        if (checkTaskThreeComplete()) {
            three.style.display = "none";
            four.style.display = "initial";
            source.src = "songs/rapunzel.mp3";

            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away
        }
      } 
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

function checkTaskOneComplete() {
    rose_bud_left = getOffset(rose_bud).left;
    rose_bud_top = getOffset(rose_bud).top;
    rose_stem_left = getOffset(rose_stem).left;
    rose_stem_top = getOffset(rose_stem).top;
    if ((rose_bud_left + 25 >= rose_stem_left) && (rose_bud_left-25) <= rose_stem_left) {
        if ((rose_bud_top + 25 >= rose_stem_top) && (rose_bud_top-25) <= rose_stem_top) {
            return true;
        }
    }
    return false;
}

function checkTaskTwoComplete() {
    if ((getOffset(river_one).top) < 50 && (river_two.clientHeight) > (window.innerHeight/2 - 50)) {
        return true;
    }
    return false;
}

function checkTaskThreeComplete() {
    grapes_left = getOffset(grapes).left;
    grapes_top = getOffset(grapes).top;
    cheese_left = getOffset(cheese).left;
    cheese_top = getOffset(cheese).top;
    if ((cheese_left + 50 >= grapes_left) && (cheese_left-50) <= grapes_left) {
        if ((cheese_top + 50 >= cheese_top) && (cheese_top-50) <= grapes_top) {
            return true;
        }
    }
    return false;
}

var letterOne = document.getElementsByClassName("letterOne")[0];
var letterTwo = document.getElementsByClassName("letterTwo")[0];
var letterThree = document.getElementsByClassName("letterThree")[0];
var letterFour = document.getElementsByClassName("letterFour")[0];
var letterFive = document.getElementsByClassName("letterFive")[0];
var letterSix = document.getElementsByClassName("letterSix")[0];
var letterSeven = document.getElementsByClassName("letterSeven")[0];
var letterEight = document.getElementsByClassName("letterEight")[0];
var letterNine = document.getElementsByClassName("letterNine")[0];
var letterTen = document.getElementsByClassName("letterTen")[0];
five = document.getElementsByClassName("five")[0];

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
    // Do something when the value of the input field changes 
    if (letterFour.value.localeCompare("") != 0) {
        letterFive.focus();
    }

});

letterFive.addEventListener("input", function() {
    // Do something when the value of the input field changes 
    if (letterFive.value.localeCompare("") != 0) {
        letterSix.focus();
    }

});

letterSix.addEventListener("input", function() {
    // Do something when the value of the input field changes 
    if (letterSix.value.localeCompare("") != 0) {
        letterSeven.focus();
    }

});

letterSeven.addEventListener("input", function() {
    // Do something when the value of the input field changes 
    if (letterSeven.value.localeCompare("") != 0) {
        letterEight.focus();
    }

});

letterEight.addEventListener("input", function() {
    // Do something when the value of the input field changes 
    if (letterEight.value.localeCompare("") != 0) {
        letterNine.focus();
    }

});

letterNine.addEventListener("input", function() {
    // Do something when the value of the input field changes 
    if (letterNine.value.localeCompare("") != 0) {
        letterTen.focus();
    }

});
letterTen.addEventListener("input", function() {
    if (letterTen.value.localeCompare("") != 0) {
        if (letterOne.value.localeCompare("T") == 0 && letterTwo.value.localeCompare("H") == 0 && letterThree.value.localeCompare("I") == 0 && letterFour.value.localeCompare("S") == 0 && 
        letterFive.value.localeCompare("I") == 0 && letterSix.value.localeCompare("S") == 0
        && letterSeven.value.localeCompare("B") == 0 && letterEight.value.localeCompare("E") == 0 && letterNine.value.localeCompare("R") == 0 && letterTen.value.localeCompare("K") == 0) {
            five.style.display = "none";
            six.style.display = "initial";

            source.src = "songs/anastasia.mp3";

            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away

        }
    }
});
