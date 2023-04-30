<script>
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '../pocketbase';

	export let question = '';

</script>

<article>
	<header>
		<b>Current Question</b>
	</header>
	{#if question}
		{question}
	{:else}
		<i>Question failed to load.</i>
	{/if}
</article>
