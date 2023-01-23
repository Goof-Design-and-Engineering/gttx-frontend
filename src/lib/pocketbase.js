import Pocketbase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new Pocketbase("https://api.gttx.app");

export const currentUser = writable(pb.authStore.model);
export const currentRole = writable(pb.authStore.model?.role);

pb.authStore.onChange((auth) => {
    console.log("authstore changed", auth);
    currentUser.set(pb.authStore.model);
})
