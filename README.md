# 😂 Gerador de Piadas - Aplicativo Android

Um aplicativo divertido que gera piadas aleatórias em português usando a **JokeAPI**. Instal ável como um app nativo Android!

## 🎯 Recursos

- ✅ Gerador de piadas em tempo real
- ✅ Integração com JokeAPI (API externa)
- ✅ Suporte a dois tipos de piadas (única e com setup)
- ✅ Compartilhamento de piadas
- ✅ Funciona offline (PWA)
- ✅ Design moderno com gradiente roxo/azul
- ✅ Animas suaves
- ✅ Instal ável como app Android

## 🚀 Como Gerar o APK

### Pré-requisitos

1. **Node.js** (versão 14+)
   - Baixe em: https://nodejs.org/

2. **Java Development Kit (JDK 11+)**
   - Baixe em: https://www.oracle.com/java/

3. **Android SDK**
   - Via Android Studio: https://developer.android.com/studio

4. **Git**
   - Baixe em: https://git-scm.com/

### Passos para Gerar o APK

#### 1. Clone o repositório

```bash
git clone -b joke-generator-apk https://github.com/pedrodeoliveirapaixaoj-glitch/App.git
cd App
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Instale o Capacitor

```bash
npm install @capacitor/core @capacitor/cli
```

#### 4. Adicione a plataforma Android

```bash
npx cap add android
```

#### 5. Configure as variáveis de ambiente

```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11
set ANDROID_SDK_ROOT=C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk

# macOS/Linux
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export ANDROID_SDK_ROOT=~/Android/Sdk
```

#### 6. Sincronize os arquivos

```bash
npx cap sync
```

#### 7. Copie os assets

```bash
npx cap copy
```

#### 8. Abra no Android Studio

```bash
npx cap open android
```

#### 9. Gere o APK no Android Studio

1. Clique em **Build** no menu
2. Selecione **Build Bundle(s)/APK(s)**
3. Escolha **Build APK(s)**
4. Aguarde a compilação
5. Encontre o APK em: `android/app/build/outputs/apk/release/app-release.apk`

### Opção Alternativa: Linha de Comando

```bash
cd android
./gradlew assembleRelease
```

O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

## 📱 Instalar no Android

1. Copie o arquivo `app-release.apk` para seu dispositivo Android
2. Abra um gerenciador de arquivos
3. Navegue até o APK
4. Clique para instalar
5. Permita instalação de fontes desconhecidas (se necessário)
6. Pronto! O app está instalado

## 📂 Estrutura do Projeto

```
├── index.html           # Interface HTML
├── script.js            # Lógica e API
├── style.css            # Estilos
├── manifest.json        # PWA Config
├── sw.js               # Service Worker
├── capacitor.config.json # Config Capacitor
├── package.json         # Dependências NPM
└── android/             # Projeto Android (gerado automaticamente)
```

## 🛠️ Troubleshooting

**Problema: "Gradle não encontrado"**
```bash
cd android
./gradlew clean
./gradlew build
```

**Problema: "Android SDK não encontrado"**
- Configure a variável `ANDROID_SDK_ROOT` corretamente
- Verifique em Android Studio: Tools → SDK Manager

**Problema: "Java não encontrado"**
- Configure a variável `JAVA_HOME` corretamente
- Verifique: `java -version`

**Problema: "APK não instala"**
- Verifique se o dispositivo permite instalação de fontes desconhecidas
- Tente desinstalar versão antiga do app primeiro

## 🎨 Personalizar

### Alterar Paleta de Cores
Edite `style.css`:
```css
background: linear-gradient(135deg, #NOVA_COR1 0%, #NOVA_COR2 100%);
```

### Alterar Idioma
Edite `script.js`:
```javascript
// Para inglês
fetch('https://v2.jokeapi.dev/joke/Any?lang=en')

// Para espanhol
fetch('https://v2.jokeapi.dev/joke/Any?lang=es')
```

## 💻 Tecnologias

- HTML5
- CSS3 (Flexbox, Gradientes, Animações)
- JavaScript (ES6+)
- Capacitor (Framework para App Native)
- JokeAPI
- Service Worker (PWA)

## 📄 Licença

MIT - Livre para usar e modificar

---

**Desenvolvido por:** Pedro de Oliveira Paixão

**Divirta-se com piadas! 😂**