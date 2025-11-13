// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});

// Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

// Magnetic Buttons Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .btn-small');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Utwórz overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animacja hamburgera
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Zamknij menu po kliknięciu w overlay
        overlay.addEventListener('click', closeMenu);
        
        // Zamknij menu po kliknięciu w link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Zamknij menu klawiszem ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    // Usuń active ze wszystkich slajdów
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Dodaj active do bieżącego slajdu
    currentSlide = n;
    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = heroSlides.length - 1;
    }
    
    if (heroSlides[currentSlide]) {
        heroSlides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000); // Zmiana co 5 sekund
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Inicjalizacja slidera
if (heroSlides.length > 0) {
    showSlide(0);
    startSlider();
    
    // Kliknięcie w kropki
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // Zatrzymaj slider po najechaniu myszką
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlider);
        heroSection.addEventListener('mouseleave', startSlider);
    }
}

// Catalog Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const catalogItems = document.querySelectorAll('.catalog-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Usuń active ze wszystkich przycisków
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Dodaj active do klikniętego przycisku
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            catalogItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    // Animacja pojawienia się
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pobierz wartości z formularza
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const consent = document.getElementById('consent').checked;
        
        // Podstawowa walidacja
        if (!name || !email || !message) {
            alert('Proszę wypełnić wszystkie wymagane pola.');
            return;
        }
        
        if (!consent) {
            alert('Proszę wyrazić zgodę na przetwarzanie danych osobowych.');
            return;
        }
        
        // Walidacja email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Proszę podać poprawny adres e-mail.');
            return;
        }
        
        // Symulacja wysłania formularza
        alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
        contactForm.reset();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in on Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animuj elementy przy scrollowaniu
const animateOnScroll = document.querySelectorAll('.event-card, .artist-card, .news-item, .catalog-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link based on current page
const currentLocation = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// Advanced Parallax Effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroSlides = document.querySelectorAll('.hero-slide img');
    heroSlides.forEach(slide => {
        slide.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
    });
    
    // Vertical text parallax
    const verticalTexts = document.querySelectorAll('.current-exhibition h2, .artists-section::before, .featured-artists::before');
    verticalTexts.forEach(text => {
        if (text) {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const relativeScroll = (window.innerHeight - rect.top) * 0.1;
                text.style.transform = `translateY(${relativeScroll}px)`;
            }
        }
    });
    
    // Stats counter animation on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            animateNumber(stat);
        }
    });
});

// Number Counter Animation
function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 16);
}

// Parallax effect dla hero (starszy kod - zostaje bez zmian dla kompatybilności)

// Lazy loading dla obrazków (dla lepszej wydajności)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback dla starszych przeglądarek
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Usuń active ze wszystkich przycisków
        langButtons.forEach(btn => btn.classList.remove('active'));
        // Dodaj active do klikniętego przycisku
        this.classList.add('active');
        
        const selectedLang = this.getAttribute('data-lang');
        console.log(`Język zmieniony na: ${selectedLang}`);
        
        // Tutaj możesz dodać logikę zmiany języka
        // np. localStorage.setItem('language', selectedLang);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        if (email) {
            alert('Dziękujemy za zapisanie się do newslettera!');
            emailInput.value = '';
        }
    });
}

// Page Loading Animation
window.addEventListener('load', function() {
    // Fade in content
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth Scroll Behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Image Lazy Loading dengan Fade In
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

// Observe wszystkie obrazy
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '1';
});

console.log('DD Art Gallery - Website loaded successfully');

