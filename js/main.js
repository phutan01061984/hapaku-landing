// ===== MOBILE MENU =====
const menuBtn = document.querySelector('.mobile-menu-btn');
const header = document.querySelector('.header');
if (menuBtn) {
    menuBtn.addEventListener('click', () => document.body.classList.toggle('nav-open'));
    document.querySelectorAll('.nav a').forEach(link =>
        link.addEventListener('click', () => document.body.classList.remove('nav-open'))
    );
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section > .container > *').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ===== HEADER SHADOW =====
window.addEventListener('scroll', () => {
    if (header) {
        header.style.boxShadow = window.pageYOffset > 80
            ? '0 4px 16px rgba(0,0,0,.1)'
            : '0 2px 10px rgba(0,0,0,.06)';
    }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.sstat-num').forEach(counter => {
        if (counter.dataset.animated) return;
        counter.dataset.animated = 'true';
        const text = counter.textContent;
        const match = text.match(/(\d[\d,]*)/);
        if (!match) return;
        const target = parseInt(match[1].replace(/,/g, ''));
        const suffix = text.replace(/[\d,]+/, '');
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = current.toLocaleString() + suffix;
        }, 30);
    });
}

const statsSection = document.querySelector('.story-stats');
if (statsSection) {
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounters(); }
        });
    }, { threshold: 0.3 }).observe(statsSection);
}
