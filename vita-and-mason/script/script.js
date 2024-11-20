// Get the hamburger and menu elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open the menu
hamburgerBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
    hamburgerBtn.style.zIndex = "-1";
});

// Close the menu
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "1";
});


