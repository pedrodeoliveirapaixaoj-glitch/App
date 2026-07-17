const CACHE_NAME = 'joke-generator-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  // Para APIs externas, tentar buscar primeiro
  if (e.request.url.includes('jokeapi.dev')) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(e.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(e.request);
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request);
      })
    );
  }
});