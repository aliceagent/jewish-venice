/* ============================================================
   Jewish Venice — service worker

   Why this exists: this guide is read in Venice, where a visitor is
   usually roaming, often underground in a calle with no signal, and
   frequently on Shabbat with the phone already put away. It has to work
   with no network.

   Three caching strategies, deliberately different:

   - navigation   network first, falling back to the cached shell, so a
                  reader online always gets the current guide and a reader
                  offline still gets one.
   - same-origin  stale-while-revalidate: instant from cache, refreshed in
                  the background. This is what lets a change deployed to
                  main reach a returning reader without any cache-version
                  bookkeeping here.
   - tiles/photos cache first, capped. Map tiles and Wikimedia photos are
                  opaque cross-origin responses and can be large, so only
                  what has actually been looked at is kept, newest wins.
   ============================================================ */

const SHELL   = 'jv-shell-v1';
const RUNTIME = 'jv-runtime-v1';
const RUNTIME_MAX = 320;

/* '/' rather than '/index.html': vercel.json sets cleanUrls, so the
   extension form redirects and a redirected response cannot be cached. */
const CORE = [
  '/',
  '/assets/style.css',
  '/assets/data.js',
  '/assets/app.js',
  '/assets/vendor/leaflet.js',
  '/assets/vendor/leaflet.css',
  '/assets/vendor/images/marker-icon.png',
  '/assets/vendor/images/marker-icon-2x.png',
  '/assets/vendor/images/marker-shadow.png',
  '/assets/vendor/images/layers.png',
  '/assets/vendor/images/layers-2x.png',
  '/assets/diagrams/foundation.svg',
  '/assets/diagrams/well.svg',
  '/assets/diagrams/lagoon.svg',
  '/assets/diagrams/mose.svg',
  '/assets/social/icon.svg',
  '/assets/social/icon-192.png',
  '/assets/social/apple-touch-icon.png',
  '/assets/social/site.webmanifest'
];

const REMOTE = /basemaps\.cartocdn\.com|upload\.wikimedia\.org/;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    // individually, so one 404 cannot fail the whole install
    await Promise.all(CORE.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== SHELL && k !== RUNTIME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function trim(cacheName, max){
  const c = await caches.open(cacheName);
  const keys = await c.keys();
  for(let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch { return; }
  if(url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if(req.mode === 'navigate'){
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(SHELL);
        c.put('/', fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        return (await caches.match('/')) || Response.error();
      }
    })());
    return;
  }

  if(url.origin === self.location.origin){
    e.respondWith((async () => {
      const cached = await caches.match(req);
      const network = fetch(req).then(async res => {
        if(res && res.ok){
          const c = await caches.open(SHELL);
          c.put(req, res.clone()).catch(() => {});
        }
        return res;
      }).catch(() => null);
      return cached || (await network) || Response.error();
    })());
    return;
  }

  if(REMOTE.test(url.hostname)){
    e.respondWith((async () => {
      const cached = await caches.match(req);
      if(cached) return cached;
      try {
        const res = await fetch(req);
        const c = await caches.open(RUNTIME);
        c.put(req, res.clone()).then(() => trim(RUNTIME, RUNTIME_MAX)).catch(() => {});
        return res;
      } catch {
        return Response.error();
      }
    })());
  }
});
