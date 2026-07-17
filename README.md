# Manus AI Chat - Assistente Inteligente

Um aplicativo moderno de chat com inteligência artificial, desenvolvido com HTML5, CSS3 e JavaScript. Funciona como um Progressive Web App (PWA) e pode ser instalado em qualquer dispositivo.

## 🚀 Características

- **Interface Moderna**: Design responsivo e intuitivo
- **Modo Escuro**: Alterna entre temas claro e escuro
- **Histórico de Conversa**: Acompanha todas as mensagens
- **Offline Ready**: Funciona mesmo sem conexão com internet (PWA)
- **Instalável**: Pode ser instalado como um aplicativo nativo
- **Rápido**: Carregamento instantâneo com cache
- **Responsivo**: Funciona perfeitamente em celular, tablet e desktop

## 📱 Como Usar

### No Navegador
1. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Safari, Edge)
2. Comece a digitar suas mensagens
3. Pressione Enter para enviar (ou Shift + Enter para nova linha)

### Como Instalar como App

#### Android
1. Abra o site no Chrome
2. Clique no menu (⋯) → "Instalar app" ou "Adicionar à tela de início"
3. O app será instalado na sua tela inicial

#### iOS
1. Abra o site no Safari
2. Clique no botão de compartilhamento
3. Selecione "Adicionar à Tela de Início"
4. O app será instalado na sua tela inicial

#### Windows/Mac/Linux
1. Abra o site em um navegador baseado em Chromium (Chrome, Edge, Brave)
2. Clique no ícone de instalação na barra de endereço
3. Confirme a instalação
4. O app será instalado e acessível no menu de aplicativos

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com variáveis CSS e animações
- **JavaScript**: Lógica da aplicação e interatividade
- **Service Worker**: Funcionalidade offline e cache
- **Web Manifest**: Instalação como app

## 🔧 Estrutura do Projeto

```
├── index.html          # Estrutura HTML
├── style.css           # Estilos e temas
├── script.js           # Lógica da aplicação
├── sw.js               # Service Worker
├── manifest.json       # Configuração PWA
├── icon-192.png        # Ícone 192x192
├── icon-512.png        # Ícone 512x512
└── README.md           # Este arquivo
```

## 🎨 Personalizações

### Alterar Cores
Edite as variáveis CSS em `style.css`:

```css
:root {
    --primary-color: #6366f1;      /* Cor principal */
    --secondary-color: #ec4899;    /* Cor secundária */
    --background-light: #f8fafc;   /* Fundo claro */
    --text-light: #1e293b;         /* Texto claro */
}
```

### Conectar a uma IA Real
No arquivo `script.js`, substitua a função `getAIResponse()` para conectar a uma API real:

```javascript
async function getAIResponse(userText) {
    // Exemplo com OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: conversationHistory
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

## 📦 Deploy

### GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings → Pages
3. Selecione a branch e pasta
4. Seu app estará disponível em `https://seu-usuario.github.io/seu-repo`

### Vercel / Netlify
1. Conecte seu repositório GitHub
2. Configure o build (não é necessário para PWA estático)
3. Deploy automático a cada push

### Servidor Próprio
1. Copie todos os arquivos para seu servidor web
2. Configure HTTPS (obrigatório para PWA em produção)
3. Acesse via seu domínio

## 🔐 Segurança

- Todas as mensagens são processadas localmente
- Nenhum dado é enviado para servidores (a menos que você configure uma API)
- HTTPS é recomendado para PWA em produção

## 📝 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Fazer pull requests

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ por Manus AI**

Última atualização: 2024
