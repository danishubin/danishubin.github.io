// Get the hamburger and menu elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open the menu
hamburgerBtn.addEventListener('click', (e) => {
    sideMenu.classList.add('active');
    hamburgerBtn.style.zIndex = "-1";

    // Stop propagation to prevent triggering the document click listener
    e.stopPropagation();
});

// Close the menu via the close button
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "1";
});

// Close the menu if clicking outside of it
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && e.target !== hamburgerBtn) {
        sideMenu.classList.remove('active');
        hamburgerBtn.style.zIndex = "1";
    }
});

// Prevent clicks inside the menu from propagating to the document
sideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

let code = (document.URL.split('?'))
urlMenu = document.getElementById("ParamURLMenu");
urlCover = document.getElementById("ParamURLCover");
rehearsalSchedule = document.getElementById("rehearsalSchedule");
rehearsalSchedule.display = "none";


if (code == document.URL) {
    urlMenu.href = "login.html";
    urlCover.href = "login.html";
    rehearsalSchedule.display = "none";
}

else {
    code = code[1].split("=")[1].split("#")[0];

    urlMenu.href = "rvsp.html?code="+code;

    urlCover.href = "rvsp.html?code="+code;

    if (code != 2) {
        rehearsalSchedule.display = "none";
    }
}

// for (let url in urls) {
//     console.log(urls)
//     url[0].href = "rvsp.html?code=1";
// }
