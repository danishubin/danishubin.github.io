function navColor() {
    var navBar = document.getElementsByClassName("navbar")[0];
    var color1 = document.getElementsByClassName("color-1")[0];
    var color2 = document.getElementsByClassName("color-2")[0];
    var colors = [color1, color2];
    for (var i = 0; i < colors.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = colors[i].getBoundingClientRect().top;
        var elementVisible = 400;
        if (elementTop < windowHeight - elementVisible) {
            if (i == 0) {
                navBar.style.backgroundColor = "#F28729";
                navBar.classList.remove("navbar-dark");
                navBar.classList.add("navbar-light");
                document.body.style.backgroundColor = "#F28729";
            }
        } else {
            if (i == 1) {
                navBar.style.backgroundColor = "#5B26A6";
                navBar.classList.remove("navbar-light");
                navBar.classList.add("navbar-dark");
                document.body.style.backgroundColor = "#5B26A6";
            }
        }
    }
}

window.addEventListener("scroll", navColor);

// To check the scroll position on page load
navColor();