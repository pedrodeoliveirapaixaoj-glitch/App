# 🌤️ Previsão do Tempo - Aplicativo Android

Um aplicativo moderno de previsão do tempo que busca dados em tempo real da **OpenWeatherMap API**.

## 🎯 Recursos

- ✅ Previsão do tempo em tempo real
- ✅ Integração com OpenWeatherMap API
- ✅ Localização automática via GPS
- ✅ Busca por cidade
- ✅ Previsão de 5 dias
- ✅ Funciona offline (PWA)
- ✅ Design responsivo
- ✅ Instalável como app Android

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
git clone -b weather-dashboard-apk https://github.com/pedrodeoliveirapaixaoj-glitch/App.git
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

## 🔑 Configurar API Key

1. Acesse: https://openweathermap.org/api
2. Crie uma conta gratuita
3. Copie sua API Key
4. Edite `script.js` e substitua:

```javascript
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0'; // Coloque sua chave aqui
```

## 📁 Estrutura do Projeto

```
├── index.html           # Interface HTML
├── script.js            # Lógica e API
├── style.css            # Estilos
├── manifest.json        # PWA Config
├── sw.js               # Service Worker
├── capacitor.config.json # Config Capacitor
├── package.json         # Dependências NPM
├── build.gradle         # Config Gradle
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

## 📊 Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Gradientes)
- JavaScript (ES6+)
- Capacitor (Framework para App Native)
- OpenWeatherMap API
- Service Worker (PWA)

## 📄 Licença

MIT - Livre para usar e modificar

---

**Desenvolvido por:** Pedro de Oliveira Paixãoção
