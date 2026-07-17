// Elementos do DOM
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const themeBtn = document.getElementById('theme-btn');
const msgCountEl = document.getElementById('msg-count');
const loadingIndicator = document.getElementById('loading-indicator');

// Estado da aplicação
let messageCount = 0;
let conversationHistory = [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Inicializar tema
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Função para adicionar mensagem na tela
function addMessage(text, sender, timestamp = new Date()) {
    // Remover mensagem de boas-vindas se for a primeira mensagem
    const welcomeMsg = chatWindow.querySelector('.welcome-message');
    if (welcomeMsg && sender === 'user') {
        welcomeMsg.remove();
    }

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    
    const icon = sender === 'user' ? 'fa-user' : 'fa-brain';
    const time = timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.innerHTML = `
        <div class="avatar"><i class="fas ${icon}"></i></div>
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Adicionar ao histórico
    conversationHistory.push({
        role: sender === 'user' ? 'user' : 'assistant',
        content: text,
        timestamp: timestamp
    });

    // Atualizar contador
    if (sender === 'user') {
        messageCount++;
        msgCountEl.textContent = messageCount;
    }
}

// Função para escapar HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Função para obter resposta da IA
async function getAIResponse(userText) {
    try {
        // Aqui você pode conectar a uma API real de IA
        // Por exemplo: OpenAI, Google Gemini, Hugging Face, etc.
        
        // Para demonstração, usamos respostas inteligentes baseadas em palavras-chave
        const responses = {
            'olá': 'Olá! Tudo bem? Como posso ajudá-lo hoje?',
            'oi': 'Oi! Seja bem-vindo! O que você gostaria de saber?',
            'como você está': 'Estou funcionando perfeitamente! Pronto para conversar com você.',
            'qual é seu nome': 'Sou o Manus AI, seu assistente inteligente. Prazer em conhecê-lo!',
            'obrigado': 'De nada! Fico feliz em ajudar. Há algo mais que eu possa fazer?',
            'adeus': 'Até logo! Foi um prazer conversar com você!',
            'tchau': 'Tchau! Volte sempre que precisar!',
            'ajuda': 'Claro! Sou um assistente de IA pronto para ajudar com perguntas, conversas e muito mais. O que você gostaria de saber?',
            'default': 'Que pergunta interessante! Deixe-me pensar sobre isso... Você poderia elaborar um pouco mais?'
        };

        // Procurar por palavras-chave na mensagem
        const lowerText = userText.toLowerCase();
        let response = responses.default;

        for (const [key, value] of Object.entries(responses)) {
            if (lowerText.includes(key)) {
                response = value;
                break;
            }
        }

        // Simular delay de processamento
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(response);
            }, 500 + Math.random() * 1000);
        });

    } catch (error) {
        console.error('Erro ao obter resposta da IA:', error);
        return 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente.';
    }
}

// Função para mostrar indicador de carregamento
function showLoading() {
    loadingIndicator.classList.add('active');
}

// Função para esconder indicador de carregamento
function hideLoading() {
    loadingIndicator.classList.remove('active');
}

// Função para limpar conversa
function clearConversation() {
    if (confirm('Tem certeza que deseja limpar toda a conversa?')) {
        chatWindow.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-sparkles"></i>
                </div>
                <h2>Bem-vindo ao Manus AI!</h2>
                <p>Estou aqui para ajudar com suas perguntas e conversas. Digite uma mensagem para começar.</p>
            </div>
        `;
        conversationHistory = [];
        messageCount = 0;
        msgCountEl.textContent = '0';
    }
}

// Função para alternar tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Evento de clique no botão enviar
sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text && !sendBtn.disabled) {
        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.disabled = true;

        // Adiciona indicador de digitação
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai');
        typingDiv.id = typingId;
        typingDiv.innerHTML = `
            <div class="avatar"><i class="fas fa-brain"></i></div>
            <div class="message-content">
                <div class="message-text">
                    <span class="typing-indicator">
                        <span></span><span></span><span></span>
                    </span>
                </div>
            </div>
        `;
        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        try {
            const aiText = await getAIResponse(text);
            document.getElementById(typingId).remove();
            addMessage(aiText, 'ai');
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById(typingId).remove();
            addMessage('Desculpe, ocorreu um erro. Tente novamente.', 'ai');
        } finally {
            sendBtn.disabled = false;
            userInput.focus();
        }
    }
});

// Enviar com a tecla Enter (Shift + Enter para nova linha)
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});

// Auto-resize do textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 100) + 'px';
});

// Eventos dos botões
clearBtn.addEventListener('click', clearConversation);
themeBtn.addEventListener('click', toggleTheme);

// Restaurar histórico de conversa (opcional)
window.addEventListener('load', () => {
    userInput.focus();
});

// Adicionar CSS para animação de digitação
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        display: inline-flex;
        gap: 3px;
    }
    
    .typing-indicator span {
        width: 6px;
        height: 6px;
        background: currentColor;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            opacity: 0.5;
            transform: translateY(0);
        }
        30% {
            opacity: 1;
            transform: translateY(-8px);
        }
    }
`;
document.head.appendChild(style);
