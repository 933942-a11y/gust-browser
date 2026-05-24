importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');

const sw = new UVServiceWorker();
const CELESTRIUM_CACHE = 'celestrium-core-assets-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    // Performance Capture Layer: Cache core operational layout scripts instantly on the disk
    if (requestUrl.pathname.startsWith('/uv/') && !requestUrl.pathname.startsWith('/uv/service/')) {
        event.respondWith(
            caches.match(event.request).then((cachedData) => {
                if (cachedData) return cachedData;
                return fetch(event.request).then((networkResponse) => {
                    const cacheCopy = networkResponse.clone();
                    caches.open(CELESTRIUM_CACHE).then((cacheStorage) => {
                        cacheStorage.put(event.request, cacheCopy);
                    });
                    return networkResponse;
                });
            })
        );
        return;
    }

    // Pipe operational website stream contexts into the high-velocity worker array mapping
    event.respondWith(sw.fetch(event));
});