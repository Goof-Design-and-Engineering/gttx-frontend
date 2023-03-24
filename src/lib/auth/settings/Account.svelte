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

    async function editsettings() {
		goto('/account/edit');
	}

	async function changepass() {
		goto('/account/password');
	}

	async function back() {
		goto('/');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{#if $currentUser}
	<div class="grid">
		<div>
			<hgroup>
				<h1 style="font-size: 40px;">Account Settings</h1>
				<h2>Welcome back, {$currentUser.username}</h2>
			</hgroup>
		</div>
		<div style="text-align: right;">
			{#if $currentUser.avatar}
				<img
				src="https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100"
				width="100"
				height="100"
				alt={$currentUser.username}
				/>
			{:else}
				<img
				src="/defaultpfp.png"
				width="100"
				height="100"
				alt={$currentUser.username}
				/>
			{/if}
		</div>
	</div>
	<hr><br/>
	<div class="grid">
		<div>
			Name
			<input type="text" value="{$currentUser.username}" readonly>
		</div>
		<div>
			Email
			<input type="text" value="{$currentUser.email}" readonly>
		</div>
	</div>
	<div class="grid">
		<div>
			Organization
			<input type="text" value="{$currentUser.org}" disabled>
		</div>
		<div>
			Role
			<input type="text" value="{$currentUser.role}" disabled>
		</div>
	</div>
	<!-- </article> -->
    <br />
    <div class="grid">
        <button on:click={editsettings}> Edit Account</button>
        <button on:click={changepass}> Change Password</button>
        <button on:click={signout} class="secondary"> Sign Out</button>
    </div>
{/if}
