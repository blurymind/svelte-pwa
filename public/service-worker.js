const staticCache = 'static-v0.0'
const dynamicCache = 'dynamic-v0.0'
const assets = [
  '/',
  '/index.html',
  '/global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  'https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap',
]

const precache = async () => {
  const cache = await caches.open(staticCache)
  cache.addAll(assets)
}

// install
self.addEventListener('install', (e) => e.waitUntil(precache()))

const invalidateOldCache = async () => {
  const keys = await caches.keys()
  const isOldCache = (key) => key !== staticCache && key !== dynamicCache
  const oldKeys = keys.filter(isOldCache)
  return Promise.all(oldKeys.map((key) => caches.delete(key)))
}

self.addEventListener('activate', (e) => e.waitUntil(invalidateOldCache()))

const fetchCache = async (request) => {
  const cacheResponse = await caches.match(request)
  return (
    cacheResponse ||
    fetch(request).then(async (fetchRes) => {
      const cache = await caches.open(dynamicCache)
      cache.put(request.url, fetchRes.clone())

      return fetchRes
    })
  )
}

const serveFallback = () => {
  //   caches.match('/fallback.html')
}

self.addEventListener('fetch', (e) => {
  e.respondWith(fetchCache(e.request).catch(serveFallback))
})

// var cacheName = "sgtoilet-cache-" + Date.now();
// var filesToCache = [
//   "/",
//   "/index.html",
//   "/main.css",
//   "/main.js",
//   "/components.css",
//   "https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap"
// ];
// self.addEventListener("install", function(e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });
// self.addEventListener("activate", e => {
//   e.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(thisCacheName) {
//           if (thisCacheName !== cacheName) {
//             return caches.delete(thisCacheName);
//           }
//         })
//       );
//     })
//   );
// });
// self.addEventListener("fetch", e => {
//   e.respondWith(
//     (async function() {
//       const response = await caches.match(e.request);
//       return response || fetch(e.request);
//     })()
//   );
// });
