import { redirect } from '@sveltejs/kit';
export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
    login: async (event) => {
        throw redirect(302, '/login');
    }
};
