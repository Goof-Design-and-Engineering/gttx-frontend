<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useForm } from 'svelte-use-form';
	import { currentUser, pb } from '$lib/pocketbase';
	export let scenarioObject = {};
	export let responses = {};
	export let currentQuestion = {};
	export let activeUsers = {};
	export let roomState;
	export let roomName;

	// let success = '';
	// let response = '';
	// let submitBusy = false;

	// async function submitNote() {
	// 	submitBusy = true;
	// 	if (response[0])
	// 	{
	// 		const result = await pb.collection('room').getOne($currentUser.roomid);

	// 		// console.log($currentUser.id);
	// 		// console.log($currentUser.org);

	// 		const data = {
	// 			user: $currentUser.id,
	// 			org: $currentUser.org,
	// 			question: scenarioObject.modules[result.module].questions[result.question],
	// 			content: response,
	// 			room: $currentUser.roomid
	// 		};

	// 		const result2 = await pb.collection('notes').create(data);
	// 		if (result2 != Object) {
	// 			success = 'PREVIOUS MESSAGE WAS SENT PROPER';
	// 			response = "";
	// 		} else {
	// 			console.log(result);
	// 		}
	// 	}
	// 	submitBusy = false;
	// 	// reloadResponses = true;
	// }
</script>

<hgroup>
	<h1>
		Notes Viewer - {$currentUser.role.replace(/^[a-z]/, function (m) {
			return m.toUpperCase();
		})}
	</h1>
	<!-- <h2>Room ID: {$currentUser.roomid}</h2> -->
	{#if roomName == undefined}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<h2>Room Name: <a href="#" aria-busy="true">Loading...</a></h2>
	{:else}
		<h2>Room Name: {roomName || $currentUser.roomid}</h2>
	{/if}
</hgroup>

{#if roomState == undefined}
	<progress />
{:else if roomState == 'waiting'}
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>The game has not yet started...</h1>
			<h2>I guess there's nothing to do but wait...</h2>
		</hgroup>
		<center>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" aria-busy="true">
				Waiting for scenario to start. Contact your facilitator if this is taking too long...
			</a>
		</center>
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
					That's strange. It's only you. There isn't even a facilitator. How did this happen?
				</center>
			</div>
		{/if}
	</div>
{:else if roomState == 'open' || roomState == 'closed'}
	<details>
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary role="button" class="secondary">Current Players in Room</summary>
		<div class="grid scrollable-grid user-list-grid">
			{#if activeUsers[0]}
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
			{:else}
				<!-- <input class="cursed-fake-button" type="text" value="There are currently no users in the waiting room. It's only you and your thoughts." readonly> -->
				<center>
					There are currently no users in the waiting room. It's only you and your thoughts.
				</center>
			{/if}
		</div>
	</details>
	{#if roomState == 'open'}
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
			<hr />
			<hgroup>
				<h2>Current Question</h2>
				<h3>This is the current question being shown to the participants.</h3>
			</hgroup>

			<div class="scenario-box" style="margin-bottom: 30px;">
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
		{/await}
	{:else if roomState == 'closed'}
		<hr />
		<hgroup>
			<h1>This room has been closed</h1>
			<h2>However, you can still view all the responses.</h2>
		</hgroup>
	{/if}
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
				<details>
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
								<em>{response.user}</em>
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
{:else}
	<script>
		console.log(roomState);
	</script>
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>You find yourself in a strange place...</h1>
			<h2>There is no way this should be happened...</h2>
		</hgroup>
		<a role="button" href="/dashboard">Go back?</a>
	</div>
{/if}
