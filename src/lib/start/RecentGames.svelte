<script>
	import { currentUser, pb } from '../pocketbase';
	import { goto } from '$app/navigation';

	async function recentgames() {
		// you can also fetch all records at once via getFullList
		const records = await pb.collection('room').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `org='${$currentUser.org}'`
		});

		return records;
	}

	async function setGame(id) {
		try {
			console.log('boom');
			// const record = await pb.collection('users').update($currentUser.id, { roomid: id });
		} catch (error) {
			console.log(error);
		} finally {
			goto('/dashboard/notes');
		}
		return record;
	}
</script>

<h1>Recent Games</h1>

{#await recentgames()}
	<!-- recentgames() is pending -->
	<progressbar />
{:then games}
	<!-- recentgames() was fulfilled -->
	{#each games as game}
		<li>
			<ul>
				<!-- <a href="" on:click={setGame(game.id)}> INVITE CODE = {game.id} </a> -->
				<a href=""> INVITE CODE = {game.id} </a>
			</ul>
		</li>
	{/each}
{:catch error}
	<!-- recentgames() was rejected -->
	{error}
{/await}
