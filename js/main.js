/* ════════════ FILTROWANIE KATEGORII ════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            postCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                    card.classList.remove('animate-in');
                    requestAnimationFrame(() => {
                        card.classList.add('animate-in');
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ════════════ INTERSECTION OBSERVER ════════════ */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }

    /* ════════════ AUTO-HIDE HEADER NA SCROLL (throttled) ════════════ */
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    /* ════════════ HAMBURGER MENU ════════════ */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';

            if (isOpen) {
                const firstLink = mobileNav.querySelector('a');
                firstLink?.focus();
            }
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ════════════ SMOOTH SCROLL ════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
