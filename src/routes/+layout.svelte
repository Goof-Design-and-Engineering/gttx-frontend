<script>
	import { currentUser, pb } from '../lib/pocketbase';
	import '@picocss/pico'
	async function signout() {
		await pb.authStore.clear();
	}
</script>

<nav>
	<ul>
		<li><a href="/"><img class="gttx-logo" src="/svg/gttx_white.svg" alt="gttx!" /></a></li>
	</ul>
	<ul>
		<!-- <li><a href="/about">About</a></li> -->
		<!-- <li><a href="/login" role="button">Begin</a></li> -->
		<!-- <li><button on:click={signout()}> Signout </button></li> -->
		{#await currentUser}
			<progressbar />
		{:then _}
			{#if $currentUser}
				<li><a href="/account" role="button" class="outline">Settings</a></li>
				<li><a href="/dashboard" role="button">Dashboard</a></li>
			{:else}
				<li><a href="/login" role="button">Login</a></li>
			{/if}
		{/await}
	</ul>
</nav>
<article>
	<slot />
</article>
