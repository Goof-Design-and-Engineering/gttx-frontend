<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	// import { Expor } from '$lib/notes/export';
	import Modal from '$lib/Modal.svelte';
	import Exporter from './Exporter.svelte';
	import { loop_guard } from 'svelte/internal';

	export let scenarioObject = {};
	export let responses = [];
	export let currentQuestion = {};

	// because we *love* global variables
	let prevLoading = false;
	let nextLoading = false;
	let prevEnabled = true;
	let nextEnabled = true;
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

		// Remember result.question is base 0, maxLength is base 1
		if (result.question <= maxLength - 2) {
			const data = { question: result.question + 1 };
			const result2 = await pb.collection('room').update($currentUser.roomid, data);

			if (data.question <= maxLength - 2) {
				nextEnabled = true; 
			}
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

		if (result.question >= 1) {
			const data = { question: result.question - 1 };
			const result2 = await pb.collection('room').update($currentUser.roomid, data);
			if (data.question >= 1) {
				prevEnabled = true; 
			}
		} else {
			errorThrown = 'no questions left';
			prevEnabled = false;
		}
		nextEnabled = true;
		prevLoading = false;
	}
</script>

<hgroup>
	<h1>Notes Manager - Facilitator</h1>
	<h2>Room ID: {$currentUser.roomid}</h2>
</hgroup>

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
	<center>
		<br />
		<hgroup>
			<h1 aria-busy="true">Loading the scenario...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
{:then scenario}
	<!-- scenarioObject was fulfilled -->
	<hr>
	<hgroup>
		<h2>Current Question</h2>
		<h3>This is the current question being shown to your participants and observers.</h3>
	</hgroup>

	<article>
		{#await currentQuestion}
			<progress/>
		{:then question}
			<!-- {#if question == '' || prevLoading || nextLoading} // this is not synced so it looks ugly :(-->
			{#if question == ''}
				<progress/>
			{:else}
				<!-- else content here -->
				<!-- promise was fulfilled -->
				{question}
			{/if}
		{/await}
	</article>

	<div class="grid">
		<button on:click={decrementQuestion} aria-busy={prevLoading} disabled={!prevEnabled}>Prev. Question</button>
		<button on:click={incrementQuestion} aria-busy={nextLoading} disabled={!nextEnabled}>Next Question</button>
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
		<div class="scenario-box">
			<Exporter bind:docxDownload bind:htmlDownload />
		</div>
	{/if}
{:catch error}
	<!-- scenarioObject was rejected -->
{/await}


<hr />
<hgroup>
	<h2>Previous Notes</h2>
	<h3>Notes previously submitted by everyone for this scenario.</h3>
</hgroup>
{#await responses then responsesRaw}
	<!-- <summary role="button"> -->
		<!-- <hgroup style=""> -->
			<!-- <b style="font-size:xx-large">Previous Notes</b> -->
			<!-- <h3 style="color:var(--contrast)">Notes previously submitted by you for this scenario.</h3> -->
		<!-- </hgroup> -->
	<!-- </summary> -->
	{#each responsesRaw as response, index}
		<details>
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="secondary">
				Response {index} - {response.question}
			</summary>
			<div class="scenario-box">
				{response.content}<br/><hr>
				<em>Submitted at {response.created}</em>
			</div>				
		</details>
	{/each}
{:catch error}
	{error}
{/await}
