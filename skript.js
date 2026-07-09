const hamburgerDugme = document.getElementById('hamburger');
const navigacioniMeni = document.getElementById('nav-links');
const trenutniHeader = document.getElementById('header');

const zatvoriMeni = () => {
    if (!navigacioniMeni) return;
    
    if (navigacioniMeni.classList.contains('active')) {
        navigacioniMeni.classList.remove('active');
        if (hamburgerDugme) {
            hamburgerDugme.setAttribute('aria-expanded', 'false');
        }
    }
};

const toggleMeni = (e) => {
    if (e) e.stopPropagation();
    if (!navigacioniMeni) return;

    if (navigacioniMeni.classList.contains('active')) {
        navigacioniMeni.classList.remove('active');
        if (hamburgerDugme) {
            hamburgerDugme.setAttribute('aria-expanded', 'false');
        }
    } else {
        navigacioniMeni.classList.add('active');
        if (hamburgerDugme) {
            hamburgerDugme.setAttribute('aria-expanded', 'true');
        }
    }
};

if (hamburgerDugme) {
    hamburgerDugme.onclick = toggleMeni;
}

document.onclick = (e) => {
    if (!e) return;

    if (navigacioniMeni && navigacioniMeni.contains(e.target)) {
        if (e.target.tagName === 'A') {
            zatvoriMeni();
        }
        return;
    }
    
    if (hamburgerDugme && hamburgerDugme.contains(e.target)) return;

    zatvoriMeni();
};

const naviLinks = [];
if (navigacioniMeni) {
    const sviLinkovi = navigacioniMeni.getElementsByTagName('a');
    for (let i = 0; i < sviLinkovi.length; i++) {
        const href = sviLinkovi[i].getAttribute('href');
        if (href && href.includes('#')) {
            naviLinks.push(sviLinkovi[i]);
        }
    }
}

const dohvatiSekciju = (href) => {
    if (!href || !href.includes('#')) return null;
    const id = href.split('#')[1];
    return id ? document.getElementById(id) : null;
};

const parovi = naviLinks
    .map(link => ({ link, sekcija: dohvatiSekciju(link.getAttribute('href')) }))
    .filter(p => p.sekcija);

const oznaciBrziLink = () => {
    const pomak = (trenutniHeader ? trenutniHeader.offsetHeight : 0) + 10;
    const skrolPos = window.scrollY + pomak;

    parovi.forEach(({ link, sekcija }) => {
        const jeAktivan = skrolPos >= sekcija.offsetTop &&
                          skrolPos < sekcija.offsetTop + sekcija.offsetHeight;
        
        if (jeAktivan) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
};

const obradiSkrol = () => {
    zatvoriMeni();
    
    if (trenutniHeader) {
        if (window.scrollY > 50) {
            trenutniHeader.classList.add('scrolled');
        } else {
            trenutniHeader.classList.remove('scrolled');
        }
    }
    
    oznaciBrziLink();
};

window.onscroll = obradiSkrol;

const inicijalizujAnimacije = () => {
    const klaseZaAnimaciju = ['info-box', 'card', 'fact-box', 'feature-item', 'img-box'];
    const animiraniElementi = [];

    klaseZaAnimaciju.forEach(imeKlase => {
        const elementi = document.getElementsByClassName(imeKlase);
        for (let i = 0; i < elementi.length; i++) {
            animiraniElementi.push(elementi[i]);
        }
    });

    if (animiraniElementi.length > 0 && window.IntersectionObserver) {
        const posmatrac = new IntersectionObserver(
    (unosi) => {
        unosi.forEach((unos) => {
            if (unos.isIntersecting) {
                unos.target.classList.add('visible');
                posmatrac.unobserve(unos.target);
            }
        });
    },
            { threshold: 0.12 }
        );
        
        animiraniElementi.forEach(el => posmatrac.observe(el));
    }
};

window.onload = () => {
    oznaciBrziLink();
    inicijalizujAnimacije();
};