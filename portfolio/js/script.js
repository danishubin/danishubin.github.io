navLogo = document.getElementsByClassName("nav-logo")[0];


function pageAnimate() {
    var layers = document.getElementsByClassName("top-layer");
    var fadeIn = document.getElementsByClassName("fade-in")[0];
    for (var j = 0; j < layers.length; j++) {
        layers[j].classList.toggle("active");
    }
    fadeIn.style.opacity = 1;
}

window.onload = function() {
    pageAnimate();
};

// Each time page is reloaded, scroll up
history.scrollRestoration = "manual";
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}