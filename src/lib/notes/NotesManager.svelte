<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	// import { Expor } from '$lib/notes/export';
	import Modal from '$lib/Modal.svelte';
	import Exporter from './Exporter.svelte';
	import { loop_guard } from 'svelte/internal';

	export let scenarioObject = {};
	export let responses = {};
	export let hotwashResponses = {};
	export let currentQuestion = {};
	export let activeUsers = [];
	export let roomState;
	export let roomName;

	// because we *love* global variables
	let prevLoading = false;
	let nextLoading = false;
	let prevEnabled = true;
	let nextEnabled = true;
	// let openAllResponses = open;
	let errorThrown = '';
	let showModal;
	let maxLength;
	let questionNum;

	// download variables
	let docxDownload = '';
	let latexDownload = '';
	let htmlDownload = '';

	// async function toggleResponses() {
	// 	if (openAllResponses == "open") {
	// 		openAllResponses = "";
	// 	}
	// 	else {
	// 		openAllResponses = "open";
	// 	}
	// }

	async function toggleRoomState() {
		if (roomState == 'open' || roomState == 'hotwash') {
			const data = { state: 'closed' };
			const result = await pb.collection('room').update($currentUser.roomid, data);
		} else if (roomState == 'closed' || roomState == 'waiting') {
			const data = { state: 'open' };
			const result = await pb.collection('room').update($currentUser.roomid, data);
		} else {
			errorThrown('Oops!');
		}
	}

	async function toggleHotWash() {
		if (roomState == 'open') {
			const data = { state: 'hotwash', question: 0 };
			const result = await pb.collection('room').update($currentUser.roomid, data);
			questionNum = undefined;
		} else if (roomState == 'hotwash') {
			const data = { state: 'open', question: 0 };
			const result = await pb.collection('room').update($currentUser.roomid, data);
			questionNum = undefined;
		} else {
			errorThrown('Oops!');
		}

	}

	async function incrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		nextEnabled = false;
		prevEnabled = false;
		nextLoading = true;
		const result = await pb.collection('room').getOne($currentUser.roomid);
		maxLength =
			roomState == 'hotwash'
				? scenarioObject.hotwash[result.hwoffset || 0].list.length
				: scenarioObject.modules[result.module].questions.length;

		// if (roomState == 'hotwash') {
		// 	maxLength =

		// } else {
		// 	maxLength = scenarioObject.modules[result.module].questions.length;
		// }

		// Remember result.question is base 0, maxLength is base 1
		if (result.question <= maxLength - 2) {
			questionNum = result.question + 1 + 1;
			const data = { question: result.question + 1 };
			const result2 = await pb.collection('room').update($currentUser.roomid, data);

			if (data.question <= maxLength - 2) {
				nextEnabled = true;
			}
		} else {
			questionNum = result.question + 1;
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
		maxLength =
			roomState == 'hotwash'
				? scenarioObject.hotwash[result.hwoffset || 0].list.length
				: scenarioObject.modules[result.module].questions.length;

		if (result.question >= 1) {
			questionNum = result.question - 1 + 1;
			const data = { question: result.question - 1 };
			const result2 = await pb.collection('room').update($currentUser.roomid, data);
			if (data.question >= 1) {
				prevEnabled = true;
			}
		} else {
			questionNum = result.question + 1;
			errorThrown = 'no questions left';
			prevEnabled = false;
		}
		nextEnabled = true;
		prevLoading = false;
	}

	async function fetchUserName(userID) {
		const found = activeUsers.find((activeUser) => activeUser.id === userID);
		return found?.username + ' (' + found?.email + ')';
	}
</script>

