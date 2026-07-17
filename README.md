# Aplicativo de Chat com IA - Manus AI

Este é um modelo de aplicativo de chat moderno, desenvolvido com HTML5, CSS3 e JavaScript. Ele foi projetado para ser leve, responsivo e fácil de transformar em um aplicativo nativo para Android, iOS ou Desktop.

## 🚀 Como Usar

1. **Extraia o arquivo .zip**.
2. **Abra o arquivo `index.html`** em qualquer navegador de internet (Chrome, Edge, Firefox, etc.).
3. Comece a digitar no campo de texto e interaja com a IA.

## 📱 Como transformar em Aplicativo Real

Existem várias maneiras de transformar este código em um aplicativo instalável:

### 1. Progressive Web App (PWA)
Você pode adicionar um arquivo `manifest.json` para que os usuários possam "Instalar" o site no celular como se fosse um app nativo.

### 2. Capacitor / Cordova (Android e iOS)
Use o **Capacitor** para converter este projeto web em um aplicativo nativo:
- Instale o Node.js.
- Execute: `npm install @capacitor/core @capacitor/cli`.
- Siga as instruções para gerar os arquivos do Android Studio ou Xcode.

### 3. Electron (Desktop)
Se quiser um programa para Windows, Mac ou Linux, use o **Electron** para "empacotar" o `index.html` em uma janela de aplicativo.

## 🧠 Conectando a uma IA Real
No arquivo `script.js`, você encontrará a função `getAIResponse`. Para usar uma IA de verdade como o ChatGPT:
1. Obtenha uma chave de API na OpenAI.
2. Substitua a lógica de simulação por uma chamada `fetch()` para a API da OpenAI.

---
*Desenvolvido por Manus AI*
