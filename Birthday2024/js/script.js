const audioContext = new(window.AudioContext || window.webkitAudioContext)();
const controller = new AbortController();
const { signal } = controller;
var timeout;
var interval;
index = 0;
size = 0;

const controller2 = new AbortController();
const { signal2 } = controller2;

const getElementByNote = (note) =>
    note && document.querySelector(`[note="${note}"]`);

const keys = {
    A: { element: getElementByNote("C"), note: "C", octaveOffset: 0 },
    W: { element: getElementByNote("C#"), note: "C#", octaveOffset: 0 },
    S: { element: getElementByNote("D"), note: "D", octaveOffset: 0 },
    E: { element: getElementByNote("D#"), note: "D#", octaveOffset: 0 },
    D: { element: getElementByNote("E"), note: "E", octaveOffset: 0 },
    F: { element: getElementByNote("F"), note: "F", octaveOffset: 0 },
    T: { element: getElementByNote("F#"), note: "F#", octaveOffset: 0 },
    G: { element: getElementByNote("G"), note: "G", octaveOffset: 0 },
    Y: { element: getElementByNote("G#"), note: "G#", octaveOffset: 0 },
    H: { element: getElementByNote("A"), note: "A", octaveOffset: 1 },
    U: { element: getElementByNote("A#"), note: "A#", octaveOffset: 1 },
    J: { element: getElementByNote("B"), note: "B", octaveOffset: 1 },
    K: { element: getElementByNote("C2"), note: "C", octaveOffset: 1 },
    O: { element: getElementByNote("C#2"), note: "C#", octaveOffset: 1 },
    L: { element: getElementByNote("D2"), note: "D", octaveOffset: 1 },
    P: { element: getElementByNote("D#2"), note: "D#", octaveOffset: 1 },
    semicolon: { element: getElementByNote("E2"), note: "E", octaveOffset: 1 }
};

const getHz = (note = "A", octave = 4) => {
    const A4 = 440;
    let N = 0;
    switch (note) {
        default:
            case "A":
            N = 0;
        break;
        case "A#":
                case "Bb":
                N = 1;
            break;
        case "B":
                N = 2;
            break;
        case "C":
                N = 3;
            break;
        case "C#":
                case "Db":
                N = 4;
            break;
        case "D":
                N = 5;
            break;
        case "D#":
                case "Eb":
                N = 6;
            break;
        case "E":
                N = 7;
            break;
        case "F":
                N = 8;
            break;
        case "F#":
                case "Gb":
                N = 9;
            break;
        case "G":
                N = 10;
            break;
        case "G#":
                case "Ab":
                N = 11;
            break;
    }
    N += 12 * (octave - 4);
    return A4 * Math.pow(2, N / 12);
};

const pressedNotes = new Map();
let clickedKey = "";

const playKey = (key) => {
    if (!keys[key]) {
        return;
    }

    const osc = audioContext.createOscillator();
    const noteGainNode = audioContext.createGain();
    noteGainNode.connect(audioContext.destination);

    const zeroGain = 0.00001;
    const maxGain = 0.5;
    const sustainedGain = 0.001;

    noteGainNode.gain.value = zeroGain;

    const setAttack = () =>
        noteGainNode.gain.exponentialRampToValueAtTime(
            maxGain,
            audioContext.currentTime + 0.01
        );
    const setDecay = () =>
        noteGainNode.gain.exponentialRampToValueAtTime(
            sustainedGain,
            audioContext.currentTime + 1
        );
    const setRelease = () =>
        noteGainNode.gain.exponentialRampToValueAtTime(
            zeroGain,
            audioContext.currentTime + 2
        );

    setAttack();
    setDecay();
    setRelease();

    osc.connect(noteGainNode);
    osc.type = "triangle";

    const freq = getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3);

    if (Number.isFinite(freq)) {
        osc.frequency.value = freq;
    }

    keys[key].element.classList.add("pressed");
    pressedNotes.set(key, osc);
    pressedNotes.get(key).start();
};

const stopKey = (key) => {
    if (!keys[key]) {
        return;
    }

    keys[key].element.classList.remove("pressed");
    const osc = pressedNotes.get(key);

    if (osc) {
        setTimeout(() => {
            osc.stop();
        }, 2000);

        pressedNotes.delete(key);
    }
};

document.addEventListener("keydown", (e) => {
    const eventKey = e.key.toUpperCase();
    const key = eventKey === ";" ? "semicolon" : eventKey;

    if (!key || pressedNotes.get(key)) {
        return;
    }
    playKey(key);
    passFluffy(key);
}, { signal });

document.addEventListener("keyup", (e) => {
    const eventKey = e.key.toUpperCase();
    const key = eventKey === ";" ? "semicolon" : eventKey;

    if (!key) {
        return;
    }
    stopKey(key);
}, { signal });

for (const [key, { element }] of Object.entries(keys)) {
    element.addEventListener("mousedown", () => {
        playKey(key);
        passFluffy(key);
        clickedKey = key;
    }, { signal });
}

document.addEventListener("mouseup", () => {
    stopKey(clickedKey);
}, { signal });