<div class="grid">
	<!-- <div> -->
	<hgroup>
		<h1>
			Notes Manager - {$currentUser.role.replace(/^[a-z]/, function (m) {
				return m.toUpperCase();
			})}
		</h1>
		{#if roomName == undefined}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<h2>Room Name: <a href="#" aria-busy="true">Loading...</a></h2>
		{:else}
			<h2>Room Name: {roomName || $currentUser.roomid}</h2>
		{/if}
	</hgroup>
	<!-- </div>
	<div style="text-align: right">
		<b>Room State</b>: 
		{#if roomState == undefined}
			<a href="#" aria-busy="true">Loading...</a>
		{:else}
			{roomState}
		{/if}
	</div> -->
</div>

<!-- {#key errorThrown}
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
{/key} -->

{#if roomState == undefined}
	<progress />
{:else if roomState == 'waiting'}
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>The room has not yet started...</h1>
			<h2>Click the button below to start the game at any time.</h2>
		</hgroup>
		<button on:click={toggleRoomState}>Start the game!</button>
	</div>
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>The Waiting Room</h1>
			<h2>These are the users that are currently waiting for the game to start.</h2>
		</hgroup>
		{#if activeUsers[0]}
			<div class="grid scrollable-grid user-list-grid">
				{#each activeUsers as user}
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a
						href="#"
						class="outline {user.role == 'observer' ? 'contrast' : ''}"
						role="button"
						style="margin-bottom: var(--spacing)"
					>
						{user.username} ({user.email})
					</a>
				{/each}
			</div>
		{:else}
			<div class="scenario-box" style="margin-bottom: 30px;">
				<!-- <input class="cursed-fake-button" type="text" value="There are currently no users in the waiting room. It's only you and your thoughts." readonly> -->
				<center>
					There are currently no users in the waiting room. It's only you and your thoughts.
				</center>
			</div>
		{/if}
	</div>
{:else if roomState == 'open' || roomState == 'closed' || roomState == 'hotwash'}
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
		{#if roomState == 'open'}
			<div class="grid">
				<div>
					<button on:click={toggleRoomState}>Close the room</button>
				</div>
				<div>
					<button on:click={toggleHotWash} class="warning">Move to Hot Wash</button>
				</div>
			</div>
		{:else if roomState == 'hotwash'}
			<div class="grid">
				<div>
					<button on:click={toggleRoomState}>Close the room</button>
				</div>
				<div>
					<button on:click={toggleHotWash} class="secondary">Return to standard questions</button>
				</div>
			</div>
		{:else}
			<button on:click={toggleRoomState} class="warning">Re-open the room</button>
		{/if}
		<hr />
		<details>
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="secondary">Current Players in Room</summary>
			{#if activeUsers[0]}
				<div class="grid scrollable-grid user-list-grid">
					{#each activeUsers as user}
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a
							href="#"
							class="outline {user.role == 'observer' ? 'contrast' : ''}"
							role="button"
							style="margin-bottom: var(--spacing)"
						>
							{user.username} ({user.email})
						</a>
					{/each}
				</div>
			{:else}
				<input
					class="cursed-fake-button"
					type="text"
					value="There are currently no users in the game room. You're all alone."
					readonly
				/>
			{/if}
		</details>
		<!-- <hr /> -->
		<hgroup>
			<!-- <h2>Current Question ({questionNum === undefined ? nomReturn[0] : questionNum}/{maxLength === undefined ? nomReturn[1] : maxLength})</h2> -->
			<h2>
				Current Question {roomState == 'hotwash' ? '(Hot Wash)' : ''} {questionNum === undefined
					? ''
					: '[' + questionNum + '/' + maxLength + ']'}
			</h2>
			<h3>This is the current question being shown to your participants and observers.</h3>
		</hgroup>

		<div class={roomState == "hotwash" ? "scenario-box-warning" : "scenario-box"} style="margin-bottom: 30px;">
			{#await currentQuestion}
				<progress />
			{:then question}
				<!-- {#if question == '' || prevLoading || nextLoading} // this is not synced so it looks ugly :(-->
				{#if question == ''}
					<progress />
				{:else}
					<!-- else content here -->
					<!-- promise was fulfilled -->
					{question}
				{/if}
			{/await}
		</div>

		<div class="grid">
			<button
				on:click={decrementQuestion}
				aria-busy={prevLoading}
				class={roomState == 'hotwash' ? 'warning' : ""}
				disabled={!prevEnabled || roomState == 'closed'}>Prev. Question</button
			>
			<button
				on:click={incrementQuestion}
				aria-busy={nextLoading}
				class={roomState == 'hotwash' ? 'warning' : ""}
				disabled={!nextEnabled || roomState == 'closed'}>Next Question</button
			>
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
			<div class="scenario-box" style="margin-bottom: 30px">
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
		{#if responsesRaw[0]}
			{#each responsesRaw as response, index}
				<details open>
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary role="button" class="secondary">
						Response {index} - {response.question}
					</summary>
					<div class="scenario-box">
						{response.content}<br />
						<hr />
						<div class="grid">
							<div>
								<em>Submitted at {response.created}</em>
							</div>
							<div style="text-align: right">
								{#if response.username && response.email}
									<em>Submitted by {response?.username} ({response?.email})</em>
								{/if}
							</div>
						</div>
					</div>
				</details>
			{/each}
		{:else}
			<center>
				<input
					class="cursed-fake-button"
					type="text"
					value="There are currently no responses."
					readonly
				/>
			</center>
		{/if}
	{:catch error}
		{error}
	{/await}
	{#await hotwashResponses then HWresponsesRaw}
		{#if HWresponsesRaw[0]}
		<!-- <hr /> -->
		<hgroup>
			<h2>Hot Wash Notes</h2>
			<h3>Notes submitted by everyone for this scenario's Hot Wash.</h3>
		</hgroup>
			{#each HWresponsesRaw as response, index}
				<details open>
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary role="button" class="warning">
						Response {index} - {response.question}
					</summary>
					<div class="scenario-box-warning">
						{response.content}<br />
						<hr />
						<div class="grid">
							<div>
								<em>Submitted at {response.created}</em>
							</div>
							<div style="text-align: right">
								{#if response.username && response.email}
									<em>Submitted by {response?.username} ({response?.email})</em>
								{/if}
							</div>
						</div>
					</div>
				</details>
			{/each}
		<!-- {:else}
			<center>
				<input
					class="cursed-fake-button"
					type="text"
					value="There are currently no responses."
					readonly
				/>
			</center> -->
		{/if}
	{:catch error}
		{error}
	{/await}
{:else}
	<script>
		//console.log((roomState);
	</script>
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>You find yourself in a strange place...</h1>
			<h2>There is no way this should be happened... unless you're trying to access an old game?</h2>
		</hgroup>
		<a role="button" href="/dashboard">Go back?</a>
	</div>
{/if}
