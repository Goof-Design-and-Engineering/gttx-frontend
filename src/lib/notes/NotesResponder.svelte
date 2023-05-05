<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { useForm } from 'svelte-use-form';
	import { currentUser, pb } from '$lib/pocketbase';
	export let scenarioObject = {};
	export let responses = {};
	export let currentQuestion = {};
	export let roomState;
	export let roomName;
	const form = useForm();

	let success = '';
	let response = '';
	let submitBusy = false;

	async function submitNote() {
		submitBusy = true;
		if (response[0])
		{
			const result = await pb.collection('room').getOne($currentUser.roomid);

			// //console.log(($currentUser.id);
			// //console.log(($currentUser.org);

			const data = {
				user: $currentUser.id,
				org: $currentUser.org,
				question: scenarioObject.modules[result.module].questions[result.question],
				content: response,
				room: $currentUser.roomid
			};

			const result2 = await pb.collection('notes').create(data);
			if (result2 != Object) {
				success = 'PREVIOUS MESSAGE WAS SENT PROPER';
				response = "";
			} else {
				//console.log((result);
			}
		}
		submitBusy = false;
		// reloadResponses = true;
	}
</script>

<hgroup>
	<h1>Notes Response - {$currentUser.role.replace(/^[a-z]/, function(m){ return m.toUpperCase() })	}</h1>
	{#if roomName == undefined}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<h2>Room Name: <a href="#" aria-busy="true">Loading...</a></h2>
	{:else}
		<h2>Room Name: {roomName || $currentUser.roomid}</h2>
	{/if}
</hgroup>

{#if roomState == undefined}
	<progress />
{:else if roomState == "waiting"}
	<div class="scenario-box" style="margin-bottom: 30px;">
		<hgroup>
			<h1>
				The game has not yet started...
			</h1>
			<h2>
				I guess there's nothing to do but wait...
			</h2>
		</hgroup>
		<center>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" aria-busy=true>
				Waiting for scenario to start. Contact your facilitator if this is taking too long...
			</a>
		</center>
	</div>
{:else if roomState == "open" || roomState == "closed"}
	{#if roomState == "open"}
		<form use:form on:submit|preventDefault>
			<!-- Grid -->
			<hr/>
			<hgroup>
				<h2>Request for comment</h2>
				<h3>Type your response to the question below.</h3>
			</hgroup>	
			<p id="curr_question">
				{#await currentQuestion}
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#" aria-busy="true">Loading current question...</a>
				{:then question}
					{#if (question == '')}
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" aria-busy="true">Loading current question...</a>
					{:else}
						<!-- else content here -->
						<!-- promise was fulfilled -->
						{question}
					{/if}
				{/await}
			</p>

			<label for="notes">
				<textarea bind:value={response} name="notes" id="notes" cols="50" rows="4" />
			</label>

			<input type="hidden" id="roomid" name="roomid" value={$currentUser.roomid} />

			<!-- Button -->
			<button type="submit" id="submit_answer" aria-busy={submitBusy} disabled={submitBusy} on:click={submitNote}>Submit</button>
		</form>
	{:else if roomState == "closed"}
		<hr/>
		<hgroup>
			<h2>This room has been closed</h2>
			<h3>You can no longer submit responses, but you can view your previous ones below.</h3>
		</hgroup>	
		<textarea disabled=true cols="50" rows="4" />
		<button disabled=true>Submit</button>
	{/if}
	<hr />
	<hgroup>
		<h2>Previous Notes</h2>
		<h3>Notes previously submitted by you for this scenario.</h3>
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
						{response.content}<br/><hr>
						<em>Submitted at {response.created}</em>
					</div>				
				</details>
			{/each}
		{:else}
			<center>
				<input class="cursed-fake-button" type="text" value="There are currently no responses." readonly>
			</center>
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
			<h1>
				You find yourself in a strange place...
			</h1>
			<h2>
				There is no way this should be happened...
			</h2>
		</hgroup>
		<a role="button" href="/dashboard">Go back?</a>
	</div>
{/if}