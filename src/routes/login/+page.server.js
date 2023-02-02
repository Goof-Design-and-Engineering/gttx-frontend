// import { redirect } from '@sveltejs/kit'
// // import type { Actions, PageServerLoad } from './$types'
// import { currentUser, pb } from "$lib/pocketbase";

// // export const load func async () => {
// //   switch (currentRole){
// //     case ('facilitator'):
// //       throw redirect("302","/f")
// //   }
// // }
//
// /** @type {import('./$types').PageServerLoad} */
// export async function load({ locals }) {
//     console.log(locals);
//     if (currentUser) {
//         throw redirect("302","/")
//     }
// }