<script lang="ts">
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '../pocketbase';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	async function signout() {
		pb.authStore.clear();
		goto("/")
	}
	async function login() {
		throw redirect(302, '/login');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

<!-- 
{#await $currentUser}
	<h1>LOADING...</h1>
{:then currentUser}
	{#if currentUser}
		<img
			src="https://api.gttx.app/api/files/_pb_users_auth_/{currentUser.id}/{currentUser.avatar}?thumb=100x100"
			alt={currentUser.username}
		/>
		Signed in as {currentUser.username}, {$currentRole},{currentUser.org},{$currentOrganization},{currentUser.avatar}
		<button on:click={signout}> logout</button>
	{:else}
		You're not logged in...
	{/if}
{/await} -->

{#if $currentUser}
	<img
		src="https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100"
		alt={$currentUser.username}
	/>
	Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org},{$currentOrganization},{$currentUser.avatar}
	<button on:click={signout}> logout</button>
{/if}
