const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Função para adicionar mensagem na tela
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    
    const icon = sender === 'user' ? 'fa-user' : 'fa-robot';
    
    msgDiv.innerHTML = `
        <div class="avatar"><i class="fas ${icon}"></i></div>
        <div class="text">${text}</div>
    `;
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Simulação de resposta da IA
async function getAIResponse(userText) {
    // Aqui você poderia conectar a uma API real (ex: OpenAI)
    // Por enquanto, vamos usar uma lógica simples de resposta
    const responses = [
        "Isso é muito interessante! Conte-me mais.",
        "Entendi perfeitamente. Como posso ajudar com isso?",
        "Estou processando sua informação... Pronto!",
        "Excelente pergunta! Vou pesquisar para você.",
        "Como uma IA, estou aqui para facilitar sua vida."
    ];
    
    return new Promise(resolve => {
        setTimeout(() => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, 1000);
    });
}

// Evento de clique no botão enviar
sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        
        // Adiciona um indicador de "digitando"
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai');
        typingDiv.id = typingId;
        typingDiv.innerHTML = `
            <div class="avatar"><i class="fas fa-robot"></i></div>
            <div class="text">...</div>
        `;
        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        const aiText = await getAIResponse(text);
        
        // Remove indicador e mostra resposta real
        document.getElementById(typingId).remove();
        addMessage(aiText, 'ai');
    }
});

// Enviar com a tecla Enter
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});
