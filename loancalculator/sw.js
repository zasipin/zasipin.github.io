'use strict';

var staticCacheName = 'crcalc-static-v4.7.8';
var contentImgsCache = 'crcalc-content-imgs';
var firstPage = '/mortage';
var allCaches = [staticCacheName, contentImgsCache];

self.addEventListener('install', function (event) {
  var keys = Array.from(caches.keys());
  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    if (keys.includes(staticCacheName)) return;

    return fetch("assets-manifest.json").then(function (response) {
      return response.json();
    }).then(function (assets) {
      return cache.addAll(["/", firstPage, assets["vendor.js"], assets["app.js"], assets["app.css"], assets["0.bundle.js"], assets["1.bundle.js"], assets["2.bundle.js"], assets["public\\fonts\\foundation-icons.ttf"]]);
    }).catch(function (err) {});
  }).then(function () {
    //console.log('skipping wait');
    self.skipWaiting();
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    //console.log('cacheNames : ', cacheNames);
    return Promise.all(cacheNames.filter(function (cacheName) {
      //console.log('cacheName', cacheName);
      return cacheName.startsWith('crcalc-') && !allCaches.includes(cacheName);
    }).map(function (cacheName) {
      return caches.delete(cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);
  var curUrl = new URL(requestUrl);
  if (curUrl.pathname === firstPage) {
    event.respondWith(caches.match('/'));
    return;
  }

  event.respondWith(caches.open(staticCacheName).then(function (cache) {
    return cache.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function (fetchResponse) {
        //if(fetchResponse) cache.put(event.request, fetchResponse.clone());

        return fetchResponse;
      });
    });
  }));
});