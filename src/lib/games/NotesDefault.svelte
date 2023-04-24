<script>
	import { onMount } from 'svelte';
	import { currentUser, getCurrentOrganizationRecord, pb } from '$lib/pocketbase';

	let response = '';
	let scenarioObject;
	export let roomID = 'yir2twyh4ws5697';
	let success = '';

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}
	});

	async function loadScenario() {
		// TODO hardocded room - set with currentUser
		const result = await pb.collection('room').getOne(roomID, {
			expand: 'scenarios'
		});
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

		console.log(resultList);

		return resultList.items;
	}
</script>

{#await loadScenario()}
	<p>Loading...</p>
{:then}
	<form>
		<!-- Grid -->
		<h2>Request for comment</h2>

		<p>
			{#await getQuestion() then question}
				<!-- promise was fulfilled -->
				{question}
			{/await}
		</p>

		{#key success}
			{success}
		{/key}

		<label for="notes">
			<textarea bind:value={response} name="notes" id="notes" cols="50" rows="4" />
		</label>

		<!-- Button -->
		<button type="submit" on:click={submitNote}>Submit</button>
	</form>
{:catch error}
	<p>Error: {error.message}</p>
{/await}

<hr />
<h2>PREVIOUS NOTES</h2>
{#await loadResponses() then responses}
	<!-- promise was fulfilled -->
	<li>
		{#each responses as response}
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
