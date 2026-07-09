document.addEventListener('DOMContentLoaded', () => {
    const galerijaSlike = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxSlika = document.getElementById('lightbox-img');
    const dugmeZatvori = document.getElementById('lightbox-close');
    const dugmeLevo = document.getElementById('lightbox-prev');
    const dugmeDesno = document.getElementById('lightbox-next');
    
    let trenutniIndeks = 0;

    if (!lightbox || galerijaSlike.length === 0) return;

    const otvoriLightbox = (indeks) => {
        if (window.matchMedia("(max-width: 892px)").matches) {
            return;
        }

        trenutniIndeks = indeks;
        lightboxSlika.src = galerijaSlike[trenutniIndeks].src;
        lightboxSlika.alt = galerijaSlike[trenutniIndeks].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const zatvoriLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => lightboxSlika.src = '', 350); 
    };

    const sledecaSlika = () => {
        trenutniIndeks = (trenutniIndeks === galerijaSlike.length - 1) ? 0 : trenutniIndeks + 1;
        otvoriLightbox(trenutniIndeks);
    };

    const prethodnaSlika = () => {
        trenutniIndeks = (trenutniIndeks === 0) ? galerijaSlike.length - 1 : trenutniIndeks - 1;
        otvoriLightbox(trenutniIndeks);
    };

    galerijaSlike.forEach((slika, indeks) => {
        slika.parentElement.addEventListener('click', () => otvoriLightbox(indeks));
        slika.parentElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') otvoriLightbox(indeks);
        });
    });

    dugmeZatvori.addEventListener('click', zatvoriLightbox);
    dugmeDesno.addEventListener('click', sledecaSlika);
    dugmeLevo.addEventListener('click', prethodnaSlika);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) zatvoriLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') zatvoriLightbox();
        if (e.key === 'ArrowRight') sledecaSlika();
        if (e.key === 'ArrowLeft') prethodnaSlika();
    });
});