importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

if (workbox) {
  console.log('workbox loaded 🕺');
  workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "63470e2ce61673190f685571d319487f"
  },
  {
    "url": "dist/css/style.css",
    "revision": "1b3f36682ae41efb51d93911084c04a4"
  },
  {
    "url": "dist/js/idb.js",
    "revision": "01a3feb6387b9ce96745cb2746d128eb"
  },
  {
    "url": "dist/js/main-min.js",
    "revision": "8606e84f684c7bcb921dcb7cc313fe22"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "496f2d5211471d94b79de66671866973"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "bb4d49862dc3ac27086e7cf0ce448c60"
  },
  {
    "url": "images/icons/icon-256x256.png",
    "revision": "16107c15657cb6084a2b192f32b66e9b"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "4770d75f33f3d1f4c084b510bb7d83ba"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "e69326918f82dc746d526fa42889b9ff"
  },
  {
    "url": "manifest.json",
    "revision": "bde514df43acc2e6aec4159429b72dc5"
  }
]);

  workbox.skipWaiting();
  workbox.clientsClaim();
} else {
  console.log('unable to import workbox into worker 😞');
}
