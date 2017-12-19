var staticCacheName = 'crcalc-static-v4.7.7';
var contentImgsCache = 'crcalc-content-imgs';
var allCaches = [
  staticCacheName,
  contentImgsCache
];

self.addEventListener('install', function(event) {
  const keys = Array.from(caches.keys());
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      if(keys.includes(staticCacheName)) return;

      return fetch("assets-manifest.json")
          .then(response => response.json())
          .then(assets =>
            cache.addAll([
              "/",
              "/consumer",
              assets["vendor.js"],
              assets["app.js"],
              assets["app.css"],
              assets["0.bundle.js"],
              assets["1.bundle.js"],
              assets["2.bundle.js"],
              assets["public\\fonts\\foundation-icons.ttf"],
            ])
          ).catch(err=>{})
    })
    .then(()=> {
        //console.log('skipping wait');
        self.skipWaiting()})
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
        //console.log('cacheNames : ', cacheNames);
      return Promise.all(
        cacheNames.filter(function(cacheName) {
            //console.log('cacheName', cacheName);
          return cacheName.startsWith('crcalc-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
  const curUrl = new URL(requestUrl);
  if(curUrl.pathname === '/consumer'){
    event.respondWith(caches.match('/'));
    return;
  }

  event.respondWith(
    caches.open(staticCacheName).then(cache=>{
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(fetchResponse=>{
            //if(fetchResponse) cache.put(event.request, fetchResponse.clone());
            
            return fetchResponse;
            });
        })
      })
    );
});