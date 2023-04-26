<script>
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { currentRole, currentUser, pb, getCurrentOrganizationRecord, formatScenario } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	// import InviteModalContent from '$lib/games/InviteModalContent.svelte';
	import GamesList from './GamesList.svelte';

	const form = useForm();

	import Switch from '$lib/util/Switch.svelte';

	import Carousel from 'svelte-carousel';

	import Modal from '$lib/Modal.svelte';
	import AddEmail from '../util/AddEmail.svelte';
	let showModal = false;

	// values to pass to addEmail
	let gameData = {};

	// values found elsewhere
	var invitecode = '';
	var isFailure = false;
	var switchValue;
	var moduleChosen = '';
	var scenarioChosen = '';
	var message2send = '';

	var inputs = [];

	async function submitinvitecode() {
		try {
			isFailure = false;
			goto(`/dashboard/notes?roomid=${invitecode}`);
			// throw redirect(307, '/account');
		} catch (e) {
			console.log('Invite Code Failure!');
			// logonError = e;
		}
	}

	

	async function getScenarios() {
		const resultList = await pb.collection('scenario').getList(1, 50);
		console.log(resultList);
		return resultList.items;
	}

	function setModal(scenario, module) {
		console.log(scenario, module);
		scenarioChosen = scenario;
		moduleChosen = module;

		gameData = {
			org: $currentUser.org,
			users: [$currentUser.id],
			currentUsers: 0,
			settings: {},
			question: 0,
			module: module,
			scenarios: scenario
		};
		showModal = true;
	}

	onMount(async () => {
		const org = await getCurrentOrganizationRecord();

		message2send = `Hello! Welcome to GTTX. Here is the information to get started:\nobserver_code: ${org.observer_code}\nparticipant_code: ${org.participant_code}\n facilitator_code:${org.facilitor_code}. GOTO https://gttx.api/blah to get started!`;

		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}

		window.onunhandledrejection = (e) => {
			throw error(404, {
				message: 'Not found'
			});
		};
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
			{:then rawScenarios}
				{#await formatScenario(rawScenarios) then scenarios}
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
					{error}
				{/await}
			{:catch error}
				<!-- promise was rejected -->
				{error}
			{/await}
		</article>

		<Modal bind:showModal>
			<AddEmail {gameData} />
		</Modal>

		<GamesList />

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
