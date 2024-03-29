import Pocketbase from 'pocketbase';

import { writable, readable } from 'svelte/store';

export const pb = new Pocketbase("https://api.gttx.app");

export const currentUser = writable(pb.authStore.model);
export const currentRole = writable(pb.authStore.model?.role);
export const currentOrganization = writable(pb.authStore.model?.org);
export const currentProfilePic = writable(pb.authStore.model?.avatar);
export const RoomID = writable('');
// export const scenarioObject = {};
// export const notesRaw = pb.collection("notes").getList(1,50,{});
// export const notes = writeable(pb.collection("notes").getList(1,50,{}).resolve().items());

pb.authStore.onChange((auth) => {
    //console.log(("authstore changed", auth);
    currentUser.set(pb.authStore.model);
    currentRole.set(pb.authStore.model?.role);
    currentOrganization.set(pb.authStore.model?.org);
})



export async function getCurrentOrganizationRecord() {
    if (pb.authStore.model?.org) {
        const record = await pb.collection('organization').getOne(pb.authStore.model?.org,
            { expand: 'members' });
        return record;
    }
    return {};

}


export function replaceInJSON(json, oldValues, newValue) {
    const copiedJson = JSON.parse(JSON.stringify(json));

    // go through each object
    for (let key in copiedJson) {
        if (typeof copiedJson[key] === 'object') {
            copiedJson[key] = replaceInJSON(copiedJson[key], oldValues, newValue);
        } else if (typeof copiedJson[key] === 'string') {
            for (let oldValue of oldValues) {
                if (copiedJson[key].includes(oldValue)) {
                    // if type string replace value
                    copiedJson[key] = copiedJson[key].replace(oldValue, newValue);
                }
            }
        }
    }

    return copiedJson;
}

export function formatScenario(scenarios) {
    let newScenarios = [];
    for (let scenario of scenarios) {
        //console.log(('SCENARIO');
        //console.log((scenario);

        newScenarios.push(
            replaceInJSON(
                scenario,
                ['<Insert Organization>', '<Organization’s>', '<Organization>'],
                'your organization'
            ) || {}
        );
    }
    //console.log(('NEW SCENARIO...');
    //console.log((newScenarios);
    return newScenarios;
}

export async function getScenarios() {
    const resultList = await pb.collection('scenario').getFullList(1, 50);
    return resultList;
}

export async function getScenarioName(scenarioID) {
    const result = await pb.collection('scenario').getOne(scenarioID);
    return result.name;
}