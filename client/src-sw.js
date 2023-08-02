// Import necessary modules from Workbox library for service worker setup
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route the assets defined in the __WB_MANIFEST array
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with status codes 0 (for opaque responses) and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration for cached pages (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the page cache with specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigating to pages using the CacheFirst strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      // Cache responses with status codes 0 (for opaque responses) and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
