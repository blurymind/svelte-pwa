import { writable } from "svelte/store";

export const currentLat = writable(1.29027);
export const currentLong = writable(103.851959);
export const homeLat = writable(1.29027);
export const homeLong = writable(103.851959);
export const searchString = writable("");
export const selectedIndex = writable(0);
export const geoPermissionGranted = writable(false);
export const showModal = writable(false);
