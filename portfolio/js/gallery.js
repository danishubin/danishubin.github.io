function navColor() {
    var navBar = document.getElementsByClassName("navbar")[0];
    var gallery = document.getElementsByClassName("gallery")[0];
    var color1 = document.getElementsByClassName("web-design")[0];
    var color2 = document.getElementsByClassName("art")[0];
    var colors = [color1, color2];
    if ((gallery.style.display).localeCompare("none") == 0) {
        navBar.classList.remove("navbar-dark");
        navBar.classList.add("navbar-light");
    } else {
        for (var i = 0; i < colors.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = colors[i].getBoundingClientRect().top;
            var elementVisible = 400;
            if (elementTop < windowHeight - elementVisible) {
                if (i == 0) {
                    navBar.style.backgroundColor = "#F25116";
                    navBar.classList.remove("navbar-light");
                    navBar.classList.add("navbar-dark");
                    document.body.style.backgroundColor = "#F25116";
                }
            } else {
                if (i == 1) {
                    navBar.style.backgroundColor = "white";
                    navBar.classList.remove("navbar-dark");
                    navBar.classList.add("navbar-light");
                    document.body.style.backgroundColor = "white";
                }
            }
        }
    }
}

window.addEventListener("scroll", navColor);

// To check the scroll position on page load
navColor();