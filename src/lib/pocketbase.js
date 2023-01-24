import Pocketbase from 'pocketbase';

import { writable, readable } from 'svelte/store';

export const pb = new Pocketbase("https://gttx.fly.dev");

export const currentUser = writable(pb.authStore.model);
export const currentRole = writable(pb.authStore.model?.role);
export const currentOrganization = writable(pb.authStore.model?.org);
export const currentProfilePic = readable(pb.authStore.model?.avatar);

pb.authStore.onChange((auth) => {
    console.log("authstore changed", auth);
    currentUser.set(pb.authStore.model);    
})
