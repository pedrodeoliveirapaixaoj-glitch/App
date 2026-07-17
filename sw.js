const CACHE_NAME = 'manus-ai-v2';
const RUNTIME_CACHE = 'manus-ai-runtime';

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/pwa-handler.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/icon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache essential assets
self.addEventListener('install', (e) => {
    console.log('Service Worker installing...');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching app shell');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (e) => {
    console.log('Service Worker activating...');
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (e) => {
    // Skip non-GET requests
    if (e.request.method !== 'GET') {
        return;
    }

    // Handle different request types
    if (e.request.destination === 'image' ||
        e.request.destination === 'font' ||
        e.request.url.includes('cdnjs.cloudflare.com')) {
        // Cache first strategy for static assets
        e.respondWith(cacheFirst(e.request));
    } else {
        // Network first strategy for documents and APIs
        e.respondWith(networkFirst(e.request));
    }
});

// Cache first strategy
function cacheFirst(request) {
    return caches.match(request).then((response) => {
        if (response) {
            return response;
        }
        return fetch(request).then((response) => {
            if (response.ok) {
                caches.open(RUNTIME_CACHE).then((cache) => {
                    cache.put(request, response.clone());
                });
            }
            return response;
        }).catch(() => {
            return new Response('Offline - Recurso não disponível', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        });
    });
}

// Network first strategy
function networkFirst(request) {
    return fetch(request).then((response) => {
        if (response.ok) {
            caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, response.clone());
            });
        }
        return response;
    }).catch(() => {
        return caches.match(request).then((response) => {
            if (response) {
                return response;
            }
            return new Response('Offline - Recurso não disponível', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        });
    });
}

// Handle background sync for future use
self.addEventListener('sync', (e) => {
    if (e.tag === 'sync-messages') {
        e.waitUntil(syncMessages());
    }
});

async function syncMessages() {
    try {
        // Aqui você poderia sincronizar mensagens quando voltar online
        console.log('Sincronizando mensagens...');
    } catch (error) {
        console.error('Erro ao sincronizar:', error);
    }
}

// Push notification handler
self.addEventListener('push', (e) => {
    const data = e.data ? e.data.json() : {};
    const options = {
        body: data.body || 'Nova mensagem de Manus AI',
        icon: 'icon-192.png',
        badge: 'icon.svg',
        tag: 'manus-ai-notification',
        requireInteraction: false
    };
    
    e.waitUntil(
        self.registration.showNotification(data.title || 'Manus AI', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (let client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});