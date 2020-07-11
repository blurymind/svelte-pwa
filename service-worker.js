import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

console.log('Yarn\'s service worker is caching files');
registerRoute(/https:\/\/yarnspinnertool\.github\.io\/YarnEditor\//, new NetworkFirst());
precacheAndRoute([{"revision":"816d7badea7192bd75aa5239f8219212","url":"build/bundle.css"},{"revision":"4a386918bd05b0d8960faa62e0d13963","url":"build/bundle.js"},{"revision":"3b8d31e2dc3f8d2f71ab725efcca7c9f","url":"global.css"},{"revision":"992e6c258efde68eff7fb5e09f3ccbb6","url":"index.html"}]);