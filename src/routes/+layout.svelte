<script>
	import { currentUser, pb } from '../lib/pocketbase';
	import '@picocss/pico'

</script>

<nav>
	<ul>
		<li><a href="/"><img class="gttx-logo" src="/svg/gttx_white.svg" alt="gttx!" /></a></li>
	</ul>
	<ul>
		<!-- <li><a href="/about">About</a></li> -->
		<!-- <li><a href="/login" role="button">Begin</a></li> -->
		<!-- <li><button on:click={signout()}> Signout </button></li> -->
		{#await $currentUser}
			<progressbar />
		{:then user}
			{#if user}
				<li><a href="/account" role="button" class="outline">Settings</a></li>
				<li><a href="/dashboard" role="button">Dashboard</a></li>
			{:else}
				<details role="list" dir="rtl">
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary href="#" aria-haspopup="listbox" role="button">Get Started!</summary>
					<ul role="listbox" style="text-align: center;">
					<li><a href="/login">Login</a></li>
					<li><a href="/signup">Signup</a></li>
					</ul>
			  	</details>
			{/if}
		{/await}
	</ul>
</nav>
<article>
	<slot />
</article>
