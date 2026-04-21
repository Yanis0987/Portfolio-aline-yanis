// Navigation Active State
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.slice(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update active state
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        // Update active state on scroll
        window.addEventListener('scroll', () => this.updateActiveState());
        
        // Navbar background on scroll
        window.addEventListener('scroll', () => this.updateNavbarBackground());
    }
    
    updateActiveState() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    updateNavbarBackground() {
        if (window.scrollY > 50) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        this.init();
    }
    
    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.updateMenuState();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.updateMenuState();
    }
    
    updateMenuState() {
        if (this.isOpen) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = '#ffffff';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.padding = '20px';
            this.navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            this.navMenu.style.borderTop = '1px solid #e5e7eb';
            
            this.hamburger.classList.add('active');
        } else {
            this.navMenu.style.display = 'none';
            this.hamburger.classList.remove('active');
        }
    }
}

// Skills Filter
class SkillsFilter {
    constructor() {
        this.categories = document.querySelectorAll('.category');
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }
    
    init() {
        this.categories.forEach(category => {
            category.addEventListener('click', () => {
                const selectedCategory = category.dataset.category;
                this.filterSkills(selectedCategory);
                
                // Update active state
                this.categories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');
            });
        });
    }
    
    filterSkills(category) {
        this.skillCards.forEach(card => {
            const cardCategories = card.dataset.category;
            
            if (category === 'all' || cardCategories === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form form');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleContact(e));
        }
    }
    
    handleContact(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const contactData = {
            name: this.contactForm.querySelector('input[type="text"]').value,
            email: this.contactForm.querySelector('input[type="email"]').value,
            subject: this.contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: this.contactForm.querySelector('textarea').value
        };
        
        console.log('Formulaire de contact:', contactData);
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form
            this.contactForm.reset();
            
            // Show success message
            this.showNotification('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.', 'success');
        }, 1500);
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Intersection Observer for fade-in animations
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
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .about-card, .section-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
        
        // Animate skill bars when visible
        const skillBars = document.querySelectorAll('.level-bar');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
}

// Typing Effect for Hero Title
class TypingEffect {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        this.heroRole = document.querySelector('.hero-role');
        this.init();
    }
    
    init() {
        if (this.heroTitle) {
            this.typeText(this.heroTitle, 'ALLYN Folly Yanis Junior', 100);
        }
        
        if (this.heroRole) {
            setTimeout(() => {
                this.typeText(this.heroRole, 'Étudiant en Système & Réseau Informatique', 50);
            }, 2000);
        }
    }
    
    typeText(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// Particles Animation
class ParticlesAnimation {
    constructor() {
        this.particlesContainer = document.querySelector('.hero-particles');
        this.init();
    }
    
    init() {
        if (this.particlesContainer) {
            this.createParticles();
        }
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            this.particlesContainer.appendChild(particle);
        }
    }
}

// Project Cards Hover Effect
class ProjectCards {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                    image.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio d\'ALLYN Folly Yanis Junior initialisé');
    
    // Initialize components
    new Navigation();
    new MobileMenu();
    new SkillsFilter();
    new FormHandler();
    new ScrollAnimations();
    new TypingEffect();
    new ParticlesAnimation();
    new ProjectCards();
    
    // Add entrance animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    }
    
    .notification-content i {
        font-size: 20px;
        color: #2563eb;
    }
    
    .notification-content span {
        flex: 1;
        font-size: 16px;
        color: #1f2937;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        font-size: 16px;
        padding: 4px;
    }
    
    .notification-close:hover {
        color: #374151;
    }
`;
document.head.appendChild(style);
