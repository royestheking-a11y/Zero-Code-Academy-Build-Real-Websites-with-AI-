const CACHE_NAME = 'zero-code-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/navbar-logo.svg',
    '/footer-logo.png',
    '/favicon/site.webmanifest',
    '/offline.html'
];

// Install Event - Cache Assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Network First, fallback to cache
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then((response) => response || caches.match('/offline.html'));
            })
    );
});

// Push Notification Event
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'New notification',
        icon: '/favicon/android-chrome-192x192.png',
        badge: '/favicon/favicon-32x32.png',
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Zero Code Academy', options)
    );
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // If window is open, focus it
            if (windowClients.length > 0) {
                const client = windowClients[0];
                if (client.url === event.notification.data.url) {
                    return client.focus();
                }
                return client.focus().then(() => client.navigate(event.notification.data.url));
            }
            // If no window is open, open a new one
            return clients.openWindow(event.notification.data.url);
        })
    );
});
