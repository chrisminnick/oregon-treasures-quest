// Service Worker for offline caching
const CACHE_NAME = 'site-cache-v3';
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

// Install event - aggressively cache ALL resources for full offline support
self.addEventListener('install', (event) => {
  console.log('Service Worker installing, caching all resources...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache, adding', urlsToCache.length, 'resources');
        // Cache in batches to avoid overwhelming the browser
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < urlsToCache.length; i += batchSize) {
          batches.push(urlsToCache.slice(i, i + batchSize));
        }
        
        return batches.reduce((promise, batch) => {
          return promise.then(() => {
            return cache.addAll(batch).catch((error) => {
              console.error('Failed to cache batch:', batch, error);
              // Try individual URLs if batch fails
              return Promise.allSettled(
                batch.map(url => cache.add(url).catch(err => {
                  console.warn('Failed to cache:', url, err);
                }))
              );
            });
          });
        }, Promise.resolve());
      })
      .then(() => {
        console.log('All resources cached successfully!');
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
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

// Fetch event - network first, cache fallback, with aggressive caching
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests (like Google Maps)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // If we have it cached, return it immediately
        // But also fetch in background to update cache
        if (cachedResponse) {
          // Try to update cache in background
          fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response.clone());
              });
            }
          }).catch(() => {
            // Offline or fetch failed, but we already have cached version
          });
          return cachedResponse;
        }

        // Not in cache, try network
        return fetch(event.request).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone and cache for future use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        }).catch((error) => {
          console.log('Fetch failed, checking cache for fallback:', error);
          
          // If it's a page request, try to return a cached page
          if (event.request.destination === 'document') {
            return caches.match('/index.html').then((response) => {
              return response || new Response('Offline - Please connect to the internet', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/html'
                })
              });
            });
          }
          
          // For other resources (CSS, images), return error
          return new Response('Resource not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});
