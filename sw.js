const CACHE_NAME = 'manus-ai-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalar o Service Worker e cachear arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Erro ao cachear:', err))
  );
  self.skipWaiting();
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Cache first, fallback to network
self.addEventListener('fetch', event => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retornar do cache se disponível
        if (response) {
          return response;
        }

        // Caso contrário, fazer requisição à rede
        return fetch(event.request)
          .then(response => {
            // Não cachear respostas inválidas
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar a resposta
            const responseToCache = response.clone();

            // Cachear a resposta
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Retornar página offline se disponível
            return caches.match('/index.html');
          });
      })
  );
});
