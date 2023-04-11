<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { currentOrganization } from '$lib/pocketbase';
	import { getCurrentOrganizationRecord } from '../../../../lib/pocketbase';

	let d = $page.url.searchParams.get('ref');
	let currentOrganizationTest;

	// async function getAuthMethods(){
	//     return await pb.collection('users').listAuthMethods();
	// }
	onMount(async () => {
		const authMethods = await pb.collection('users').listAuthMethods();
		console.log(authMethods);

		// const authData = await pb.collection('users').authWithOAuth2(
		// 	'google',
		// 	'CODE',
		// 	'VERIFIER',
		// 	'REDIRECT_URL',
		// 	// optional data that will be used for the new account on OAuth2 sign-up
		// 	{
		// 		name: 'test'
		// 	}
		// );
		// currentOrganizationTest = getCurrentOrganizationTest();
	});
</script>

<!-- {$currentOrganization?.name}
{$currentOrganization?.expand.members} -->

{#await getCurrentOrganizationRecord() then organization}
	<!-- promise was fulfilled -->
	<h1>
		{organization.name}
	</h1>
    <h3>observer {organization.observer_code}</h3>
    <h3>participant {organization.participant_code}</h3>
    <h3>facilitator {organization.facilitator_code}</h3>
	<hr />
	<!-- {organization.expand.members} -->
	{#each organization.expand.members as member}
		<p>{member.name}</p>
	{/each}
	<hr />
{/await}
