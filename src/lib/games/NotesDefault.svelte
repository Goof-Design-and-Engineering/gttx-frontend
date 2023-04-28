<script>
	import { onDestroy, onMount } from 'svelte';
	import { currentUser, getCurrentOrganizationRecord, pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import CurrentQuestion from './CurrentQuestion.svelte';

	let response = '';
	let scenarioObject;
	const url = $page.url;
	export let roomID = url.searchParams.get('roomid') || '';
	let success = '';
	let roomChange;
	let noteChange;
	let metaQuestion = '';
	let responses = [];

	onMount(async () => {
		roomChange = await pb.collection('room').subscribe(roomID, async function (e) {
			// console.log(e.record);
			metaQuestion = await getQuestion();
			// if (e.record.question != currQ) {
			// 	const result = await getQuestionForSubscription(e.record.module, e.record.question);
			// 	// currQ = "test";
			// 	metaQuestion = result || '';
			// }
		});

		noteChange = await pb.collection('notes').subscribe('*', async function (e) {
			responses = await loadResponses();
		});

		responses = await loadResponses();

		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}
	});

	onDestroy(async () => {
		roomChange?.();
		noteChange?.();
	});

	async function getQuestionCreateSubscription() {
		return getQuestion();
	}

	async function getQuestionForSubscription(m, q) {
		const result = await pb.collection('room').getOne(roomID);
		return scenarioObject.modules[m].questions[q];
	}

	async function loadScenario() {
		// TODO hardocded room - set with currentUser
		const result = await pb.collection('room').getOne(
			roomID,
			{
				expand: 'scenarios'
			},
			{ $cancelKey: 'scenario' }
		);
		// console.log(result);
		scenarioObject = result.expand.scenarios.contents;
	}

	async function getQuestion() {
		// if not loaded load it
		if (scenarioObject == null) {
			loadScenario();
		}

		const result = await pb.collection('room').getOne(roomID);

		return scenarioObject.modules[result.module].questions[result.question];
	}

	async function submitNote() {
		const result = await pb.collection('room').getOne(roomID);

		console.log($currentUser.id);
		console.log($currentUser.org);

		const data = {
			user: $currentUser.id,
			org: $currentUser.org,
			question: scenarioObject.modules[result.module].questions[result.question],
			content: response,
			room: roomID
		};

		const result2 = await pb.collection('notes').create(data);
		if (result2 != Object) {
			success = 'PREVIOUS MESSAGE WAS SENT PROPER';
		} else {
			console.log(result);
		}
		// reloadResponses = true;
	}

	async function loadResponses() {
		// const result = await pb.collection('room').getOne(roomID);

		// const result = await pb.collection('room').getOne(roomID);
		// let currQ = scenarioObject.modules[result.module].questions[result.question];
		// console.log(currQ);
		let filterMagic = `(org='${$currentUser.org}' && user='${$currentUser.id}')`;
		console.log(filterMagic);
		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic
		});


		return resultList.items;
	}
</script>

{#await loadScenario()}
	<p>Loading...</p>
{:then}
	<form>
		<!-- Grid -->
		<h2>Request for comment</h2>

		<p id="curr_question">
			{#await getQuestion() then question}
				<!-- promise was fulfilled -->
				{#if metaQuestion != ''}
					{metaQuestion}
				{:else}
					{question}
				{/if}
			{/await}
		</p>

		{#key success}
			{success}
		{/key}

		<label for="notes">
			<textarea bind:value={response} name="notes" id="notes" cols="50" rows="4" />
		</label>

		<input type="hidden" id="roomid" name="roomid" value={roomID} />

		<!-- Button -->
		<button type="submit" id="submit_answer" on:click={submitNote}>Submit</button>
	</form>
{:catch error}
	<p>Error: {error.message}</p>
{/await}

<hr />
<h2>PREVIOUS NOTES</h2>
{#await responses then responsesRaw}
	<!-- promise was fulfilled -->
	<li>
		{#each responsesRaw as response}
			<!-- content here -->
			<h3>
				{response.question}
			</h3>
			<p>
				{response.content}
			</p>
		{/each}
	</li>
{:catch error}
	{error}
{/await}
