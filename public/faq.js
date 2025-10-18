// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando funcionalidade FAQ...');
    
    // Encontra todos os elementos de FAQ
    let faqItems = document.querySelectorAll('.faq-item, [data-faq-item], .accordion-item');
    
    if (faqItems.length === 0) {
        console.log('Procurando por elementos FAQ em containers...');
        
        // Procura por containers que possam conter FAQ
        const possibleFaqContainers = document.querySelectorAll('[class*="faq"], [id*="faq"], [class*="accordion"], [id*="accordion"], div[style*="background"], section');
        
        possibleFaqContainers.forEach(container => {
            // Procura por elementos que possam ser perguntas (divs com texto)
            const potentialQuestions = container.querySelectorAll('div[style*="cursor"], div[style*="background"], div[style*="border"], button, [role="button"], h1, h2, h3, h4, h5, h6, p');
            
            potentialQuestions.forEach(element => {
                // Verifica se o elemento tem texto e pode ser clicável
                if (element.textContent && element.textContent.trim().length > 10) {
                    element.style.cursor = 'pointer';
                    element.classList.add('faq-question');
                    
                    // Cria um container pai se não existir
                    let faqItem = element.closest('.faq-item');
                    if (!faqItem) {
                        faqItem = element.parentElement;
                        faqItem.classList.add('faq-item');
                    }
                    
                    element.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFaqItem(faqItem);
                    });
                }
            });
        });
        
        // Atualiza a lista de itens FAQ
        faqItems = document.querySelectorAll('.faq-item');
    }
    
    // Adiciona evento de clique para cada item de FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, [data-faq-question], .accordion-header, h3, h4');
        
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFaqItem(item);
            });
        }
    });
    
    function toggleFaqItem(item) {
        const answer = item.querySelector('.faq-answer, [data-faq-answer], .accordion-content, .accordion-body');
        const isActive = item.classList.contains('active') || item.classList.contains('open');
        
        // Fecha outros itens (comportamento accordion)
        const allItems = document.querySelectorAll('.faq-item, [data-faq-item], .accordion-item');
        allItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active', 'open');
                const otherAnswer = otherItem.querySelector('.faq-answer, [data-faq-answer], .accordion-content, .accordion-body');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.overflow = 'hidden';
                }
            }
        });
        
        // Toggle do item atual
        if (isActive) {
            item.classList.remove('active', 'open');
            if (answer) {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.overflow = 'hidden';
            }
        } else {
            item.classList.add('active', 'open');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.overflow = 'visible';
                answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            }
        }
    }
    
    // Inicializa todos os itens como fechados
    const allAnswers = document.querySelectorAll('.faq-answer, [data-faq-answer], .accordion-content, .accordion-body');
    allAnswers.forEach(answer => {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    });
});

