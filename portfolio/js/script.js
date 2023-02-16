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
    // Each time page is reloaded, scroll up
    history.scrollRestoration = "manual";
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }
    fadeIn.style.opacity = 1;
}

window.onload = function() {
    pageAnimate();
};