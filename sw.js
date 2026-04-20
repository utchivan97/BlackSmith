const CACHE_NAME = 'blacksmith-cache-v1';

const urlsToCache = [
  './',
  './sw.js',
  './manifest.json',
  './index.html',
  './guia.html',
  './historia.html',
  './mapa.html',
  './objetos.html',
  './style.css',
  './scripts/main.js',
  './scripts/inventory.js',
  './img/fondo1.png',
  './img/fondo2.png',
  './img/letreroLogo.png',
  './img/papiro_antiguo.png',
  './img/ciudad.jpeg',
  './img/bosque.jpeg',
  './img/items/casco_hierro.png',
  './img/items/botas_hierro.png',
  './img/items/pechera_hierro.png',
  './img/items/espada_01.png',
  './img/items/espada_02.png',
  './img/items/espada_03.png',
  './img/items/hacha_01.png',
  './img/items/lingote_hierro.png',
  './img/items/pocion_salud.png',
  './img/items/bebida_1.png',
  './img/items/bebida_2.png',
  './img/items/comida_01.png',
  './img/items/cuero.png',
  './img/items/trozo_madera.png',
  './icons/icon_16x16.png',
  './icons/icon_32x32.png',
  './icons/icon_64x64.png',
  './icons/icon_96x96.png',
  './icons/icon_128x128.png',
  './icons/icon_192x192.png',
  './icons/icon_256x256.png',
  './icons/icon_384x384.png',
  './icons/icon_512x512.png',
  './icons/icon_1024x1024.png'

];

self.addEventListener('install', e => {
  console.log('Service Worker instalado');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => {
            self.skipWaiting()
          })
      })
      .catch(err => console.log('No se ha registrado el cache', err))
  );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                if (response){
                    return response;
                }
                return fetch(e.request);
            })
    );
})