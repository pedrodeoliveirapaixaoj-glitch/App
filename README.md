# Aplicativo de Chat com IA - Manus AI

## 📱 Versão 2.0 - PWA Melhorada

Este é um modelo de aplicativo de chat moderno, desenvolvido com HTML5, CSS3 e JavaScript. Ele é uma **Progressive Web App (PWA)** totalmente funcional que pode ser instalada como um aplicativo nativo em Android, iOS e Desktop.

### ✨ Novas Funcionalidades na v2.0

- 🌙 **Tema Claro/Escuro** - Alterne entre temas com um clique
- 💾 **Histórico Salvo** - Suas conversas são salvas automaticamente
- 📤 **Exportar Chat** - Baixe o histórico em arquivo TXT
- 🔔 **Notificações Push** - Receba notificações das respostas
- 📡 **Offline First** - Funciona completamente offline
- ⚡ **Performance Otimizada** - Carregamento rápido com cache inteligente
- 📱 **Totalmente Responsivo** - Perfeito em qualquer dispositivo
- 🎨 **Animações Suaves** - Interface intuitiva e moderna

## 🚀 Como Usar

### No Navegador (Web)

1. **Abra o arquivo `index.html`** em qualquer navegador moderno (Chrome, Edge, Firefox, Safari)
2. Comece a digitar no campo de texto e interaja com a IA
3. Clique no ícone de **lua** para alternar entre tema claro e escuro
4. Use o **menu** (três pontos) para limpar chat, exportar ou ver informações

### Instalar como PWA

#### Android (Chrome, Edge, Firefox)
1. Abra a aplicação no navegador
2. Clique no menu (⋮) do navegador
3. Selecione "Instalar app" ou "Adicionar à tela inicial"
4. Confirme - o app será adicionado à sua tela inicial

#### iOS (Safari)
1. Abra a aplicação no Safari
2. Clique no ícone de **compartilhamento**
3. Selecione "Adicionar à tela inicial"
4. Dê um nome e adicione

#### Desktop (Windows, Mac, Linux)
1. Abra a aplicação em Chrome/Edge
2. Clique no ícone de **instalação** na barra de endereço
3. Confirme para instalar como aplicativo standalone

## 🏗️ Como Transformar em Aplicativo Real (APK)

Existem várias maneiras de gerar um APK instalável para Android:

### Opção 1: PWA Builder (Recomendado - Online)
Mais simples e rápido:
1. Acesse: https://www.pwabuilder.com
2. Cole a URL do seu app: `https://seu-dominio.com`
3. Clique em "Start"
4. Faça o download do APK gerado
5. Instale no seu Android

**Vantagens:**
- ✅ Sem configuração local
- ✅ Suporte automático a Android e iOS
- ✅ Fácil e rápido

### Opção 2: Capacitor (Recomendado - Mais Controle)
Perfecto para desenvolvimento local:

```bash
# Instale o Node.js (se não tiver)
# https://nodejs.org/

# Clone ou baixe este projeto
cd seu-projeto

# Instale dependências
npm install @capacitor/core @capacitor/cli

# Inicialize Capacitor
npx cap init

# Adicione a plataforma Android
npx cap add android

# Sincronize os arquivos
npx cap sync

# Abra no Android Studio
npx cap open android
```

No Android Studio:
1. Clique em "Run" → "Run 'app'"
2. Selecione seu dispositivo ou emulador
3. Aguarde a compilação
4. O app será instalado automaticamente

Para gerar o APK:
1. Em Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Aguarde a compilação
3. Encontre o APK em: `app/build/outputs/apk/debug/`

### Opção 3: Cordova
Alternativa a Capacitor:

```bash
# Instale Cordova globalmente
npm install -g cordova

# Crie um novo projeto Cordova
cordova create ManusAI com.manusai.app "Manus AI"
cd ManusAI

# Copie os arquivos deste repositório para www/

# Adicione Android
cordova platform add android

# Compile
cordova build android

# O APK estará em: platforms/android/app/build/outputs/apk/debug/
```

