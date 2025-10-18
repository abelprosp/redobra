// FAQ Functionality
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
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const header = document.querySelector('.header-content');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 24px;
                    cursor: pointer;
                }
            }
        `;
        document.head.appendChild(style);
        
        header.appendChild(menuButton);
    };
    
    // Initialize mobile menu
    createMobileMenu();
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

// Lazy loading for images (if added in future)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

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
