const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-wrapper");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", (e) => {
    navToggle.classList.toggle("opened");
    nav.classList.toggle("opened");
    navMenu.classList.toggle("opened");
});