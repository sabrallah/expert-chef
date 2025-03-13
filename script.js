// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Utility function for debouncing
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Smooth scroll with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        try {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.warn('Smooth scroll error:', error);
        }
    });
});

// Enhanced navbar animation
const navbar = document.querySelector('.navbar');
const handleScroll = () => {
    requestAnimationFrame(() => {
        try {
            if (window.scrollY > 50) {
                navbar.style.background = 'var(--primary-color)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        } catch (error) {
            console.warn('Navbar animation error:', error);
        }
    });
};

window.addEventListener('scroll', debounce(handleScroll, 10));

// Optimized hero section animations
const initHeroAnimations = () => {
    try {
        // Parallax effect with performance optimization
        gsap.to('.hero-section', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Sequenced text animations
        const timeline = gsap.timeline({defaults: {ease: 'power2.out'}});
        timeline
            .from('.hero-section h1', {
                y: 100,
                opacity: 0,
                duration: 1.2
            })
            .from('.hero-section p', {
                y: 50,
                opacity: 0,
                duration: 1
            }, '-=0.8')
            .from('.hero-section .btn', {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, '-=0.5');
    } catch (error) {
        console.warn('Hero animations error:', error);
    }
};

// Enhanced gallery animations with preloading
const initGalleryAnimations = () => {
    try {
        const carousel = document.querySelector('#dishesCarousel');
        const images = document.querySelectorAll('#dishesCarousel img');

        // Preload images
        const preloadImages = () => {
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    const newImg = new Image();
                    newImg.src = src;
                }
            });
        };

        if (carousel) {
            // Initial fade in of the first slide
            gsap.from('.carousel-item.active .gallery-item', {
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Handle slide transitions
            carousel.addEventListener('slide.bs.carousel', (e) => {
                // Fade out current slide
                gsap.to(e.relatedTarget, {
                    opacity: 0,
                    duration: 0,
                    immediateRender: false
                });

                // Fade in next slide
                gsap.to(e.relatedTarget, {
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power2.inOut'
                });

                // Animate caption
                const caption = e.relatedTarget.querySelector('.carousel-caption');
                if (caption) {
                    gsap.from(caption, {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        }

        // Start preloading
        preloadImages();

    } catch (error) {
        console.warn('Gallery animations error:', error);
    }
};

// Enhanced testimonials animations with hover effects
const initTestimonialsAnimations = () => {
    try {
        // Initial animation on scroll
        // Reset all cards to initial state first
        const testimonialCards = document.querySelectorAll('#testimonials .card');
        testimonialCards.forEach(card => {
            gsap.set(card, {
                clearProps: 'all',
                y: 0,
                scale: 1,
                opacity: 0
            });
        });

        // Animate cards on scroll
        ScrollTrigger.batch('#testimonials .card', {
            onEnter: elements => {
                gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out'
                });
            }
        });

        // Animate stars
        gsap.from('.testimonial-stars i', {
            scrollTrigger: {
                trigger: '.testimonial-stars',
                start: 'top center+=100'
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        });

        // Hover animations for testimonial cards
        const cards = document.querySelectorAll('#testimonials .card');
        cards.forEach(card => {
            const cardAnimation = gsap.timeline({ paused: true });
            
            // Reset the initial state of the card
            gsap.set(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            });

            cardAnimation
                .to(card, {
                    y: -20,
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                })
                .to(card.querySelector('img'), {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                }, 0)
                .to(card.querySelector('.testimonial-text'), {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                }, 0);

            card.addEventListener('mouseenter', () => {
                // Ensure card is in initial state before playing animation
                gsap.set(card, {
                    clearProps: 'all'
                });
                cardAnimation.play();
            });
            
            card.addEventListener('mouseleave', () => {
                cardAnimation.reverse();
            });
        });
    } catch (error) {
        console.warn('Testimonials animations error:', error);
    }
};

// Enhanced about section animations
const initAboutAnimations = () => {
    try {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top center+=100'
            }
        });

        timeline
            .from('#about h2', {
                x: -50,
                opacity: 0,
                duration: 0.8
            })
            .from('#about p', {
                y: 30,
                opacity: 0,
                duration: 0.6
            }, '-=0.4')
            .from('#about ul li', {
                x: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1
            }, '-=0.2');
    } catch (error) {
        console.warn('About animations error:', error);
    }
};

// Enhanced form animations
const initFormAnimations = () => {
    try {
        const formElements = document.querySelectorAll('.form-control');
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                gsap.to(element, {
                    scale: 1.02,
                    borderColor: 'var(--primary-color)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('blur', () => {
                gsap.to(element, {
                    scale: 1,
                    borderColor: 'var(--secondary-color)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    } catch (error) {
        console.warn('Form animations error:', error);
    }
};

// Social icons hover animation
const initSocialAnimations = () => {
    try {
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    y: -5,
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    } catch (error) {
        console.warn('Social animations error:', error);
    }
};

// Footer heart animation
const initFooterAnimations = () => {
    try {
        const heart = document.querySelector('.bi-heart-fill');
        if (heart) {
            gsap.to(heart, {
                scale: 1.2,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    } catch (error) {
        console.warn('Footer animations error:', error);
    }
};

// Mobile menu animation
const initMobileMenuAnimation = () => {
    try {
        const menuToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (menuToggler && navbarCollapse) {
            menuToggler.addEventListener('click', () => {
                const isExpanded = navbarCollapse.classList.contains('show');
                
                if (!isExpanded) {
                    gsap.from('.navbar-nav .nav-item', {
                        x: -20,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Mobile menu animation error:', error);
    }
};

// Initialize all animations
// Preloader
const preloader = document.createElement('div');
preloader.className = 'preload';
preloader.innerHTML = '<div class="preload-spinner"></div>';
document.body.appendChild(preloader);

// Resource loading optimization
const preloadResources = async () => {
    try {
        // Preload critical images
        const criticalImages = [
            'https://images.unsplash.com/photo-1544025162-d76694265947',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
        ];

        const preloadPromises = criticalImages.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src + '?auto=format&fit=crop&w=1470&q=80';
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        await Promise.all(preloadPromises);
    } catch (error) {
        console.warn('Image preloading error:', error);
    }
};

// Initialize all animations and remove preloader
const initializeApp = async () => {
    try {
        await preloadResources();
        
        // Initialize all animations
        initHeroAnimations();
        initGalleryAnimations();
        initTestimonialsAnimations();
        initAboutAnimations();
        initFormAnimations();
        initSocialAnimations();
        initFooterAnimations();
        initMobileMenuAnimation();

        // Remove preloader after initialization
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => preloader.remove()
            });
        }, 500);
    } catch (error) {
        console.warn('App initialization error:', error);
        preloader.remove(); // Remove preloader even if there's an error
    }
};

// Start initialization when DOM is ready
// Dark Mode Management
const initDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved dark mode preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            darkModeToggle.classList.add('active');
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.classList.add('active');
        darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            darkModeToggle.classList.add('active');
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            darkModeToggle.classList.remove('active');
            darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
        
        // Add transition effect
        gsap.from('body', {
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
};

// Menu Date Display
const initMenuDate = () => {
    const todayDateElement = document.querySelector('.today-date');
    if (todayDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('fr-FR', options);
        todayDateElement.textContent = today.charAt(0).toUpperCase() + today.slice(1);
    }
};

// Initialize Flatpickr calendar
const initReservationSystem = () => {
    try {
        // Initialize date picker
        const datePicker = flatpickr('#bookingDate', {
            dateFormat: 'd/m/Y',
            minDate: 'today',
            maxDate: new Date().fp_incr(30), // Allow booking up to 30 days in advance
            disable: [
                function(date) {
                    // Disable Sundays
                    return date.getDay() === 0;
                }
            ],
            locale: 'fr'
        });

        // Handle form submission
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    date: document.getElementById('bookingDate').value,
                    time: document.getElementById('bookingTime').value,
                    guests: document.getElementById('guests').value,
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    notes: document.getElementById('notes').value
                };

                try {
                    // Here you would typically send this to your server
                    // For now, we'll just show a success message
                    await simulateBookingRequest(formData);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.innerHTML = `
                        <h4>Réservation Confirmée!</h4>
                        <p>Merci ${formData.name}! Votre réservation pour ${formData.guests} personne(s) 
                        le ${formData.date} à ${formData.time} a été enregistrée.</p>
                        <p>Un email de confirmation a été envoyé à ${formData.email}.</p>
                    `;
                    
                    bookingForm.insertAdjacentElement('afterend', successMessage);
                    bookingForm.reset();

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);

                } catch (error) {
                    console.error('Booking error:', error);
                    alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
                }
            });
        }
    } catch (error) {
        console.warn('Reservation system initialization error:', error);
    }
};

// Simulate booking request
const simulateBookingRequest = (formData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Booking confirmed'
            });
        }, 1000);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initReservationSystem();
    initializeApp();
    initDarkMode();
    initMenuDate();
});
