/* ShebaCare offline cache. Upload next to index.html.
   Network first, so a new upload shows up as soon as the phone is online. */
var CACHE='shebacare-v2';
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html'])}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n.indexOf('shebacare-')===0&&n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){if(res.ok){var copy=res.clone();caches.open(CACHE).then(function(c){c.put(r,copy)})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||(r.mode==='navigate'?caches.match('./index.html'):Response.error())})}))});
