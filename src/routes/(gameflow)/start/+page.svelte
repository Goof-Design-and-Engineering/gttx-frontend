<script>
	// import { onMount } from 'svelte';
	// import { pb, currentUser } from '$lib/pocketbase';
	import EmailPicker from '$lib/start/EmailPicker.svelte';
	import RecentGames from '$lib/start/RecentGames.svelte';
	import Scenarios from '$lib/start/Scenarios.svelte';
	import { onMount } from 'svelte';
	import { generateSlug } from 'random-word-slugs';
	import {
		pb,
		currentUser,
		getCurrentOrganizationRecord,
		currentRole,
		getScenarioName
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

	function createGamename() {
		const options = {
			format: 'camel',
			partsOfSpeech: ['adjective', 'adjective', 'noun']
		};
		const slug = generateSlug(3, options);

		return slug.charAt(0).toUpperCase() + slug.slice(1);
	}

	async function createGame(usersIDs) {
		gameData = {
			org: $currentUser.org,
			users: usersIDs.concat($currentUser.id),
			emails: emails,
			currentUsers: 0,
			settings: {},
			question: 0,
			module: moduleID,
			scenarios: scenarioID,
			state: 'waiting',
			name: createGamename() || ''
		};

		const inviteCodes = {
			observer_code: orgRaw?.observer_code,
			participant_code: orgRaw?.participant_code
		};

		const scenarioName = await getScenarioName(scenarioID);

		let message2send = `
		<html>
			<img class="gttx-logo" src="https://gttx.app/svg/gttx_white.svg" alt="gttx!" />

			<p>
			Hello! A member of your organization has invited you to join a tabletop exercise on GTTX!<br/>
			GTTX is a tabletop exercise platform that allows you to simulate business crisis response scenarios.<br/>
			Your organization's facilitator has invited you to participate in an exercise: ${scenarioName}.
			Here are the codes you will need to register for your GTTX organization:<br/><br/>

			Observer code: ${inviteCodes.observer_code}<br/>
			Participant code: ${inviteCodes.participant_code}<br/><br/>

			For more information, please consult the organizer of the room: ${currentUser.email}<br/>
			Once you're ready, go to <a href="https://gttx.app/signup">https://gttx.app</a> to get started today!
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
			goto('/dashboard/notes');
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
		{#await createGame(usersIDs)}
			<center>
				<br />
				<hgroup>
					<h1 aria-busy="true">Creating your room...</h1>
					<h2>Give it a second...</h2>
				</hgroup>
				<br />
			</center>
		{:then game}
			<!-- promise was fulfilled -->
			<hgroup>
				<h1>Success! Your room has been created!</h1>
				<h2>Get your colleagues together for the exercise.</h2>
			</hgroup>
			<button on:click={() => setGame(game.id)}>Click here to enter the gameroom</button>
			<!-- {game.id} -->
			<!-- {#await setGame(game.id) catch error}
					{error}
				{/await} -->
		{:catch error}
			{error}
		{/await}
	{:else if scenarioChosen == false}
		<Scenarios bind:scenarioChosen bind:scenarioID bind:moduleID />
	{:else}
		<EmailPicker bind:emails bind:usersIDs bind:emailsPicked bind:scenarioID />
	{/if}
	<hr />
	<RecentGames />

	<pre />
{:else if $currentRole == 'observer' || $currentRole == 'participant'}
	<!-- <br /> -->
	<!-- <article>
		<RecentGames />
	</article> -->
	<RecentGames />
{:else}
	<progressbar />
{/if}
