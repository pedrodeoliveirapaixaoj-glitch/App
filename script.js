const jokeText = document.getElementById('jokeText');
const jokeType = document.getElementById('jokeType');
const newJokeBtn = document.getElementById('newJoke');
const shareBtn = document.getElementById('shareBtn');

let currentJoke = '';

// Função para buscar uma piada da API
async function fetchJoke() {
    try {
        jokeText.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        jokeType.textContent = 'Carregando...';
        
        // Usando a API JokeAPI com suporte a português
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=pt');
        const data = await response.json();
        
        if (data.type === 'single') {
            currentJoke = data.joke;
            jokeType.textContent = 'Piada Única';
        } else if (data.type === 'twopart') {
            currentJoke = `${data.setup}\n\n${data.delivery}`;
            jokeType.textContent = 'Piada com Setup';
        }
        
        // Animar o texto
        jokeText.textContent = currentJoke;
        jokeText.classList.add('fade-in');
        setTimeout(() => jokeText.classList.remove('fade-in'), 500);
        
    } catch (error) {
        console.error('Erro ao buscar piada:', error);
        jokeText.textContent = '😅 Ops! Não consegui buscar uma piada. Tente novamente!';
        jokeType.textContent = 'Erro';
    }
}

// Função para compartilhar a piada
function shareJoke() {
    if (!currentJoke) {
        alert('Carregue uma piada primeiro!');
        return;
    }
    
    // Verificar se o navegador suporta Web Share API
    if (navigator.share) {
        navigator.share({
            title: 'Piada Hilária',
            text: currentJoke,
            url: window.location.href
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(currentJoke).then(() => {
            alert('Piada copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    }
}

// Event Listeners
newJokeBtn.addEventListener('click', fetchJoke);
shareBtn.addEventListener('click', shareJoke);

// Carregar uma piada ao abrir a página
fetchJoke();

// Carregar nova piada a cada 10 segundos (opcional)
// setInterval(fetchJoke, 10000);