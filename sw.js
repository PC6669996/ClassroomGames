
const CACHE_NAME = "mi-centro-v11";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon.png",
    "./lock-animation.mp4"
];

// Instalar la nueva versión y guardar los archivos actualizados.
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

// Eliminar las cachés antiguas y activar la nueva versión.
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(keys) {
                return Promise.all(
                    keys
                        .filter(function(key) {
                            return key.startsWith("mi-centro-") &&
                                   key !== CACHE_NAME;
                        })
                        .map(function(key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function() {
                return self.clients.claim();
            })
    );
});

// Servir los archivos guardados y consultar la red si no están en caché.
self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    // No interceptar peticiones que no sean documentos o recursos normales.
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    return response;
                })
                .catch(function() {
                    return caches.match("./index.html");
                })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(cached) {
                return cached || fetch(event.request);
            })
    );
});
