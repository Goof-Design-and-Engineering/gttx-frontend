/** @type {import('./$types').Actions} */
// import PocketBase from '$lib/pocketbase.umd.js';
import PocketBase from 'pocketbase';

export const actions = {
  login: async ({ cookies, request }) => {
    const pb = new PocketBase('https://api.gttx.app');

    // TODO log the user in    
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    try {
      const authData = await pb.collection('users').authWithPassword(
        email,
        password
      ); 
      console.log("SUCCESS");
    } catch (ClientResponseError) {
      console.log("ERROR");      
    }
  },
  // default: async(event) => {
  //   return;
  // }
};