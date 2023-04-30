<script>
	import { pb, currentUser, currentRole, RoomID} from '$lib/pocketbase';
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
		let filterMagic = `(org='${$currentUser.org}' && user='${$currentUser.id}' && room='${$currentUser.roomid}')`;
		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic
		});
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
	<progressbar />
{:else}
	{#await $currentRole}
		<progressbar />
	{:then role}
		{#if role == 'facilitator'}
			<!-- content here -->
			<NotesManager bind:scenarioObject bind:currentQuestion bind:responses />
		{:else if role == 'obverser' || role == 'participant'}
			<!-- else content here -->
			<NotesResponder bind:scenarioObject bind:currentQuestion bind:responses />
		{:else}
			<progressbar />
		{/if}
		<!-- content here -->
	{/await}
	<!-- else content here -->
{/if}
