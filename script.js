// Navigation mobile toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Variables pour le slideshow
let currentSlideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Fonction pour afficher une slide spécifique
function showSlide(index) {
    // Retirer la classe active de toutes les slides et indicateurs
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Ajouter la classe active à la slide et l'indicateur actuels
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

// Fonction pour aller à la slide suivante
function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

// Fonction pour aller à la slide précédente
function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

// Fonction pour changer de slide (utilisée par les boutons nav)
function changeSlide(direction) {
    if (direction > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
    // Redémarrer le timer automatique
    resetSlideTimer();
}

// Fonction pour aller directement à une slide (utilisée par les indicateurs)
function currentSlide(slideNumber) {
    showSlide(slideNumber - 1);
    resetSlideTimer();
}

// Fonction pour démarrer le slideshow automatique
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 3000); // 3 secondes
}

// Fonction pour arrêter le slideshow
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Fonction pour redémarrer le timer
function resetSlideTimer() {
    stopSlideshow();
    startSlideshow();
}

// Initialiser le slideshow au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Démarrer le slideshow automatique
    startSlideshow();
    
    // Pause le slideshow quand on survole la section hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }
    
    // Gestion du clavier pour navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// Faire les fonctions disponibles globalement pour les attributs onclick
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scrolling effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajustement pour la navbar fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.menu-category, .specialite-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulaire de réservation
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const guests = this.querySelector('select').value;
        
        // Validation basique
        if (!name || !phone || !date || !guests) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Vérifier que la date n'est pas dans le passé
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Veuillez sélectionner une date future.');
            return;
        }
        
        // Simulation d'envoi de réservation
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler un délai d'envoi
        setTimeout(() => {
            alert(`Merci ${name}! Votre réservation pour ${guests} personne(s) le ${formatDate(date)} a été envoyée. Nous vous confirmerons par téléphone au ${phone}.`);
            
            // Reset du formulaire
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Animation du bouton CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
}

// Menu items hover effect
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8f9fa';
        this.style.borderRadius = '8px';
        this.style.padding = '1rem';
        this.style.margin = '0 -1rem';
        this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.padding = '1rem 0';
        this.style.margin = '0';
    });
});

// Effet de transition fluide pour les slides
function addSlideTransition() {
    const activeSlide = document.querySelector('.hero-slide.active');
    if (activeSlide) {
        activeSlide.style.transform = 'scale(1.02)';
        setTimeout(() => {
            activeSlide.style.transform = 'scale(1)';
        }, 500);
    }
}

// Mettre à jour la fonction showSlide pour inclure l'effet de transition
function showSlide(index) {
    // Retirer la classe active de toutes les slides et indicateurs
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Ajouter la classe active à la slide et l'indicateur actuels
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
    
    // Ajouter l'effet de transition
    setTimeout(addSlideTransition, 100);
}

// Animation des cartes de spécialités
document.querySelectorAll('.specialite-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(212, 175, 55, 0.1)';
        this.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.borderColor = 'rgba(212, 175, 55, 0.2)';
    });
});

// Gestion du thème sombre (fonctionnalité bonus)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d4af37;
        border: none;
        color: #1a2332;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Initialiser le toggle de thème
document.addEventListener('DOMContentLoaded', createThemeToggle);

// Gestion des erreurs de chargement d'images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Animation du scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / window.innerHeight;
        if (scrollPercent > 0.1) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Préloader simple
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Gestion du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les positions si nécessaire
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);
});

// Effet de tape à l'écriture pour le titre (optionnel)
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation du compteur pour les années d'expérience
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Console Easter Egg
console.log(`
🍽️ Bienvenue chez Riad Salam! 🍽️
Merci de visiter notre site web.
Pour toute question technique, contactez notre équipe de développement.

Site créé avec ❤️ pour préserver l'authenticité de la cuisine marocaine.
`);

// Fonctions utilitaires
const utils = {
    // Debounce function pour optimiser les performances
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Fonction pour détecter si un élément est visible
    isElementVisible: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
