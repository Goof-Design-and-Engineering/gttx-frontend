<script>
	import { currentUser, currentRole } from '$lib/pocketbase';
	import NotesDefault from '../../../../lib/games/NotesDefault.svelte';
	import NotesFac from '../../../../lib/games/NotesFac.svelte';
	import Switch from '../../../../lib/util/Switch.svelte';
	let switchValue;

</script>

<Switch bind:value={switchValue} label="Facilitator toggle" design="slider" style="float" />


{#await currentRole then role}
	{#if switchValue == "off"}
		<NotesDefault />
	{:else}
		<NotesFac />
	{/if}
{/await}
