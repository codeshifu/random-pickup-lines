importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

if (workbox) {
  console.log('workbox loaded 🕺');
  workbox.precaching.precacheAndRoute([]);

  workbox.skipWaiting();
  workbox.clientsClaim();
} else {
  console.log('unable to import workbox into worker 😞');
}
