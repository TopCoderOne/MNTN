const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-wrapper");
const navMenu = document.querySelector(".nav-menu");
const heroScroll = document.querySelector(".hero-scroll");
const body = document.body;

const slides = document.querySelectorAll('.slider-text');
const indicator = document.querySelector('.slider-indicator');
const sections = document.querySelectorAll('.scroll-point');
const elements = document.querySelectorAll('.animate');

// -------------------- MENU --------------------

const toggleMenu = (state) => {
    const action = state ?? !navToggle.classList.contains("opened");

    navToggle.classList.toggle("opened", action);
    nav.classList.toggle("opened", action);
    navMenu.classList.toggle("opened", action);
    body.classList.toggle("stop-scroll", action);
};

// -------------------- GLOBAL CLICK (delegation) --------------------

document.addEventListener("click", (e) => {
    if (e.target.closest(".nav-toggle")) {
        toggleMenu();
    }

    if (e.target.closest(".nav-menu a")) {
        toggleMenu(false);
    }

    const slide = e.target.closest(".slider-text");
    if (slide) {
        const index = [...slides].indexOf(slide);
        const top = sections[index].getBoundingClientRect().top + window.scrollY - 100;

        window.scrollTo({
            top,
            behavior: "smooth"
        });
    }
});

// -------------------- RESIZE --------------------

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) toggleMenu(false);
});

// -------------------- SCROLL --------------------

window.addEventListener("scroll", () => {
    nav.classList.toggle(
        "fixed",
        window.scrollY >= heroScroll.offsetTop
    );
});

// -------------------- SLIDER --------------------

const totalTravel = 180;
const step = totalTravel / (slides.length - 1);

const updateSlider = (index) => {
    indicator.style.setProperty('--y', `${index * step}px`);
};

// -------------------- SLIDER OBSERVER --------------------

const mediaQuery = window.matchMedia("(min-width: 1200px)");
let sliderObserver;

function initSliderObserver() {
    if (mediaQuery.matches && !sliderObserver && indicator) {
        sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = [...sections].indexOf(entry.target);
                    updateSlider(index);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sliderObserver.observe(section));
        updateSlider(0);
    }

    if (!mediaQuery.matches && sliderObserver) {
        sliderObserver.disconnect();
        sliderObserver = null;
    }
}

initSliderObserver();
mediaQuery.addEventListener("change", initSliderObserver);

// -------------------- ANIMATION OBSERVER --------------------

const animationObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

elements.forEach(el => animationObserver.observe(el));