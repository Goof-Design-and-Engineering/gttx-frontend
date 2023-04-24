<script>
	import { currentUser, pb } from '../pocketbase';
	import Carousel from 'svelte-carousel';

	import NotesDefault from './NotesDefault.svelte';
	import NotesFac from './NotesFac.svelte';

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
	<hgroup>
		<header>
			<h1>Recent Games</h1>
		</header>
		{#await recentgames()}
			<li aria-busy="true">Loading your recent games...</li>
		{:then games}
			{#if games.length != 0}
				<Carousel>
					{#each games as game}
						<li>
                            
							<h2>{game.name == "" ? game.name  : game.id}</h2>
							<NotesFac bind:roomID={game.id} />
                            <a href="/dashboard/notes?roomid={game.id}"> Open in a new tab instead</a>
						</li>
					{/each}
					<!-- promise was fulfilled -->
				</Carousel>
			{:else}
				<h2>You don't have any recent games!</h2>
			{/if}
		{:catch error}
			{error}
		{/await}
	</hgroup>
</article>
