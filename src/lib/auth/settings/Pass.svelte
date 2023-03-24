<script lang="ts">
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import {
		currentUser,
		pb
	} from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	var old_password = '';
	var new_password = '';
	var new_password_again = '';
	
	async function submit() {
		alert("Not implemented.");
		goto('/account');
	}

    async function back() {
		goto('/account');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{#if $currentUser}
    <!-- <b style="font-size: 40px;">Password Change for {$currentUser.username}</b> -->
	<hgroup>
		<h1 style="font-size: 40px;">Password Change for {$currentUser.username}</h1>
		<h2>Be careful! Password changes are permanent!</h2>
	</hgroup>
	<!-- <article> -->
		<!-- Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org.name},{$currentOrganization},{$currentUser.avatar} -->
		<label>
			Old Password
			<input
				type="password"
				name="oldpassword"
				id="password"
				placeholder="hunter2"
				bind:value={old_password}
				use:validators={[required]}
			/>

			New Password
			<input
				type="password"
				name="oldpassword"
				id="password"
				placeholder="SuperSecure69"
				bind:value={new_password}
				use:validators={[required]}
			/>

			New Password (...Again)
			<input
				type="password"
				name="new_password_again"
				id="password"
				placeholder="SuperSecure69"
				bind:value={new_password_again}
				use:validators={[required]}
			/>
		</label>
	<!-- </article> -->
    <br />
    <div class="grid">
        <button on:click={back} class="secondary"> Back to Settings</button>
        <button on:click={submit}> Submit</button>
    </div>
{/if}
