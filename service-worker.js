const CACHE_NAME = 'jvsato-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/script.js',
  '/manifest.json',
  '/images/joao.png',
  '/images/joao.jpg',
  // Adiciona aqui os teus ficheiros de JS da pasta /js se necessário
  '/js/custom.js',
  '/js/jquery.min.js'
];

// 1. Instalação: Guarda os ficheiros essenciais na cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberta: Guardando recursos estáticos');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Ativação: Limpa caches antigas se houver atualizações
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Removendo cache antiga:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Estratégia de Fetch: "Stale-while-revalidate"
// Tenta carregar da cache primeiro para ser instantâneo, 
// mas atualiza a cache em background se houver internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return response || fetchPromise;
    })
  );
});
