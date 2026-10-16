const CACHE_NAME = "mi-centro-v7";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon.png",
    "./lock-animation.mp4"

];


self.addEventListener(
    "install",
    function(event) {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(
                    function(cache) {

                        return cache.addAll(
                            FILES_TO_CACHE
                        );

                    }
                )

        );

    }
);


self.addEventListener(
    "activate",
    function(event) {

        event.waitUntil((async function() {
            const keys = await caches.keys();
            await Promise.all(keys.filter(function(key) {
                return key.startsWith("mi-centro-") && key !== CACHE_NAME;
            }).map(function(key) { return caches.delete(key); }));
            await self.clients.claim();
        })());

    }
);


self.addEventListener(
    "fetch",
    function(event) {

        const url =
            new URL(event.request.url);


        if (
            url.origin ===
            location.origin
        ) {

            event.respondWith(

                caches
                    .match(event.request)
                    .then(
                        function(cached) {

                            return cached ||
                                fetch(event.request);

                        }
                    )

            );

        }

    }
);
