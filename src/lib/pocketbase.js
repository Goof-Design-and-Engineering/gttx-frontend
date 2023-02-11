import Pocketbase from 'pocketbase';

import { writable, readable } from 'svelte/store';

export const pb = new Pocketbase("https://api.gttx.app");

export const currentUser = writable(pb.authStore.model);
export const currentRole = writable(pb.authStore.model?.role);
export const currentOrganization = writable(pb.authStore.model?.org);
export const currentProfilePic = readable(pb.authStore.model?.avatar);
// export const notesRaw = pb.collection("notes").getList(1,50,{});
// export const notes = writeable(pb.collection("notes").getList(1,50,{}).resolve().items());

pb.authStore.onChange((auth) => {
    console.log("authstore changed", auth);
    currentUser.set(pb.authStore.model);
})

export async function WriteToNotesCollection(delta, collection,user) {
    const data = {
        "content": delta,
        "title": "test",
        "user": user
    };
    await pb.collection(collection).create(data)
}