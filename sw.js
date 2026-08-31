/* The garden moved. This service worker exists only to remove its predecessor:
   it takes over immediately, deletes every cache, unregisters itself, and
   reloads any open windows so they see the moving notice instead of the old
   cached game. New home: https://deep-forest-labs.github.io/GardenofWonder/ */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
