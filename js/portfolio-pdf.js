// ============================================================
//  portfolio-pdf.js – Génération PDF Portfolio Sheraqa NOORI
// ============================================================

document.getElementById('downloadPortfolio').addEventListener('click', generatePDF);

function generatePDF() {
    const btn = document.getElementById('downloadPortfolio');
    btn.classList.add('loading');
    btn.querySelector('span').textContent = 'Génération...';

    setTimeout(() => {
        try {
            buildPDF();
        } finally {
            btn.classList.remove('loading');
            btn.querySelector('span').textContent = 'Portfolio PDF';
        }
    }, 100);
}

function buildPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const W = 210;       // largeur A4
    const MARGIN = 18;
    const CONTENT_W = W - MARGIN * 2;
    let y = 0;

    // Couleurs
    const CYAN    = [0, 200, 210];
    const BLACK   = [30, 30, 30];
    const GRAY    = [90, 90, 90];
    const LGRAY   = [180, 180, 180];
    const WHITE   = [255, 255, 255];
    const BG_HEAD = [20, 25, 35];

    // ── helpers ──────────────────────────────────────────────

    function newPage() {
        doc.addPage();
        y = MARGIN;
    }

    function checkY(needed = 12) {
        if (y + needed > 280) newPage();
    }

    function sectionTitle(text) {
        checkY(16);
        doc.setFillColor(...CYAN);
        doc.rect(MARGIN, y, 4, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(...BLACK);
        doc.text(text.toUpperCase(), MARGIN + 7, y + 6.5);
        doc.setDrawColor(...LGRAY);
        doc.line(MARGIN + 7, y + 9, W - MARGIN, y + 9);
        y += 14;
    }

    function tagBadge(text, x, badgeY) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        const tw = doc.getTextWidth(text);
        const pw = tw + 4;
        doc.setFillColor(240, 253, 255);
        doc.setDrawColor(...CYAN);
        doc.roundedRect(x, badgeY - 3.5, pw, 5.5, 1.2, 1.2, 'FD');
        doc.setTextColor(...CYAN);
        doc.text(text, x + 2, badgeY);
        return pw + 2;
    }

    function tagsRow(tagsArr, startX, rowY) {
        let tx = startX;
        tagsArr.forEach(tag => {
            const tw = doc.getTextWidth(tag.trim()) + 6;
            if (tx + tw > W - MARGIN) { rowY += 7; tx = startX; checkY(7); }
            tx += tagBadge(tag.trim(), tx, rowY);
        });
        return rowY;
    }

    function writeLine(text, fontSize, style, color, indent = 0) {
        checkY(fontSize * 0.5 + 3);
        doc.setFont('helvetica', style);
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);
        doc.text(text, MARGIN + indent, y);
        y += fontSize * 0.45 + 2;
    }

    function writeWrapped(text, fontSize, color, indent = 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, CONTENT_W - indent);
        lines.forEach(line => {
            checkY(fontSize * 0.45 + 2);
            doc.text(line, MARGIN + indent, y);
            y += fontSize * 0.45 + 2;
        });
    }

    // ── PAGE 1 : EN-TÊTE ─────────────────────────────────────

    // Fond header
    doc.setFillColor(...BG_HEAD);
    doc.rect(0, 0, W, 52, 'F');

    // Nom
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(...WHITE);
    doc.text('Sheraqa NOORI', MARGIN, 20);

    // Titre
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(...CYAN);
    doc.text('Développeur IA, Data Science & Web — Niv 6 Bac+3 | RNCP 36581', MARGIN, 28);

    // Infos contact
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text('shernoori24@gmail.com', MARGIN, 37);
    doc.text('Charleville-Mézières, France', MARGIN, 43);
    doc.text('github.com/shernoori24   |   linkedin.com/in/shernoori24', MARGIN, 49);

    y = 60;

    // ── À PROPOS ──────────────────────────────────────────────

    sectionTitle('À Propos');
    writeWrapped(
        'Développeur passionné spécialisé en Intelligence Artificielle, Data Science et développement web. ' +
        "J'ai conçu l'application Flask \"Plania\" pour la gestion d'apprenants et implémenté des modèles ML prédictifs. " +
        'Titulaire d\'un Bac+3 (Niv 6 – RNCP 36581), je suis curieux, autonome et motivé par les défis technologiques innovants.',
        10, BLACK
    );
    y += 4;

    // ── EXPÉRIENCES ───────────────────────────────────────────

    sectionTitle('Expériences Professionnelles');

    const experiences = [
        {
            title: 'Stagiaire Développement IA & Data Science',
            company: "Association J'SPR 08 — Charleville-Mézières",
            date: 'Juin – Septembre 2025',
            bullets: [
                'Développement de l\'application web Flask "Plania" : gestion d\'apprenants, plannings, pointages',
                'Implémentation de modèles ML prédictifs (analyse temporelle des inscriptions)',
                'Création d\'un dashboard analytique interactif'
            ]
        },
        {
            title: 'Stagiaire Développement Web',
            company: "Association J'SPR 08 — Charleville-Mézières",
            date: 'Février 2025',
            bullets: [
                'Conception d\'un site vitrine dynamique (HTML/CSS/JS/PHP)',
                'Mise en place d\'un back-office pour la gestion de contenu',
                'Initiation au traitement de données avec PHP/MySQL'
            ]
        },
        {
            title: 'Stagiaire Conseiller Vendeur',
            company: 'Leroy Merlin — Charleville-Mézières',
            date: 'Mai 2024',
            bullets: ['Conseil clients, mise en rayon, utilisation d\'outils informatiques']
        },
        {
            title: "Bénévole — Animateur d'Ateliers Sociolinguistiques",
            company: "Association J'SPR 08 — Charleville-Mézières",
            date: 'Janvier – Mars 2023',
            bullets: [
                "Conception et animation d'atelier à destination d'un public étranger",
                'Favorisation de l\'expression orale'
            ]
        },
        {
            title: 'Photographe',
            company: 'Tamadon Photography — Kaboul',
            date: 'Octobre 2020 – Juillet 2021',
            bullets: ['Prise de vue (mariages, portraits, événements) et retouche photo professionnelle']
        }
    ];

    experiences.forEach(exp => {
        checkY(20);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...BLACK);
        doc.text(exp.title, MARGIN, y);
        y += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...CYAN);
        doc.text(exp.company, MARGIN, y);
        y += 4.5;

        doc.setTextColor(...GRAY);
        doc.text(exp.date, MARGIN, y);
        y += 5;

        exp.bullets.forEach(b => {
            checkY(5);
            doc.setFillColor(...CYAN);
            doc.circle(MARGIN + 2, y - 1.5, 0.9, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...BLACK);
            const lines = doc.splitTextToSize(b, CONTENT_W - 8);
            lines.forEach((l, i) => {
                checkY(5);
                doc.text(l, MARGIN + 6, y);
                y += 4.5;
            });
        });
        y += 3;
    });

    // ── ÉDUCATION ─────────────────────────────────────────────

    sectionTitle('Éducation');

    const education = [
        { title: 'Développeur en Intelligence Artificielle et Data Science', org: 'Pôle Formation UIMM — Niv 6 Bac+3 | RNCP 36581', date: 'Avril 2025 – Décembre 2025' },
        { title: 'Développeur Web et Web Mobile', org: 'Alaji, Charleville-Mézières — Niv 5 Bac+2 | RNCP 37674', date: '2024 – 2025' },
        { title: "Systèmes d'information", org: 'Université de Kaboul', date: '2018 – 2021' }
    ];

    education.forEach(edu => {
        checkY(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...BLACK);
        doc.text(edu.title, MARGIN, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...GRAY);
        doc.text(`${edu.org}   •   ${edu.date}`, MARGIN, y);
        y += 8;
    });

    // ── COMPÉTENCES ───────────────────────────────────────────

    sectionTitle('Compétences');

    const skills = [
        { cat: 'Data Science / IA', tags: ['Python', 'Machine Learning', 'SQL', 'Power BI'] },
        { cat: 'Développement Web', tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'React', 'Flask', 'Django'] },
        { cat: 'Outils & Méthodes', tags: ['Git / GitHub', 'VS Code', 'Docker', 'Méthodologies Agiles'] },
        { cat: 'Soft Skills', tags: ['Autonomie', 'Créativité technique', "Esprit d'équipe"] }
    ];

    skills.forEach(s => {
        checkY(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...BLACK);
        doc.text(s.cat, MARGIN, y);
        y += 6;
        const endY = tagsRow(s.tags, MARGIN, y);
        y = endY + 8;
    });

    // ── PROJETS ───────────────────────────────────────────────

    sectionTitle('Projets');

    const boxes = document.querySelectorAll('.portfolio-box');
    boxes.forEach(box => {
        const title    = box.getAttribute('data-title')    || '';
        const desc     = box.getAttribute('data-desc')     || '';
        const features = box.getAttribute('data-features') || '';
        const tags     = box.getAttribute('data-tags')     || '';

        checkY(30);

        // Titre projet
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...BLACK);
        doc.text(title, MARGIN, y);
        y += 5.5;

        // Description
        writeWrapped(desc, 9, GRAY);
        y += 1;

        // Fonctionnalités
        if (features) {
            features.split('|').forEach(f => {
                checkY(5);
                doc.setFillColor(...CYAN);
                doc.circle(MARGIN + 2, y - 1.5, 0.9, 'F');
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...BLACK);
                const lines = doc.splitTextToSize(f.trim(), CONTENT_W - 8);
                lines.forEach(l => {
                    checkY(5);
                    doc.text(l, MARGIN + 6, y);
                    y += 4.5;
                });
            });
            y += 1;
        }

        // Tags
        if (tags) {
            const endY = tagsRow(tags.split('|'), MARGIN, y + 2);
            y = endY + 8;
        }

        // Séparateur
        checkY(4);
        doc.setDrawColor(...LGRAY);
        doc.line(MARGIN, y, W - MARGIN, y);
        y += 5;
    });

    // ── LANGUES ───────────────────────────────────────────────

    sectionTitle('Langues');

    const languages = [
        { name: 'Persan', level: 'Natif', pct: 1.0 },
        { name: 'Français', level: 'B2', pct: 0.70 },
        { name: 'Anglais', level: 'B2', pct: 0.70 },
        { name: 'Espagnol', level: 'A1', pct: 0.15 }
    ];

    const BAR_W = CONTENT_W * 0.55;
    languages.forEach(lang => {
        checkY(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...BLACK);
        doc.text(lang.name, MARGIN, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...CYAN);
        doc.text(lang.level, MARGIN + 30, y);

        // barre
        const bx = MARGIN + 55;
        const by = y - 3.5;
        doc.setFillColor(220, 240, 242);
        doc.roundedRect(bx, by, BAR_W, 4, 1, 1, 'F');
        doc.setFillColor(...CYAN);
        doc.roundedRect(bx, by, BAR_W * lang.pct, 4, 1, 1, 'F');

        y += 9;
    });

    // ── CONTACT ───────────────────────────────────────────────

    sectionTitle('Contact');
    checkY(20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...BLACK);
    doc.text('Email :',    MARGIN,      y); doc.setTextColor(...CYAN); doc.text('shernoori24@gmail.com',   MARGIN + 20, y); y += 7;
    doc.setTextColor(...BLACK);
    doc.text('Ville :',    MARGIN,      y); doc.setTextColor(...CYAN); doc.text('Charleville-Mézières, France', MARGIN + 20, y); y += 7;
    doc.setTextColor(...BLACK);
    doc.text('GitHub :',   MARGIN,      y); doc.setTextColor(...CYAN); doc.text('github.com/shernoori24',   MARGIN + 20, y); y += 7;
    doc.setTextColor(...BLACK);
    doc.text('LinkedIn :', MARGIN,      y); doc.setTextColor(...CYAN); doc.text('linkedin.com/in/shernoori24', MARGIN + 22, y);

    // ── Pied de page sur toutes les pages ─────────────────────

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...LGRAY);
        doc.text(`Sheraqa NOORI — Portfolio ${new Date().getFullYear()}`, MARGIN, 293);
        doc.text(`${i} / ${totalPages}`, W - MARGIN, 293, { align: 'right' });
    }

    doc.save('portfolio-sheraqa-noori.pdf');
}
