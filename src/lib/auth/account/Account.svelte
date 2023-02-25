<script lang="ts">
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
		pb.authStore.clear();
		goto('/');
	}

	async function invite() {
		goto('/invite');
	}

	

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>




{#if $currentUser}
	<img
		src="https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100"
		alt={$currentUser.username}
	/>
	Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org.name},{$currentOrganization},{$currentUser.avatar}
	<button on:click={signout}> logout</button>
	<button on:click={invite}> invite users</button>
{/if}
