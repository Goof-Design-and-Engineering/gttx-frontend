<script>
	import { pb, currentUser, currentRole, RoomID } from '$lib/pocketbase';
	import NotesManager from '$lib/notes/NotesManager.svelte';
	import NotesResponder from '$lib/notes/NotesResponder.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	// subscriptions to the everchanging notes from pocketbase aka realtime
	let roomChange;
	let noteChange;

	// scenarioObject to pass around
	let scenarioObject = {};
	let currentQuestion = '';
	let responses = [];
	let loaded = false;

	onMount(async () => {
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}

		roomChange = await pb.collection('room').subscribe($currentUser.roomid, async function (e) {
			currentQuestion = await getQuestion();
			console.log(e);
		});

		noteChange = await pb.collection('notes').subscribe('*', async function (e) {
			responses = await loadResponses();
			// console.log(e)
		});

		const result = await pb.collection('room').getOne($currentUser.roomid, { expand: 'scenarios' });

		scenarioObject = result.expand.scenarios.contents;

		currentQuestion = await getQuestion();

		responses = await loadResponses();

		loaded = true;
	});

	async function getQuestion() {
		// if not loaded load it
		if (scenarioObject == null) {
			loadScenario();
		}
		const result = await pb.collection('room').getOne($currentUser.roomid);
		return scenarioObject.modules[result.module].questions[result.question];
	}

	async function loadResponses() {
		let filterMagic =
			$currentRole == 'facilitator'
				? `(org='${$currentUser.org}' && room='${$currentUser.roomid}')`
				: `(org='${$currentUser.org}' && user='${$currentUser.id}' && room='${$currentUser.roomid}')`

		console.log(filterMagic)

		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic
		});
		console.log(resultList.items)
		return resultList.items;
	}

	onDestroy(async () => {
		roomChange?.();
		noteChange?.();
	});

	$: {
		loaded = true;
	}
</script>

{#if !loaded}
	<!-- content here -->
	<progress />
{:else}
	{#await $currentUser?.role}
		<progress />
	{:then role}
		{#if role == 'facilitator'}
			<!-- content here -->
			<NotesManager bind:scenarioObject bind:currentQuestion bind:responses />
		{:else if role == 'observer' || role == 'participant'}
			<!-- else content here -->
			<NotesResponder bind:scenarioObject bind:currentQuestion bind:responses />
		{:else}
			<progress />
		{/if}
		<!-- content here -->
	{/await}
	<!-- else content here -->
{/if}
