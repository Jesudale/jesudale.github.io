/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

 const CACHE_NAME = 'my-cache-v1';
 const urlsToCache = [
     '/',
     'index.html',
     'main.js',
     'styles.css'
 ];
 
 // Install event: caching app shell
 self.addEventListener('install', event => {
     event.waitUntil(
         caches.open(CACHE_NAME).then(cache => {
             return cache.addAll(urlsToCache);
         })
     );
 });
 
 // Fetch event: serving app shell from cache
 self.addEventListener('fetch', event => {
     event.respondWith(
         caches.match(event.request).then(response => {
             return response || fetch(event.request);
         })
     );
 });
 
 // Activate event: updating the cache
 self.addEventListener('activate', event => {
     const cacheWhitelist = [CACHE_NAME];
     event.waitUntil(
         caches.keys().then(cacheNames => {
             return Promise.all(
                 cacheNames.map(cacheName => {
                     if (cacheWhitelist.indexOf(cacheName) === -1) {
                         return caches.delete(cacheName);
                     }
                 })
             );
         })
     );
 });
 
 // Listening for the message event to trigger update
 self.addEventListener('message', event => {
     if (event.data === 'skipWaiting') {
         self.skipWaiting();
     }
 });