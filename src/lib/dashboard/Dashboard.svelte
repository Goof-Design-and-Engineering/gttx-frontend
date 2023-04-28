<script>
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	async function signout() {
		try {
			await pb.authStore.clear();
		} finally {
			goto('/login');
		}
	}

	async function settings() {
		goto('/account');
	}

	async function back() {
		goto('/');
	}

	async function opengames() {
		goto('start');
	}

	async function manageorg() {
		goto('/dashboard/manage_org');
	}

	async function opennotes() {
		// alert("Not implemented.");
		goto('/dashboard/notes');
	}

	onMount(() => {
		if ($currentUser) {
			if ($currentUser.org) {
                return;
            } else {
				goto('/createorg');
			}
		} else {
			goto('/login');
		}
	});
</script>

<!-- {#await currentUser then _} -->
{#await currentUser}
	<center>
		<br/>
		<hgroup>
			<h1 aria-busy="true">Loading...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
{:then}
	<!-- promise was fulfilled -->
	{#if $currentOrganization}
		<div class="grid">
			<div>
				<hgroup>
					<h1 style="font-size: 40px;">Dashboard</h1>
					<h2>Welcome back, {$currentUser.username}</h2>
				</hgroup>
			</div>
			<div style="text-align: right;">
				{#if $currentUser.avatar}
					<img
						src="https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100"
						width="100"
						height="100"
						style="border-radius: 25px;"
						alt={$currentUser.username}
					/>
				{:else}
					<img
						src="/defaultpfp.png"
						width="100"
						height="100"
						style="border-radius: 25px;"
						alt={$currentUser.username}
					/>
				{/if}
			</div>
		</div>
		<hr />
		<article>
			<header>
				<button on:click={opengames}> Open a Game Room</button>
			</header>

			<div class="grid">
				{#if $currentRole == 'facilitator'}
					<button on:click={manageorg} class="secondary">Manage Organization</button>
				{/if}
				<button on:click={settings} class="secondary">Manage account</button>
			</div>

			<footer>
				<center>
					<br />
					<button on:click={signout} style="width: 50%;" class="contrast outline">Sign out</button>
				</center>
			</footer>
		</article>
		<!-- {:else}
    <h1>Not sure how, but this is screwy.</h1> -->
	{/if}
{/await}
