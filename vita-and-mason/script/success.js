// // Get the hamburger and menu elements
// const hamburgerBtn = document.getElementById('hamburger-btn');
// const sideMenu = document.getElementById('side-menu');
// const closeBtn = document.getElementById('close-btn');

// // Open the menu
// hamburgerBtn.addEventListener('click', (e) => {
//     sideMenu.classList.add('active');
//     hamburgerBtn.style.zIndex = "-1";

//     // Stop propagation to prevent triggering the document click listener
//     e.stopPropagation();
// });

// // Close the menu via the close button
// closeBtn.addEventListener('click', () => {
//     sideMenu.classList.remove('active');
//     hamburgerBtn.style.zIndex = "1";
// });

// // Close the menu if clicking outside of it
// document.addEventListener('click', (e) => {
//     if (!sideMenu.contains(e.target) && e.target !== hamburgerBtn) {
//         sideMenu.classList.remove('active');
//         hamburgerBtn.style.zIndex = "1";
//     }
// });

// // Prevent clicks inside the menu from propagating to the document
// sideMenu.addEventListener('click', (e) => {
//     e.stopPropagation();
// });

code = (document.URL.split('?'))
url = document.getElementById("returnURL");

if (code == document.URL) {
    url.href = "index.html";
}

else {
    code = code[1].split("=")[1].split("#")[0];
    url.href = "index.html?code="+code;
}