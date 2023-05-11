<script>
	import { pb, currentUser, currentRole, RoomID } from '$lib/pocketbase';
	import NotesManager from '$lib/notes/NotesManager.svelte';
	import NotesResponder from '$lib/notes/NotesResponder.svelte';
	import NotesViewer from '$lib/notes/NotesViewer.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	// subscriptions to the everchanging notes from pocketbase aka realtime
	let roomChange;
	let noteChange;
	let userChange;

	// scenarioObject to pass around
	let scenarioObject = {};
	let currentQuestion = '';
	let responses = [];
	let hotwashResponses = [];
	let activeUsers = [];
	let loaded = false;
	let roomState;
	let roomName;
	let refresh;
	let maxLength;

	onMount(async () => {
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}

		userChange = await pb.collection('users').subscribe('*', async function (e) {
			activeUsers = await getActiveUsers();
			//console.log((e);
		});

		roomChange = await pb.collection('room').subscribe($currentUser.roomid, async function (e) {
			currentQuestion = await getQuestion();
			roomState = await getRoomState();
			const result = await pb.collection('room').getOne($currentUser.roomid);
			maxLength =
				roomState == 'hotwash'
					? scenarioObject.hotwash[result.hwoffset || 0].list.length
					: scenarioObject.modules[result.module].questions.length;
			//console.log((e);
		});

		noteChange = await pb.collection('notes').subscribe('*', async function (e) {
			responses = await loadResponses();
			hotwashResponses = await loadHWResponses();
			// //console.log((e)
		});

		const result = await pb.collection('room').getOne($currentUser.roomid, { expand: 'scenarios' });

		scenarioObject = result.expand.scenarios.contents;
		roomName = result.name || result.id;

		currentQuestion = await getQuestion();

		roomState = await getRoomState();

		activeUsers = await getActiveUsers();

		responses = await loadResponses();
		hotwashResponses = await loadHWResponses();

		loaded = true;
	});

	async function getQuestion() {
		// if not loaded load it
		if (scenarioObject == null) {
			loadScenario();
		}

		const result = await pb.collection('room').getOne($currentUser.roomid);

		if (roomState == 'hotwash') {
			// console.log(scenarioObject.hotwash[result.hwoffset || 0].list)
			return scenarioObject.hotwash[result.hwoffset || 0].list[result.question];
		} else {
			// console.log(scenarioObject.modules[result.module].questions[result.question]);
			return scenarioObject.modules[result.module].questions[result.question];
		}
	}

	async function loadResponses() {
		// ? is if user is facilitator or observer, grabbing ALL notes
		// : if if user is not facilitator or observer, therefore we must filter for only their notes
		let filterMagic =
			$currentRole == 'facilitator' || $currentRole == 'observer'
				? `(org='${$currentUser.org}' && room='${$currentUser.roomid}' && state='open')`
				: `(org='${$currentUser.org}' && user='${$currentUser.id}' && room='${$currentUser.roomid}' && state='open')`;
		// //console.log((filterMagic)

		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic
		});
		// console.log((resultList.items));
		return resultList.items;
	}

	async function loadHWResponses() {
		// ? is if user is facilitator or observer, grabbing ALL notes
		// : if if user is not facilitator or observer, therefore we must filter for only their notes
		let filterMagic =
			$currentRole == 'facilitator' || $currentRole == 'observer'
				? `(org='${$currentUser.org}' && room='${$currentUser.roomid}' && state='hotwash')`
				: `(org='${$currentUser.org}' && user='${$currentUser.id}' && room='${$currentUser.roomid}' && state='hotwash')`;
		// //console.log((filterMagic)

		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic
		});
		// console.log((resultList.items));
		return resultList.items;
	}

	async function getActiveUsers() {
		let filterMagic =
			$currentRole == 'facilitator' || $currentRole == 'observer'
				? `(org='${$currentUser.org}' && roomid='${$currentUser.roomid}' && role!='facilitator')`
				: ``;
		// //console.log((filterMagic)

		const resultList = await pb.collection('users').getList(1, 50, {
			filter: filterMagic
		});
		//console.log((resultList.items);
		return resultList.items;
	}

	async function getRoomState() {
		// if not loaded load it
		const result = await pb.collection('room').getOne($currentUser.roomid);
		//console.log((result);
		//console.log((result.state);
		return result.state;
	}

	onDestroy(async () => {
		roomChange?.();
		noteChange?.();
		userChange?.();
	});

	$: {
		loaded = true;
		// if (refresh) {
		// 	refreshVals()
		// }
	}

	$: refresh;
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
			<NotesManager
				bind:scenarioObject
				bind:currentQuestion
				bind:responses
				bind:hotwashResponses
				bind:roomState
				bind:activeUsers
				bind:roomName
				bind:maxLength
			/>
		{:else if role == 'participant'}
			<!-- else content here -->
			<NotesResponder
				bind:scenarioObject
				bind:currentQuestion
				bind:responses
				bind:hotwashResponses
				bind:roomState
				bind:roomName
			/>
		{:else if role == 'observer'}
			<NotesViewer
				bind:scenarioObject
				bind:currentQuestion
				bind:responses
				bind:hotwashResponses
				bind:roomState
				bind:activeUsers
				bind:roomName
			/>
		{:else}
			<progress />
		{/if}
		<!-- content here -->
	{/await}
	<!-- else content here -->
{/if}
