var slider = document.getElementById("divide");
var before = document.getElementsByClassName("before");
var sliderbutton = document.getElementById("slider-button");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    for (var i = 0; i < before.length; i++) {
        before[i].style.width = this.value + "%";
        sliderbutton.style.left = "calc(" + this.value + "% - 18px)";
    }
}