function passFluffy(key) {
    const notes = ["D", "H", "K", "J", "H", "semicolon", "L", "J", "H", "K", "J", "G", "U", "D", "D"];
    // const notes = ["D"];
    if (index < notes.length) {
        if (key == notes[index]) {
            index++;
        } else {
            index = 0;
        }
    }
    if (index >= notes.length) {
        controller.abort();
        document.getElementsByClassName('fluffy')[0].style.display = "none";
        document.getElementsByClassName('priorities')[0].style.display = "inherit";
    }
}

const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
    let all = [...sortableList.querySelectorAll(".item")];
    let order = ["expelled", "hw late", "not reading the potion instructions", "dental stitches", "death"];
    for (let i = 0; i < order.length; i++) {
        if (all[i].innerText != order[i]) {
            return false;
        }
    }

    document.getElementsByClassName('priorities')[0].style.display = "none";
    document.getElementsByClassName('plants')[0].style.display = "inherit";
    devilSnare();
}

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());

function nextTest() {
    // document.getElementsByClassName('fluffy')[0].style.animationName = "exit";
    // document.getElementById('keyboard').style.background = "green";
    // console.log(document.getElementsByClassName('fluffy'));
    // document.removeEventListener()
}

function devilSnare() {
    document.addEventListener("mousemove", () => {
        if (size < -1000) {
            return;
        }
        clearInterval(interval);
        positionX = event.clientX;
        positionY = event.clientY;
        document.getElementsByClassName('light')[0].style.left = positionX + "px";
        document.getElementsByClassName('light')[0].style.top = positionY + "px";

        size = 0;
        document.getElementsByClassName('light')[0].style.width = size + "px";
        document.getElementsByClassName('light')[0].style.height = size + "px";

        var src = document.getElementById("leaves");
        var img = document.createElement("img");
        img.src = "images/leaves.png";
        img.style.transform = "rotate( " + (Math.random() * 360) + "deg)";
        img.style.left = Math.random() * 90 + "vw";
        img.style.top = Math.random() * 90 + "vh";
        src.appendChild(img);

        // growLight(positionX, positionY);
        clearTimeout(timeout);
        // interval = setInterval(growLight(positionX, positionY), 30);
        timeout = setTimeout(function() {
            interval = setInterval(function() {
                growLight(positionX, positionY)
            }, 10)
        }, 10000);
    }, { signal2 });
}

function growLight(positionX, positionY) {
    if (document.getElementsByClassName('orc2')[0].style.display == "inherit") {
        clearTimeout(timeout);
        clearInterval(interval);
        return;
    }
    // if (document.getElementsByClassName('orc')[0].style.display == "none" && ) {
    //     return;
    // }
    if ((size >= 0)) {
        size += 10;
    }
    document.getElementsByClassName('light')[0].style.width = size + "px";
    document.getElementsByClassName('light')[0].style.height = size + "px";

    document.getElementsByClassName('light')[0].style.left = positionX - (size / 2) + "px";
    document.getElementsByClassName('light')[0].style.top = positionY - (size / 2) + "px";
    // clearTimeout(timeout);
    // interval = setInterval(growLight(positionX, positionY), 3000);
    // timeout = setTimeout(growLight(positionX, positionY), 100);
    if (size > 1000) {
        document.getElementsByClassName('plants')[0].style.display = "none";
        clearTimeout(timeout);
        clearInterval(interval);
        document.getElementsByClassName('orc2')[0].style.display = "inherit";
        orcAge();
        size = -10000;
        controller2.abort();
        return;
        // clearInterval(interval);
    }
}

function orcAge() {
    var slider1 = document.getElementById("aragorn");
    var output1 = document.getElementById("aragornAge");
    output1.innerHTML = slider1.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider1.oninput = function() {
        output1.innerHTML = this.value;
        if (slider1.value == 0 && slider2.value == 100) {
            setTimeout(function() {
                document.getElementsByClassName('orc2')[0].style.display = "none";
                document.getElementsByClassName('final')[0].style.display = "flex";
                final();
            }, 1000);
        }
    }

    var slider2 = document.getElementById("orc");
    var output2 = document.getElementById("orcAge");
    output2.innerHTML = slider2.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider2.oninput = function() {
        output2.innerHTML = this.value;
        if (slider1.value == 0 && slider2.value == 100) {
            setTimeout(function() {
                document.getElementsByClassName('orc2')[0].style.display = "none";
                document.getElementsByClassName('final')[0].style.display = "flex";
                final();
            }, 1000);
        }
    }
}

function final() {
    var newLine = 0;
    inputFinal = document.getElementById("finalInput");
    inputFinal.oninput = function() {
        if (inputFinal.value == "if you ask youll never know if you know you need only ask") {
            document.getElementsByClassName('final')[0].style.display = "none";
            document.getElementsByClassName('gallery')[0].style.display = "unset";
            return;
        }
        // console.log(inputFinal.value);
        // console.log(inputFinal.value.replace(",", ""));
        inputFinal.value = inputFinal.value.replace(",", "");
        inputFinal.value = inputFinal.value.replace("!", "");
        inputFinal.value = inputFinal.value.replace(".", "");
        inputFinal.value = inputFinal.value.replace("'", "");

    }
}