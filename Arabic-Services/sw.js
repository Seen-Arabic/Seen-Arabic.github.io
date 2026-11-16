// Keep this URL available for browsers that registered the old tools site's worker.
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(retireLegacyWorker());
});

async function retireLegacyWorker() {
  const cacheNames = await caches.keys();
  const legacyCaches = cacheNames.filter((name) => name.startsWith('services-v'));
  await Promise.all(legacyCaches.map((name) => caches.delete(name)));
  await self.registration.unregister();
}
