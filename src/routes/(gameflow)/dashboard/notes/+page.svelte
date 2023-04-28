<script>
	import { currentUser, currentRole } from '$lib/pocketbase';
	import NotesDefault from '../../../../lib/games/NotesDefault.svelte';
	import NotesFac from '../../../../lib/games/NotesFac.svelte';
</script>

{#await $currentRole then role}
	{#if role == 'facilitator'}
		<NotesFac />
	{:else if role == 'observer' || role == 'participant'}
		<NotesDefault />
	{:else}
		<progressbar />
	{/if}
{/await}
