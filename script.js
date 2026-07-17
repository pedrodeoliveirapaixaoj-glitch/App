const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const icon = sender === 'user' ? 'fa-user' : 'fa-robot';
    msgDiv.innerHTML = `<div class="avatar"><i class="fas ${icon}"></i></div><div class="text">${text}</div>`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAIResponse() {
    const responses = ['Legal!', 'Entendi!', 'Bacana!', 'Interessante!', 'Excelente!'];
    return responses[Math.floor(Math.random() * responses.length)];
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        setTimeout(() => {
            addMessage(getAIResponse(), 'ai');
        }, 500);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});