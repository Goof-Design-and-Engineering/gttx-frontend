<script>
	import { currentUser, pb, RoomID } from '../pocketbase';
	import Carousel from 'svelte-carousel';
	import { goto } from '$app/navigation';

	// import NotesDefault from './NotesDefault.svelte';
	import NotesFac from './NotesFac.svelte';

	let compact = true;

	async function setRoomID(id) {
		// console.log($RoomID);
		// RoomID.set(id);
		// console.log($RoomID);
		const data = {
			"roomid" : id
		}
		const record = await pb.collection('users').update($currentUser.id, data);
		goto("/dashboard/notes")
	}

	async function recentgames() {
		// you can also fetch all records at once via getFullList
		const records = await pb.collection('room').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `org='${$currentUser.org}'`
		});

		return records;
	}
</script>

<article>
	<header>
		<hgroup>
			<h1>Recent Games</h1>
			<h2>For jumping right back into the action</h2>
		</hgroup>
	</header>
	{#await recentgames()}
		<!-- <li aria-busy="true">Loading your recent games...</li> -->
		<center>
			<br />
			<hgroup>
				<h1 aria-busy="true">Loading your recent games...</h1>
				<h2>Give it a second...</h2>
			</hgroup>
		</center>
	{:then games}
		{#if games.length != 0}
			<Carousel>
				{#each games as game}
					<hgroup>
						<h2>{game.name == '' ? game.name : game.id}</h2>
						<NotesFac bind:compactView={compact} />
						<button on:click={() => setRoomID(game.id)}> CLICK ME TO SET ROOM ID </button>
						<!-- <a href="/dashboard/notes?roomid={game.id}" > Open in a new tab instead</a> -->
					</hgroup>
				{/each}
				<!-- promise was fulfilled -->
			</Carousel>
		{:else}
		<hgroup>
			<h2>You don't have any recent games!</h2>
			<h3>Select a scenario to start a new game!</h3>
		</hgroup>
		{/if}
	{:catch error}
		{error}
	{/await}
</article>
