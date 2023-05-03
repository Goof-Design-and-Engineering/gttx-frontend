<script>
	import { currentUser, pb } from '../pocketbase';
	import { goto } from '$app/navigation';

	async function recentgames() {
		// you can also fetch all records at once via getFullList
		const records = await pb.collection('room').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `org='${$currentUser.org}' && (users~'${$currentUser.id}' ||  emails~'${$currentUser.email}')`
			// filter: `org='${$currentUser.org}' && users~'${$currentUser.id}'`
		});

		return records;
	}

	async function setGame(id) {
		try {
			// console.log('boom');
			const record = await pb.collection('users').update($currentUser.id, { roomid: id });
		} catch (error) {
			console.log(error);
		} finally {
			goto('/dashboard/notes');
		}
		return record;
	}
</script>

<hgroup>
	<h1>Recent Games</h1>
	<h2>Check out your previous exercises!</h2>
</hgroup>

{#await recentgames()}
	<!-- recentgames() is pending -->
	<!-- <progressbar /> -->
	<center>
		<br />
		<hgroup>
			<h1 aria-busy="true">Loading your recent games...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
{:then games}
	<!-- recentgames() was fulfilled -->
	{#if games[0]}
		<div class="grid scrollable-grid">
			{#each games as game}
				<!-- <a href="" on:click={setGame(game.id)}> INVITE CODE = {game.id} </a> -->
				<!-- <a on:click={() => setGame(game.id)}> INVITE CODE = {game.id} </a> -->
				<!-- {#if game.name}
						<button id={game.id} on:click={() => setGame(game.id)}>{game.name}, {game.created.split(" ")[0]}</button>
					{:else} -->
				<button
					class={(game.state == 'waiting' || game.state == 'open') && game.state != undefined
						? ''
						: 'secondary'}
					id={game.id}
					on:click={() => setGame(game.id)}
					>
					
					{game.name || game.id}, {game.created.split(' ')[0]}
				</button>
				<!-- {/if} -->
			{/each}
		</div>
	{:else if $currentUser?.role == 'facilitator'}
		<!-- <div class="scenario-box" style="padding-bottom: 1.5%"> -->
		<input
			style="border: 2px solid var(--primary); border-radius: 5px; text-align: center;"
			type="text"
			value="Looks like you don't have any recent games. Choose a scenario above to start one!"
			readonly
		/>
		<!-- <hgroup>
				<h1>Looks like you don't have any recent games</h1>
				<h2>Consider asking your facilitator to add you to one!</h2>
			</hgroup> -->
		<!-- </div> -->
	{:else}
		<input
			style="border: 2px solid var(--primary); border-radius: 5px; text-align: center;"
			type="text"
			value="Looks like you don't have any recent games. Ask your facilitator for more information."
			readonly
		/>
	{/if}
{:catch error}
	<!-- recentgames() was rejected -->
	{error}
{/await}
