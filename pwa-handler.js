/**
 * PWA Installation Handler
 * Gerencia a instalação e exibição do prompt de instalação
 */

let deferredPrompt = null;
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const dismissInstallBtn = document.getElementById('dismiss-install');
const INSTALL_DISMISSED_KEY = 'manus_ai_install_dismissed';

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Check if user previously dismissed
    const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (!dismissed) {
        showInstallPrompt();
    }
});

function showInstallPrompt() {
    installPrompt.classList.remove('hidden');
}

function hideInstallPrompt() {
    installPrompt.classList.add('hidden');
}

// Install button click
installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        console.log('App instalado com sucesso!');
    }
    
    deferredPrompt = null;
    hideInstallPrompt();
});

// Dismiss button click
dismissInstallBtn.addEventListener('click', () => {
    localStorage.setItem(INSTALL_DISMISSED_KEY, 'true');
    hideInstallPrompt();
});

// Listen for successful installation
window.addEventListener('appinstalled', () => {
    console.log('PWA foi instalada!');
    deferredPrompt = null;
    hideInstallPrompt();
});

// Hide prompt after 10 seconds if not interacted
setTimeout(() => {
    if (deferredPrompt && !installPrompt.classList.contains('hidden')) {
        hideInstallPrompt();
    }
}, 10000);

// Check if app is installed
function isAppInstalled() {
    return window.navigator.standalone === true;
}

// Log installation status
if (isAppInstalled()) {
    console.log('App está sendo executado como PWA instalada');
} else {
    console.log('App está sendo executado no navegador');
}