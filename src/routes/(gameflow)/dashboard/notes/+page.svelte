<script>
	import { currentUser, currentRole } from '$lib/pocketbase';
	import NotesDefault from '../../../../lib/games/NotesDefault.svelte';
	import NotesFac from '../../../../lib/games/NotesFac.svelte';
</script>


{#await $currentRole then role}
	{#if role == "facilitator"}
		<NotesFac />
	{:else if role == "participant" || role == "observer"}
		<NotesDefault />
	{:else}
		<center>
			<br />
			<hgroup>
				<h1 aria-busy="true">Loading...</h1>
				<h2>Give it a second...</h2>
			</hgroup>
			<br />
		</center>
	{/if}
{/await}
