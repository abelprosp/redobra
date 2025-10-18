// FAQ Detector - Script específico para detectar e ativar FAQ
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Procurando seção FAQ...');
    
    // Aguarda um pouco para garantir que o conteúdo foi carregado
    setTimeout(() => {
        detectAndActivateFAQ();
    }, 1000);
});

function detectAndActivateFAQ() {
    console.log('🎯 Iniciando detecção de FAQ...');
    
    // Procura por elementos que possam ser perguntas FAQ
    const allDivs = document.querySelectorAll('div');
    let faqElements = [];
    
    allDivs.forEach(div => {
        const text = div.textContent?.trim() || '';
        
        // Verifica se o texto parece uma pergunta FAQ
        if (isFAQQuestion(text)) {
            console.log('📝 Pergunta FAQ encontrada:', text.substring(0, 50) + '...');
            
            // Adiciona classes e funcionalidade
            div.classList.add('faq-question');
            div.style.cursor = 'pointer';
            div.style.userSelect = 'none';
            
            // Encontra o container pai
            let container = div.parentElement;
            while (container && !container.classList.contains('faq-item')) {
                container.classList.add('faq-item');
                break;
            }
            
            if (!container) {
                container = div.parentElement;
                container.classList.add('faq-item');
            }
            
            // Adiciona evento de clique
            div.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFAQItem(container);
            });
            
            faqElements.push(container);
        }
    });
    
    console.log(`✅ ${faqElements.length} elementos FAQ encontrados e ativados`);
    
    // Adiciona estilos globais se necessário
    addGlobalFAQStyles();
}

function isFAQQuestion(text) {
    const faqKeywords = [
        'automação', 'negócio', 'integrar', 'setores', 'técnico', 'suporte',
        'como', 'quais', 'preciso', 'que tipo', 'ajudar', 'beneficiar',
        'difícil', 'conhecimento', 'oferecem'
    ];
    
    const questionWords = ['como', 'quais', 'preciso', 'que', 'onde', 'quando', 'por que'];
    
    // Verifica se contém palavras-chave de FAQ
    const hasKeywords = faqKeywords.some(keyword => 
        text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // Verifica se parece uma pergunta
    const isQuestion = questionWords.some(word => 
        text.toLowerCase().startsWith(word.toLowerCase())
    ) || text.includes('?');
    
    // Verifica se tem tamanho adequado para ser uma pergunta
    const hasGoodLength = text.length > 20 && text.length < 200;
    
    return hasKeywords && (isQuestion || hasGoodLength);
}

function toggleFAQItem(container) {
    const isActive = container.classList.contains('active');
    
    // Remove active de todos os outros itens
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== container) {
            item.classList.remove('active');
            hideAnswer(item);
        }
    });
    
    // Toggle do item atual
    if (isActive) {
        container.classList.remove('active');
        hideAnswer(container);
    } else {
        container.classList.add('active');
        showAnswer(container);
    }
}

function showAnswer(container) {
    // Procura por elemento de resposta ou cria um
    let answer = container.querySelector('.faq-answer');
    
    if (!answer) {
        // Cria um elemento de resposta temporário
        answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = `
            <p>Esta é uma resposta de exemplo. Clique para expandir e ver mais detalhes sobre esta pergunta.</p>
            <p>Você pode personalizar esta resposta editando o conteúdo HTML.</p>
        `;
        container.appendChild(answer);
    }
    
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.opacity = '1';
    answer.style.overflow = 'visible';
}

function hideAnswer(container) {
    const answer = container.querySelector('.faq-answer');
    if (answer) {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
    }
}

function addGlobalFAQStyles() {
    // Adiciona estilos inline se necessário
    const style = document.createElement('style');
    style.textContent = `
        .faq-item {
            transition: all 0.3s ease;
            position: relative;
        }
        
        .faq-item::after {
            content: '▼';
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 14px;
            transition: transform 0.3s ease;
            pointer-events: none;
        }
        
        .faq-item.active::after {
            transform: translateY(-50%) rotate(180deg);
        }
        
        .faq-answer {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, opacity 0.3s ease;
            padding: 0 20px;
        }
        
        .faq-item.active .faq-answer {
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
}
