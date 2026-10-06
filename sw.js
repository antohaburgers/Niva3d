// Change VERSION and script URL versions together for each release.
const VERSION='0.10';
const PREFIX='offroad-niva:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const ASSETS=["./index.html", "./game.js?v=010", "./road-world.js?v=010", "./visual-car.js?v=010", "./physics.js?v=010", "./gearbox.js?v=010", "./controls.js?v=010", "./cameras.js?v=010", "./obstacles.js?v=010", "./surfaces.js?v=010", "./engine-audio.js?v=010", "./browser-guard.js?v=010", "./pwa.js?v=010", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];
const ROOT=new URL('./',self.location.href);
const SHELL=new URL('./index.html',ROOT).href;
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
 // No skipWaiting: new builds activate after old game tabs close.
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
 if(request.mode==='navigate'){
  // Serve a consistent cached build; sw.js controls build upgrades.
  event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(SHELL))||fetch(request)));
  return;
 }
 event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(request))||fetch(request)));
});
