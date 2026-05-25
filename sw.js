importScripts('./uv/uv.bundle.js');
importScripts('./uv/uv.config.js');
importScripts('./uv/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(location.origin)) return;
    if (sw.route(event)) {
        event.respondWith(sw.fetch(event));
    }
});