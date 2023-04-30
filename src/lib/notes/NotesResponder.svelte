<script>
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	export let scenarioObject = {};
	export let responses = {};
	export let currentQuestion = {};

	let success = '';
	let response = '';

	async function submitNote() {
		const result = await pb.collection('room').getOne($currentUser.roomid);

		// console.log($currentUser.id);
		// console.log($currentUser.org);

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
		} else {
			console.log(result);
		}
		// reloadResponses = true;
	}
</script>

<h1>NOTES RESPONDER</h1>

<form>
	<!-- Grid -->
	<h2>Request for comment</h2>

	<p id="curr_question">
		{#await currentQuestion}
			<progressbar />
		{:then question}
			{#if (question == '')}
				<progressbar />
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
	<button type="submit" id="submit_answer" on:click={submitNote}>Submit</button>
</form>

<hr />
<h2>PREVIOUS NOTES</h2>
{#await responses then responsesRaw}
	<!-- promise was fulfilled -->
	{#each responsesRaw as response, index}
		<details>
			<summary>Response {index}</summary>
			<!-- content here -->
			<h3>
				{response.question}
			</h3>
			<p>
				{response.content}
			</p>
		</details>
	{/each}
{:catch error}
	{error}
{/await}
