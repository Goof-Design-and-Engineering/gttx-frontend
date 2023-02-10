<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let code;
	let providers;
	let provider;
	let result;

	onMount(async () => {
		let redirectURL = `https://discord.com/api/oauth2/authorize?client_id=1066450258999132191&redirect_uri=https%3A%2F%2Fwww.gttx.app%2Foauth-discord&response_type=code&scope=identify%20email`;

		codeRaw = await $page.url.searchParams;
		code = code.get('code')
		// console.log(code);
		console.log('CODE\t', code);
		providers = await pb.collection('users').listAuthMethods();
		provider = providers?.authProviders.filter((item) => item.name === 'discord')[0];
		console.log('VERIFIER\t', provider.codeVerifier);

		const authData = await pb.collection('users').authWithOAuth2(
			'discord',
			code || '',
			provider.codeVerifier,
			redirectURL,
			// optional data that will be used for the new account on OAuth2 sign-up
			{
				name: 'notkevin'
			}
		);
		result = authData;

		// goto('/account');
	});
</script>

<p>
	{provider}
	{result}

	<br />
	<!-- {$code} -->
</p>
