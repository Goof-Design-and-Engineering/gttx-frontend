import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/utils';

export const handle = async ({ event, resolve }) => {
    event.local.pb = new Pocketbase("https://gttx.fly.dev");
    event.local.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    const session = event.cookies.get('session')

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
    } else {
        event.locals.user = undefined;
    }

    const response = await resolve(event);

    // response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));

    return response;
}