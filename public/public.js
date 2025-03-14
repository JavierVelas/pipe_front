document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(data => {
      contentDiv.innerHTML = data.map(post => `<p><strong>${post.title}</strong>: ${post.body}</p>`).join('');
      
      // Guardar en caché a través del Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.active.postMessage({
            type: 'CACHE_DATA',
            url: '/api/posts',
            data: data
          });
        });
      }
    })
    .catch(() => {
      // Intentar cargar desde caché si no hay conexión
      if ('caches' in window) {
        caches.match('/api/posts').then(response => {
          if (response) {
            response.json().then(data => {
              contentDiv.innerHTML = '<p>Contenido cargado desde caché:</p>' + 
                data.map(post => `<p><strong>${post.title}</strong>: ${post.body}</p>`).join('');
            });
          } else {
            contentDiv.innerHTML = '<p>Error al cargar datos y no hay caché disponible.</p>';
          }
        });
      }
    });
});
