import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

const cacheName = 'stale-with-revalidate'

// implements staleWhileRevalidate to all routes
registerRoute(
  (e) => e.request.url.indexOf('firestore.googleapis.com') === -1,
  new StaleWhileRevalidate({ cacheName }),
)

// removes all caches not named <cacheName>
const invalidateOldCache = async () => {
  const keys = await caches.keys()
  const isOldCache = (key) => key !== cacheName
  const oldKeys = keys.filter(isOldCache)

  return Promise.all(oldKeys.map((key) => caches.delete(key)))
}

// runs invalidateOldCache on activation
self.addEventListener('activate', (e) => e.waitUntil(invalidateOldCache()))
