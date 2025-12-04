// Service Worker for offline caching
const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/pages/baker-county.html",
  "/pages/benton-county.html",
  "/pages/clackamas-county.html",
  "/pages/clatsop-county.html",
  "/pages/columbia-county.html",
  "/pages/coos-county.html",
  "/pages/crook-county.html",
  "/pages/curry-county.html",
  "/pages/deschutes-county.html",
  "/pages/douglas-county.html",
  "/pages/gilliam-county.html",
  "/pages/grant-county.html",
  "/pages/harney-county.html",
  "/pages/hood-river-county.html",
  "/pages/jackson-county.html",
  "/pages/jefferson-county.html",
  "/pages/josephine-county.html",
  "/pages/klamath-county.html",
  "/pages/lake-county.html",
  "/pages/lane-county.html",
  "/pages/lincoln-county.html",
  "/pages/linn-county.html",
  "/pages/malheur-county.html",
  "/pages/marion-county.html",
  "/pages/morrow-county.html",
  "/pages/multnomah-county.html",
  "/pages/polk-county.html",
  "/pages/sherman-county.html",
  "/pages/tillamook-county.html",
  "/pages/umatilla-county.html",
  "/pages/union-county.html",
  "/pages/wallowa-county.html",
  "/pages/wasco-county.html",
  "/pages/washington-county.html",
  "/pages/wheeler-county.html",
  "/pages/yamhill-county.html",
  "images/Image_001.png",
  "images/Image_002.png",
  "/images/Image_009.jpg",
  "/qr-codes/2025-oregon-treasures-quest-custom-qr.png",
  "/images/Image_012.jpg",
  "/images/Image_015.jpg",
  "/images/Image_018.jpg",
  "/images/Image_021.jpg",
  "/images/Image_024.jpg",
  "/images/Image_027.jpg",
  "/images/Image_030.jpg",
  "/images/Image_033.jpg",
  "/images/Image_036.jpg",
  "/images/Image_039.jpg",
  "/images/Image_042.jpg",
  "/images/Image_045.jpg",
  "/images/Image_048.jpg",
  "/images/Image_051.jpg",
  "/images/Image_054.jpg",
  "/images/Image_057.jpg",
  "/images/Image_060.jpg",
  "/images/Image_063.jpg",
  "/images/Image_066.jpg",
  "/images/Image_069.jpg",
  "/images/Image_072.jpg",
  "/images/Image_075.jpg",
  "/images/Image_078.jpg",
  "/images/Image_081.jpg",
  "/images/Image_084.jpg",
  "/images/Image_087.jpg",
  "/images/Image_090.jpg",
  "/images/Image_093.jpg",
  "/images/Image_096.jpg",
  "/images/Image_099.jpg",
  "/images/Image_102.jpg",
  "/images/Image_105.jpg",
  "/images/Image_108.jpg",
  "/images/Image_111.jpg",
  "/images/Image_114.jpg"
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache);
              }
            });
          return response;
        }).catch(() => {
          return caches.match('/index.html');
        });
      })
  );
});
