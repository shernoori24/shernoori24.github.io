
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

// ========================= portfolio filter ======================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioBoxes.forEach(box => {
            if (filter === 'all' || box.getAttribute('data-category') === filter) {
                box.classList.remove('hidden');
            } else {
                box.classList.add('hidden');
            }
        });
    });
});

// ========================= portfolio modal =======================
const modal        = document.getElementById('projectModal');
const modalClose   = document.getElementById('modalClose');
const modalImg     = document.getElementById('modalImg');
const modalTitle   = document.getElementById('modalTitle');
const modalTags    = document.getElementById('modalTags');
const modalDesc    = document.getElementById('modalDesc');
const modalFeatures = document.getElementById('modalFeatures');
const modalLink    = document.getElementById('modalLink');

function openModal(box) {
    const title    = box.getAttribute('data-title')    || '';
    const img      = box.getAttribute('data-img')      || '';
    const desc     = box.getAttribute('data-desc')     || '';
    const features = box.getAttribute('data-features') || '';
    const tags     = box.getAttribute('data-tags')     || '';
    const link     = box.getAttribute('data-link')     || '';

    modalImg.src         = img;
    modalImg.alt         = title;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    modalTags.innerHTML = tags.split('|').map(t => `<span>${t.trim()}</span>`).join('');

    modalFeatures.innerHTML = features.split('|')
        .map(f => `<li>${f.trim()}</li>`).join('');

    if (link) {
        modalLink.href  = link;
        modalLink.style.display = 'inline-flex';
    } else {
        modalLink.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

portfolioBoxes.forEach(box => {
    box.addEventListener('click', () => openModal(box));
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ========================= typed js =======================
const typed = new Typed('.multiple-text', {
    strings: ['IA Developer', 'Data Scientist', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    bakDelay: 1000,
    loop: true
});
