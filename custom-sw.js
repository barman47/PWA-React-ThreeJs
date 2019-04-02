importScripts("/PWA-React-ThreeJs/precache-manifest.aea69e7ff2a66e5bd0b65019b7f95607.js", "/PWA-React-ThreeJs/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/PWA-React-ThreeJs/workbox-v3.6.3"});
function displayNotification() {
    document
        .querySelector("#notification")
        .style.display = "block";
}


// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);


self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());


