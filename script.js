const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const themeToggle = document.getElementById('theme-toggle');
const menuBtn = document.getElementById('menu-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const clearChatBtn = document.getElementById('clear-chat');
const exportChatBtn = document.getElementById('export-chat');
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const typingIndicator = document.getElementById('typing-indicator');

const STORAGE_KEY = 'manus_ai_chat_history';
const THEME_KEY = 'manus_ai_theme';

// ===== Tema =====
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcon(newTheme);
});

// ===== Menu =====
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
    menuDropdown.classList.remove('active');
});

// ===== Modal =====
aboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('active');
    menuDropdown.classList.remove('active');
});

const closeBtn = aboutModal.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    aboutModal.classList.remove('active');
});

aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove('active');
    }
});

// ===== Chat =====
function addMessage(text, sender, timestamp = new Date()) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    
    const icon = sender === 'user' ? 'fa-user' : 'fa-robot';
    const timeStr = formatTime(timestamp);
    
    msgDiv.innerHTML = `
        <div class="avatar"><i class="fas ${icon}"></i></div>
        <div class="message-container">
            <div class="text">${escapeHtml(text)}</div>
            <span class="timestamp">${timeStr}</span>
        </div>
    `;
    
    chatWindow.appendChild(msgDiv);
    scrollToBottom();
    saveChat();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes === 0) return 'agora';
    if (minutes < 60) return `${minutes}m atrás`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ===== IA Response =====
const responses = [
    "Isso é muito interessante! Conte-me mais.",
    "Entendi perfeitamente. Como posso ajudar com isso?",
    "Estou processando sua informação... Pronto!",
    "Excelente pergunta! Vou pesquisar para você.",
    "Como uma IA, estou aqui para facilitar sua vida.",
    "Que pergunta interessante! Deixe-me pensar sobre isso.",
    "Perfeito! Estou sempre aqui para ajudar.",
    "Vejo que você está pensando em algo importante.",
    "Adorei sua pergunta! Vamos explorar isso juntos.",
    "Compreendi! Vou te dar a melhor resposta possível."
];

async function getAIResponse(userText) {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, 800 + Math.random() * 400);
    });
}

// ===== Send Message =====
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show typing indicator
    typingIndicator.classList.add('active');
    
    try {
        const aiText = await getAIResponse(text);
        typingIndicator.classList.remove('active');
        addMessage(aiText, 'ai');
        
        // Notificação (se permitido)
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Manus AI', {
                body: aiText,
                icon: 'icon-192.png',
                badge: 'icon.svg'
            });
        }
    } catch (error) {
        typingIndicator.classList.remove('active');
        console.error('Erro ao obter resposta:', error);
    }
}

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// ===== Auto-resize textarea =====
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 100) + 'px';
});

// ===== Armazenamento Local =====
function saveChat() {
    const messages = [];
    document.querySelectorAll('.message').forEach(msg => {
        const sender = msg.classList.contains('user') ? 'user' : 'ai';
        const text = msg.querySelector('.text').textContent;
        const timestamp = new Date().toISOString();
        messages.push({ sender, text, timestamp });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function loadChat() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const messages = JSON.parse(saved);
            chatWindow.innerHTML = '';
            messages.forEach(msg => {
                addMessage(msg.text, msg.sender, new Date(msg.timestamp));
            });
        } catch (error) {
            console.error('Erro ao carregar chat:', error);
        }
    }
}

// ===== Limpar Chat =====
clearChatBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico de chat?')) {
        chatWindow.innerHTML = '';
        addMessage('Olá! Eu sou sua inteligência artificial. Como posso ajudar você hoje?', 'ai');
        localStorage.removeItem(STORAGE_KEY);
        menuDropdown.classList.remove('active');
    }
});

// ===== Exportar Chat =====
exportChatBtn.addEventListener('click', () => {
    const messages = [];
    document.querySelectorAll('.message').forEach(msg => {
        const sender = msg.classList.contains('user') ? 'Você' : 'Manus AI';
        const text = msg.querySelector('.text').textContent;
        messages.push(`${sender}: ${text}\n`);
    });
    
    const content = `Exportado em: ${new Date().toLocaleString()}\n\n${messages.join('')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manus-ai-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    menuDropdown.classList.remove('active');
});

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadChat();
    scrollToBottom();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

// ===== Offline Detection =====
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

window.addEventListener('online', () => {
    statusIndicator.classList.remove('offline');
    statusText.textContent = 'Online';
});

window.addEventListener('offline', () => {
    statusIndicator.classList.add('offline');
    statusText.textContent = 'Offline';
});

// Check initial online status
if (!navigator.onLine) {
    statusIndicator.classList.add('offline');
    statusText.textContent = 'Offline';
}