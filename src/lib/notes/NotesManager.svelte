<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	// import { Expor } from '$lib/notes/export';
	import Modal from '$lib/Modal.svelte';
	import Exporter from './Exporter.svelte';

	export let scenarioObject = {};
	export let responses = {};
	export let currentQuestion = {};

	// because we *love* global variables
	let prevLoading;
	let nextLoading;
	let prevEnabled;
	let nextEnabled;
	let errorThrown = '';
	let showModal;
	let docxDownload = '';
	let latexDownload = '';
	let htmlDownload = '';

	async function incrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		nextEnabled = false;
		prevEnabled = false;
		nextLoading = true;
		const result = await pb.collection('room').getOne($currentUser.roomid);

		let maxLength = scenarioObject.modules[result.module].questions.length;

		if (result.question < maxLength) {
			const data = {
				question: result.question + 1
			};

			const result2 = await pb.collection('room').update($currentUser.roomid, data);

			nextEnabled = true;
		} else {
			errorThrown = 'no questions left';
			nextEnabled = false;
		}
		prevEnabled = true;
		nextLoading = false;
	}

	async function decrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		prevLoading = true;
		prevEnabled = false;
		nextEnabled = false;
		const result = await pb.collection('room').getOne($currentUser.roomid);

		if (result.question > 1) {
			const data = {
				question: result.question - 1
			};

			const result2 = await pb.collection('room').update($currentUser.roomid, data);

			prevEnabled = true;
		} else {
			errorThrown = 'no questions left';
			prevEnabled = false;
		}
		nextEnabled = true;
		prevLoading = false;
	}
</script>

<h1>NOTES MANAGER</h1>

{#key errorThrown}
	{#if errorThrown != ''}
		<h1>{errorThrown}</h1>
		<button
			on:click={() => {
				errorThrown = '';
			}}
		>
			clear error</button
		>
	{/if}
{/key}

{#await scenarioObject}
	<!-- scenarioObject is pending -->
{:then scenario}
	<!-- scenarioObject was fulfilled -->

	<h2>Current Question</h2>

	<article>
		{#await currentQuestion}
			<progressbar />
		{:then question}
			{#if question == ''}
				<progressbar />
			{:else}
				<!-- else content here -->
				<!-- promise was fulfilled -->
				{question}
			{/if}
		{/await}
	</article>

	<div class="grid">
		<button on:click={decrementQuestion}>Prev. Question</button>
		<button on:click={incrementQuestion}>Next Question</button>
	</div>

	<button
		on:click={() => {
			showModal = !showModal;
		}}
		class="secondary"
	>
		Show Scenario Information
	</button>

	{#if scenario.overview == null}
		<!-- content here -->
		<progressbar />
	{:else}
		<!-- else content here -->

		<Modal bind:showModal>
			<article>
				<header>
					<b>Scope</b>
				</header>
				{scenario?.overview?.scope}
			</article>
			<article>
				<header>
					<b>Purpose</b>
				</header>
				{scenario?.overview?.purpose}
			</article>

			<article>
				<header>
					<b>Objectives</b>
				</header>
				<ul>
					{#each scenario.overview.objectives as objective}
						<!-- {#await}
                <article aria-busy="true" />
            {:then objective} -->
						<li>{objective}</li>
						<!-- {:catch error}
                <li>Failed to load this objective ({error})</li>
            {/await} -->
					{/each}
				</ul>
			</article>
		</Modal>
		<!-- exporting options -->
		<Exporter bind:docxDownload bind:htmlDownload />
	{/if}
{:catch error}
	<!-- scenarioObject was rejected -->
{/await}
