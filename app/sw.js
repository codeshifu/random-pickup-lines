importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

if (workbox) {
  console.log('workbox loaded 🕺');
  workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "928e1ea7946ae005b045f2f405fffe6c"
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
    "revision": "b1ff82a6f4c1b2d7e6da2c6df16d57c4"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "9b59c8588371a8fe2ba7768bc30ac7c2"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "7bed597caddcd7d05ad2788e3c881446"
  },
  {
    "url": "images/icons/icon-256x256.png",
    "revision": "e75d1ce632e6d3777ffe6fb8a04fd4dd"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "2c67f73ade12a925a684221e84247b9c"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "bde3b94de5468bf2e13a5694025ceb18"
  },
  {
    "url": "manifest.json",
    "revision": "6e95962ceedba46e4b8911ab319480fe"
  }
]);

  workbox.skipWaiting();
  workbox.clientsClaim();
} else {
  console.log('unable to import workbox into worker 😞');
}
