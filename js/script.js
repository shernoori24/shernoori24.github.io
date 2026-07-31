
// ============ toggle icon navbar =========
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const headerEl = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ============ smooth anchor scroll (desktop + mobile) =========
function getScrollOffset() {
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    return headerHeight + 12;
}

function smoothScrollToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') return;

        const target = document.querySelector(hash);
        if (!target) return;

        e.preventDefault();

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        smoothScrollToHash(hash);
        history.replaceState(null, '', hash);
    });
});


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
if (!prefersReducedMotion && typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        // reset:true,
        distance: '42px',
        duration: 900,
        delay: 90,
        opacity: 0,
        scale: 0.985,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .experiences-container, .skills-container, .languages-container', { origin: 'bottom'});
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'left'});
    ScrollReveal().reveal('.services-box', { origin: 'bottom', interval: 85, distance: '28px' });
    ScrollReveal().reveal('.experience-item', { origin: 'left', interval: 95, distance: '32px' });
    ScrollReveal().reveal('.skills-category', { origin: 'bottom', interval: 75, distance: '26px' });
    ScrollReveal().reveal('.language-item', { origin: 'right', interval: 75, distance: '24px' });
}

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

    const tagList = tags
        .split('|')
        .map(t => t.trim())
        .filter(Boolean);
    modalTags.innerHTML = tagList.map(t => `<span>${t}</span>`).join('');

    const featureList = features
        .split('|')
        .map(f => f.trim())
        .filter(Boolean);
    modalFeatures.innerHTML = featureList
        .map(f => `<li>${f}</li>`).join('');

    if (link) {
        modalLink.href  = link;
        modalLink.style.display = 'inline-flex';
        if (link.includes('github.com')) {
            modalLink.innerHTML = "<i class='bx bxl-github'></i> Voir le code";
        } else {
            modalLink.innerHTML = "<i class='bx bx-link-external'></i> Voir le site";
        }
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
if (!prefersReducedMotion && typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['IA Developer', 'Data Scientist', 'Web Developer'],
        typeSpeed: 86,
        backSpeed: 64,
        backDelay: 1000,
        loop: true
    });
} else {
    const multipleText = document.querySelector('.multiple-text');
    if (multipleText) {
        multipleText.textContent = 'Développeur IA';
    }
}
