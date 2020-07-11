const cacheName = 'stale-with-revalidate'

// import workbox 
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')
const { routing, strategies, precaching } = workbox

// implements staleWhileRevalidate to all routes
routing.registerRoute(
  () => true,
  new strategies.StaleWhileRevalidate({ cacheName }),
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
precaching.precacheAndRoute([{"revision":"816d7badea7192bd75aa5239f8219212","url":"build/bundle.css"},{"revision":"5af765bb65bd8202f8e8ee8064141ee2","url":"build/bundle.js"},{"revision":"3b8d31e2dc3f8d2f71ab725efcca7c9f","url":"global.css"},{"revision":"992e6c258efde68eff7fb5e09f3ccbb6","url":"index.html"}]);