import Pocketbase from 'pocketbase';

import { writable, readable } from 'svelte/store';

export const pb = new Pocketbase("https://api.gttx.app");

export const currentUser = writable(pb.authStore.model);
export const currentRole = writable(pb.authStore.model?.role);
export const currentOrganization = writable(pb.authStore.model?.org);
export const currentProfilePic = writable(pb.authStore.model?.avatar);
// export const notesRaw = pb.collection("notes").getList(1,50,{});
// export const notes = writeable(pb.collection("notes").getList(1,50,{}).resolve().items());

pb.authStore.onChange((auth) => {
    console.log("authstore changed", auth);
    currentUser.set(pb.authStore.model);
    currentRole.set(pb.authStore.model?.role);
    currentOrganization.set(pb.authStore.model?.org);
})

export async function WriteToNotesCollection(delta, collection, user) {
    const data = {
        "content": delta,
        "title": "test",
        "user": user
    };
    await pb.collection(collection).create(data)
}


export async function getCurrentOrganizationRecord() {
    if (pb.authStore.model?.org) {
        const record = await pb.collection('organization').getOne(pb.authStore.model?.org,
            { expand: 'members' });
        return record;
    }
    return {};

}