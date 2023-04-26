<script>
	export let question = '';
</script>

<article>
	<header>
		<b>Current Question</b>
	</header>
	{#if question}
		{question}
	{:else}
		Question failed to load.
	{/if}
</article>
