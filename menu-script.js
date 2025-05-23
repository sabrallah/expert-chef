// Menu Page JavaScript

// Variables pour le filtrage des catégories
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

// Fonction pour filtrer les cartes du menu
function filterMenuCards(category) {
    menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.position = 'relative';
                card.style.visibility = 'visible';
            }, 100);
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.position = 'absolute';
                card.style.visibility = 'hidden';
            }, 500);
        }
    });
}

// Fonction pour activer un onglet
function activateTab(clickedTab) {
    // Retirer la classe active de tous les onglets
    menuTabs.forEach(tab => tab.classList.remove('active'));
    
    // Ajouter la classe active à l'onglet cliqué
    clickedTab.classList.add('active');
    
    // Filtrer les cartes
    const category = clickedTab.getAttribute('data-category');
    filterMenuCards(category);
}

// Initialisation des événements
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les événements de clic aux onglets
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateTab(tab);
        });
    });
    
    // Animation d'apparition des cartes au chargement
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animation de défilement fluide pour les ancres
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
    
    // Effet parallaxe léger sur le hero
    const menuHero = document.querySelector('.menu-hero');
    if (menuHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            menuHero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Animation des badges au survol des cartes
    menuCards.forEach(card => {
        const badge = card.querySelector('.menu-card-badge');
        if (badge) {
            card.addEventListener('mouseenter', () => {
                badge.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                badge.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
});

// Fonction utilitaire pour animer l'apparition des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Lancer l'animation au scroll si l'API Intersection Observer est supportée
if ('IntersectionObserver' in window) {
    animateOnScroll();
}

// Gestion du menu mobile (si nécessaire)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
