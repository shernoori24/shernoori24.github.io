
// ============ toggle icon navbar =========
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// ============ scroll section avtive lint =========
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    // ============ sticky navbar =========
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //===== remove toggle icon and navbar when click navbar link (stroll) ============
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ========================= scroll reveal =======================
ScrollReveal({
    // reset:true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .experiences-container, .skills-container, .languages-container', { origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'left'});
ScrollReveal().reveal('.experience-item', { origin: 'left', interval: 150});
ScrollReveal().reveal('.skills-category', { origin: 'bottom', interval: 100});
ScrollReveal().reveal('.language-item', { origin: 'right', interval: 100});

// ========================= typed js =======================
const typed = new Typed('.multiple-text', {
    strings: ['IA Developer', 'Data Scientist', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    bakDelay: 1000,
    loop: true
});
