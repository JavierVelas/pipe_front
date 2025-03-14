self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/styles.css',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cache) => cache !== 'app-cache-v1').map((cache) => caches.delete(cache))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/posts')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((networkResponse) => {
          const clonedResponse = networkResponse.clone();
          caches.open('data-cache').then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return networkResponse;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Escuchar mensajes para almacenar datos personalizados
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_DATA') {
    caches.open('data-cache').then((cache) => {
      cache.put(event.data.url, new Response(JSON.stringify(event.data.data)));
    });
  }
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
  };
  event.waitUntil(
    self.registration.showNotification('Nueva Notificación', options)
  );
});