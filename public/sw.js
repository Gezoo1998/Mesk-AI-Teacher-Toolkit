// Service Worker for Al Manhal AI Teacher Toolkit
// Lightweight lifecycle handler without network interception to ensure 100% stability across Safari & mobile
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
