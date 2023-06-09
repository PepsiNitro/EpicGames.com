var CACHE_NAME = 'version10'; // bump this version when you make changes.
// Put all your urls that you want to cache in this array
var urlsToCache = [
    'index.html',
    'games/subway-surfers/',
    'games/snowbattle/',
    'games/slope/',
    'games/scrapmetal/',
    'games/paperio2/',
    'games/Minecraft/',
    'games/madalin-stunt-cars-3/',
    'games/JetpackJoyride/',
    'games/csgo-clicker/',
    'games/evil-glitch/',
    'games/stick-duel-battle/',
    'games/pixel-combat-2/',
    'games/temple-run-2/',
    'games/idle-breakout/',
    'games/stickman-hook/',
    'games/1v1lol/',
    'games/99balls/',
    'games/ages-of-conflict/',
    'games/amazing-rope-police/',





    'css.css',
    'assets/favicon.ico',

    'assets/logo-192.png',
    'assets/logo-512.png'

];

// Install the service worker and open the cache and add files mentioned in array to cache
self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open(CACHE_NAME)
        .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});


// keep fetching the requests from the user
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) return response;
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = []; // add cache names which you do not want to delete
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        );
        })
    );
});

