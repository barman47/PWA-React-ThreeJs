importScripts("/nathanfrad/PWA-React-ThreeJs/precache-manifest.a873a734a21419e541b5451b6d78f90b.js", "/nathanfrad/PWA-React-ThreeJs/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/nathanfrad/PWA-React-ThreeJs/workbox-v3.6.3"});
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


