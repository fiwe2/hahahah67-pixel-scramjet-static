
// Scramjet STATIC — Service Worker
// Engine bundle is hosted on Neocities; the service worker itself stays on GitHub Pages.

importScripts('https://gospartans.neocities.org/scramjet-all.js');

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

async function handleRequest(event) {
  await scramjet.loadConfig();

  if (!scramjet.route(event)) {
    return fetch(event.request);
  }

  return scramjet.fetch(event);
}

self.addEventListener('fetch', (event) => {
  if (new URL(event.request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(handleRequest(event));
});