### Opção 4: React Native (Para Desenvolvimento Avançado)

```bash
npx react-native init ManusAI
cd ManusAI
# Converta os arquivos HTML/CSS/JS para React Native
npx react-native run-android
```

## 🧠 Conectando a uma IA Real

Atualmente, o app usa respostas simuladas. Para conectar a uma IA real:

### 1. Com OpenAI (ChatGPT)

```javascript
// No arquivo script.js, substitua a função getAIResponse:

async function getAIResponse(userText) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer SEU_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Você é um assistente amigável chamado Manus AI.' },
                    { role: 'user', content: userText }
                ],
                max_tokens: 150
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Erro:', error);
        return 'Desculpe, não consegui processar sua mensagem.';
    }
}
```

**Como obter a chave API:**
1. Acesse: https://platform.openai.com/
2. Faça login ou crie uma conta
3. Vá em "API keys"
4. Clique em "Create new secret key"
5. Copie a chave

### 2. Com Hugging Face

```javascript
async function getAIResponse(userText) {
    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/gpt2',
            {
                headers: { Authorization: 'Bearer SEU_HF_TOKEN' },
                method: 'POST',
                body: JSON.stringify({ inputs: userText }),
            }
        );
        const result = await response.json();
        return result[0].generated_text;
    } catch (error) {
        return 'Erro ao conectar com a IA.';
    }
}
```

### 3. Com Servidor Local

```javascript
async function getAIResponse(userText) {
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        const data = await response.json();
        return data.reply;
    } catch (error) {
        return 'Não consegui conectar com o servidor.';
    }
}
```

## 📁 Estrutura de Arquivos

```
├── index.html          # Estrutura HTML (interface)
├── style.css           # Estilos (temas, animações, responsividade)
├── script.js           # Lógica do chat, tema, menu
├── pwa-handler.js      # Gerenciador de instalação PWA
├── sw.js               # Service Worker (cache e offline)
├── manifest.json       # Configuração de instalação
├── icon.svg            # Ícone vetorial
├── icon-192.png        # Ícone 192x192
├── icon-512.png        # Ícone 512x512
└── README.md           # Este arquivo
```

## 🔧 Desenvolvendo Localmente

### Com Live Server (Recomendado)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"
4. O app abrirá em `http://localhost:5500`

### Com Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Acesse: `http://localhost:8000`

### Com Node.js

```bash
npm install -g http-server
http-server
```
Acesse: `http://localhost:8080`

## 🌐 Hospedando Online

### GitHub Pages (Gratuito)

1. Faça push do código para seu repositório GitHub
2. Vá em Settings → Pages
3. Selecione "Deploy from a branch"
4. Escolha a branch "main"
5. Clique em Save
6. Seu app estará em: `https://seu-usuario.github.io/seu-repo`

### Netlify (Recomendado - Gratuito)

1. Acesse: https://netlify.com
2. Clique em "Add new site"
3. Escolha "Deploy manually"
4. Arraste a pasta do projeto
5. Seu app estará online em minutos!

### Vercel

```bash
npm i -g vercel
vercel
```

## 📊 Checklist PWA

- ✅ `manifest.json` configurado
- ✅ Service Worker implementado
- ✅ Ícones em múltiplos tamanhos
- ✅ HTTPS (obrigatório em produção)
- ✅ Responsivo em dispositivos móveis
- ✅ Funciona offline
- ✅ Instalável como app
- ✅ Tema adaptável
- ✅ Notificações push
- ✅ Performance otimizada

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
1. Fazer um Fork
2. Criar uma Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Desenvolvido por

**Manus AI Team**

---

## 🆘 Suporte

Tem dúvidas? Confira:
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [OpenAI API Docs](https://platform.openai.com/docs/)

---

**⭐ Se gostou, deixe uma estrela no GitHub!**