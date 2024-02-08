navLogo = document.getElementsByClassName("nav-logo")[0];
var layers = document.getElementsByClassName("top-layer");


layers[4].addEventListener('transitionend', (event) => {
    transitionedFinished = setInterval(() => {
        if (layers[4].offsetLeft == screen.width) {
            for (var j = 0; j < layers.length; j++) {
                layers[j].style.transition = 'none';
                layers[j].style.opacity = '0';
                layers[j].style.left = '-100%';
            }
            clearInterval(transitionedFinished);
        }
    }, 500)
});

function pageAnimate() {
    var fadeIn = document.getElementsByClassName("fade-in")[0];
    for (var j = 0; j < layers.length; j++) {
        layers[j].classList.toggle("active");
    }
    fadeIn.style.opacity = 1;
}

// Loading page code from: https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
        pageAnimate();
    }
};