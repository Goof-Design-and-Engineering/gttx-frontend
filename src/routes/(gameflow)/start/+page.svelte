<script>
	// import { onMount } from 'svelte';
	// import { pb, currentUser } from '$lib/pocketbase';
	import EmailPicker from '$lib/start/EmailPicker.svelte';
	import RecentGames from '$lib/start/RecentGames.svelte';
	import Scenarios from '$lib/start/Scenarios.svelte';
	import { onMount } from 'svelte';
	import {
		pb,
		currentUser,
		getCurrentOrganizationRecord,
		currentRole
	} from '../../../lib/pocketbase';

	import { goto } from '$app/navigation';
	
	let scenarioChosen = false;
	let emailsPicked = false;

	let scenarioID = '';
	let moduleID = '';
	let gameData = {};
	// let emailsInOrg = [];
	// let emailsOutOfOrg = [];
	let emails = [];
	let usersIDs = [];
	let orgRaw = {};

	onMount(async () => {
		orgRaw = await getCurrentOrganizationRecord();
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}
	});

	async function createGame() {
		gameData = {
			org: $currentUser.org,
			users: [$currentUser.id],
			emails: emails,
			currentUsers: 0,
			settings: {},
			question: 0,
			module: moduleID,
			scenarios: scenarioID
		};

		const inviteCodes = {
			observer_code: orgRaw?.observer_code,
			participant_code: orgRaw?.participant_code,
			facilitator_code: orgRaw?.facilitator_code
		};

		let message2send = `
		<html>
			<img class="gttx-logo" src="/svg/gttx_white.svg" alt="gttx!" />

			<p>
			Hello! Welcome to GTTX.
			Here is the information to get started:

			observer_code: ${inviteCodes.observer_code}
			participant_code: ${inviteCodes.participant_code}
			facilitator_code: ${inviteCodes.facilitator_code}
			
			GOTO https://gttx.api/blah to get started!
			</p>
		</html>
		`;

		// set message2send
		gameData.emailbody = message2send;

		const record = await pb.collection('room').create(gameData);
		return record;
	}

	async function setGame(id) {
		console.log('SET ID TO ', id);
		try {
			const record = await pb.collection('users').update($currentUser.id, { roomid: id });
		} catch (error) {
			console.log(error);
		} finally {
			// goto('/dashboard/notes');
		}
		return record;
	}

	$: {
		if (scenarioChosen) {
			console.log('scenario has been chosen');
			console.log(scenarioID, moduleID);
		}
		if (emailsPicked) {
			console.log('emails have been chosen');
			console.log(emails);
		}
	}
</script>

{#if $currentRole == 'facilitator'}
	{#if scenarioChosen == true && emailsPicked == true}
		{#await createGame()}
			<progressbar />
		{:then game}
			<!-- promise was fulfilled -->
			{game.id}
			<!-- {#await setGame(game.id) catch error}
					{error}
				{/await} -->
		{:catch error}
			{error}
		{/await}
	{:else if scenarioChosen == false}
		<Scenarios bind:scenarioChosen bind:scenarioID bind:moduleID />
	{:else}
		<EmailPicker bind:emails bind:usersIDs bind:emailsPicked />
	{/if}
	<hr>
	<RecentGames />

	<pre />
{:else if $currentRole == 'observer' || $currentRole == 'participant'}
	<br />
	<article>
		<RecentGames />
	</article>
{:else}
	<progressbar />
{/if}
