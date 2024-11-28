// Get the hamburger and menu elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open the menu
hamburgerBtn.addEventListener('click', (e) => {
    sideMenu.classList.add('active');
    hamburgerBtn.style.zIndex = "-100";

    // Stop propagation to prevent triggering the document click listener
    e.stopPropagation();
});

// Close the menu via the close button
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "100";
});

// Close the menu if clicking outside of it
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && e.target !== hamburgerBtn) {
        sideMenu.classList.remove('active');
        hamburgerBtn.style.zIndex = "100";
    }
});


const li = document.getElementById("selectionClose");
li.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "100";
});

// Prevent clicks inside the menu from propagating to the document
sideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

let code = (document.URL.split('?'))
urlMenu = document.getElementById("ParamURLMenu");
urlCover = document.getElementById("ParamURLCover");
urlFooter = document.getElementById("ParamURLFooter")
rehearsalSchedule = document.getElementById("rehearsalSchedule");


if (code == document.URL) {
    urlMenu.href = "rvsp.html?code="+"vitamason";
    urlCover.href = "rvsp.html?code="+"vitamason";
    urlFooter.href = "rvsp.html?code="+"vitamason";
    rehearsalSchedule.style.display = "none";
}

else {
    code = code[1].split("=")[1].split("#")[0];

    urlMenu.href = "rvsp.html?code="+code;

    urlCover.href = "rvsp.html?code="+code;

    urlFooter.href = "rvsp.html?code="+code;

    if (code != "vitamason-rd" && code != "vitamason-rd1") {
        rehearsalSchedule.style.display = "none";
    }
}

// for (let url in urls) {
//     console.log(urls)
//     url[0].href = "rvsp.html?code=1";
// }