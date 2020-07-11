const {precacheAndRoute} = require('workbox-precaching');
const { NetworkFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');

registerRoute(/https:\/\/yarnspinnertool\.github\.io\/YarnEditor\//, new NetworkFirst());
precacheAndRoute([{"revision":"816d7badea7192bd75aa5239f8219212","url":"build/bundle.css"},{"revision":"670a9ea478259fa8c750e86abe16e717","url":"build/bundle.js"},{"revision":"3b8d31e2dc3f8d2f71ab725efcca7c9f","url":"global.css"},{"revision":"992e6c258efde68eff7fb5e09f3ccbb6","url":"index.html"}]);