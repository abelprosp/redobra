// Redobrai Exact Site JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Redobrai site carregado com sucesso!');
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                alert('Obrigado por se inscrever na nossa newsletter!');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um email válido.');
            }
        });
    }
    
    // Button click handlers
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('demonstração') || buttonText.includes('Comece agora')) {
                e.preventDefault();
                // Simulate demo scheduling
                alert('Redirecionando para agendamento de demonstração...');
            } else if (buttonText.includes('Ver serviços')) {
                e.preventDefault();
                // Scroll to solutions section
                const solutionsSection = document.querySelector('.solutions');
                if (solutionsSection) {
                    solutionsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (buttonText.includes('Escolher plano') || buttonText.includes('Falar com especialista')) {
                e.preventDefault();
                // Simulate plan selection
                alert('Redirecionando para seleção de plano...');
            }
        });
    });
    
    // Intersection Observer for animations
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
    
    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.solution-card, .process-card, .benefit-card, .pricing-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(30px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Wireframe animation enhancement
    const wireframeLines = document.querySelectorAll('.wireframe-line');
    wireframeLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Enhanced wireframe animation on scroll
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add extra animation when hero is visible
                    const wireframeCircle = document.querySelector('.wireframe-circle');
                    if (wireframeCircle) {
                        wireframeCircle.style.animation = 'wireframe-pulse 2s ease-in-out infinite';
                    }
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Parallax effect for wireframe
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const wireframe = document.querySelector('.hero-wireframe');
        if (wireframe) {
            const speed = scrolled * 0.5;
            wireframe.style.transform = `translate(-50%, -50%) translateY(${speed}px)`;
        }
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.solution-card, .process-card, .benefit-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Pricing card special effects
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        featuredCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
            this.style.boxShadow = '0 30px 60px rgba(16, 185, 129, 0.2)';
        });
        
        featuredCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Mock UI animations
    const mockElements = document.querySelectorAll('.mock-task-manager, .mock-chat, .mock-crm, .mock-code');
    mockElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Process icon animations
    const processIcons = document.querySelectorAll('.process-icon');
    processIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // FAQ smooth expand/collapse
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        }
    });
    
    // Update FAQ functionality with smooth animations
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            if (item.classList.contains('active')) {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 30px';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 30px 25px';
                item.classList.add('active');
            }
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance optimization
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

// Console welcome message
console.log(`
🚀 Redobrai - Inteligência Empresarial
✨ Site carregado com sucesso!
📧 Contato: contato@redobrai.com
🌐 Website: www.redobrai.com
`);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Erro no site:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(function(registrationError) {
                console.log('Falha no registro do ServiceWorker:', registrationError);
            });
    });
}
