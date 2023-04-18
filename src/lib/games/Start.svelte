<script>
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		getCurrentOrganizationRecord,
		pb
	} from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	// import InviteModalContent from '$lib/games/InviteModalContent.svelte';

	const form = useForm();

	import Switch from '$lib/util/Switch.svelte';

	import Carousel from 'svelte-carousel';

	import Modal from '$lib/Modal.svelte';
	import AddEmail from '../util/AddEmail.svelte';
	let showModal = false;

	var invitecode = '';
	var isFailure = false;
	var switchValue;
	var moduleChosen = '';
	var scenarioChosen = '';

	var inputs = [];

	async function submitinvitecode() {
		try {
			isFailure = false;
			// throw redirect(307, '/account');
		} catch (e) {
			console.log('Invite Code Failure!');
			// logonError = e;
		}
	}

	async function recentgames() {
		// you can also fetch all records at once via getFullList
		const records = await pb.collection('room').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `org='${$currentUser.org}'`
		});

		return records;
	}

	async function getScenarios() {
		const resultList = await pb.collection('scenario').getList(1, 50);
		console.log(resultList);
		return resultList.items;
	}

	async function creategame() {
		const generateRandomString = (length) =>
			Array.from({ length }, () => Math.random().toString(36)[2]).join('');

		const data = {
			uniqueid: generateRandomString(16),
			org: currentUser.org,
			users: [currentUser.id],
			currentUsers: 0,
			settings: {},
			scenarios: 'RELATION_RECORD_ID',
			question: 0,
			module: moduleChosen
		};
	}

	function setModal(scenario, module) {
		console.log(scenario, module);
		scenarioChosen = scenario;
		moduleChosen = module;
		showModal = true;
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}
	});
</script>

<Switch bind:value={switchValue} label="Facilitator toggle" design="slider" style="float" />

{#key scenarioChosen}
	<h1>{scenarioChosen}</h1>
{/key}
{#await (currentRole, currentUser)}
	<progress />
{:then}
	<!-- Facilitator -->
	{#if switchValue == 'on'}
		<!-- {#if $currentRole == 'facilitator' || switchValue == 'on'} -->
		<article>
			<header>
				<hgroup>
					<h1>Start a New Exercise</h1>
					<h2>Choose a scenario, any scenario!</h2>
				</hgroup>
			</header>
			{#await getScenarios()}
				<progress />
			{:then scenarios}
				<Carousel>
					{#each scenarios as scenario}
						<details>
							<summary>{scenario.name}</summary>
							<h2>{scenario.contents?.overview?.name || ''}</h2>
							<h5>{scenario.contents?.name || ''} {scenario.contents?.source || ''}</h5>
							<hr />
							<h4>PURPOSE</h4>
							<p>{scenario.contents?.overview?.purpose || ''}</p>
							<h4>SCOPE</h4>
							<p>{scenario.contents?.overview?.scope || ''}</p>
							<hr />
							<h4>OBJECTIVES</h4>
							<ul>
								{#each scenario.contents?.overview.objectives || [] as objective}
									<li>
										{objective}
									</li>
								{/each}
							</ul>
							<hr />
							<h4>MODULES</h4>
							<ul>
								{#each Object.entries(scenario.contents?.modules || []) as [name, module]}
									<em>
										{name}
									</em>
									<p>{module.description}</p>
									<button on:click={() => setModal(scenario.id, name)}>
										Choose this scenario and module</button
									>
								{/each}
							</ul>
						</details>
					{/each}
				</Carousel>
			{:catch error}
				<!-- promise was rejected -->
				{error}
			{/await}
		</article>

		<Modal bind:showModal>
			<AddEmail />
		</Modal>

		<article>
			<hgroup>
				<header>
					<h1>Recent Games</h1>
				</header>
				{#await recentgames()}
					<li aria-busy="true">Loading your recent games...</li>
				{:then games}
					{#if games.length != 0}
						<li>
							{#each games as game}
								<!--TODO PUT WAY TO LOOK AT GAME NOTES HERE  -->
								<ul>{game.id}</ul>
							{/each}
							<!-- promise was fulfilled -->
						</li>
					{:else}
						<h2>You don't have any recent games!</h2>
					{/if}
				{:catch error}
					{error}
				{/await}
			</hgroup>
		</article>

		<!-- Participant and Observer -->
	{:else if $currentRole == 'participant' || $currentRole == 'observer' || switchValue == 'off'}
		<hgroup>
			<h1>Join a game Room</h1>
			<h2>Let's-a go.</h2>
		</hgroup>
		<form use:form on:submit|preventDefault>
			<label for="email">Invite Code</label>
			<input
				type="invite"
				name="invite"
				id="invite"
				placeholder="N5IvhutkcLc"
				bind:value={invitecode}
				use:validators={[required]}
			/>
			<HintGroup for="email">
				<Hint on="required">This is a mandatory field</Hint>
			</HintGroup>

			<button disabled={!$form.valid} on:click={submitinvitecode}>Join</button>
		</form>
	{:else if ['facilitator', 'participant', 'observer'].includes($currentRole)}
		<hgroup>
			<br />
			<h2>You find yourself in a strange place; you don't have a valid role.</h2>
			<h3>Your current role is {$currentRole}. Please contact your organization manager.</h3>
		</hgroup>
	{/if}
{:catch error}
	<h2>Oops</h2>
	<p>
		{error}
	</p>
{/await}
