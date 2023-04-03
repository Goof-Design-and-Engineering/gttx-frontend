<script lang="ts">
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	var new_username = '';
	var new_emailaddr = '';
	var new_avatar = '';

	async function submit() {
		try {
			await pb.collection('users').update($currentUser.id, { username: new_username });
			if (new_avatar != '') {
				await pb.collection('users').update($currentUser.id, { avatar: new_avatar });
			}
			goto('/account');
		} catch (e) {
			console.log(e);
			alert('Something went wrong, please try again!');
		}
	}

	async function back() {
		goto('/account');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		} else {
			new_username = $currentUser.username;
		}
	});
</script>

{#if $currentUser}
	<!-- <b style="font-size: 40px;">Password Change for {$currentUser.username}</b> -->
	<hgroup>
		<h1 style="font-size: 40px;">Edit settings for {$currentUser.username}</h1>
		<h2>Express yourself!</h2>
	</hgroup>
	<!-- <article> -->
	<!-- Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org.name},{$currentOrganization},{$currentUser.avatar} -->
	<label>
		Username
		<!--  -->
		<input
			type="text"
			name="new_username"
			id="new_username"
			bind:value={new_username}
			use:validators={[required]}
		/>

		Email Address
		<!-- bind:value={new_emailaddr} -->
		<input
			type="text"
			name="new_emailaddr"
			id="new_emailaddr"
			value={$currentUser.email}
			use:validators={[required]}
			disabled
		/>

		<label for="file"
			>Profile Picture
			<input type="file" id="pfp" name="pfp" accept="image/*" bind:value={new_avatar} disabled />
		</label>
	</label>
	<!-- </article> -->
	<br />
	<div class="grid">
		<button on:click={back} class="secondary"> Back to Settings</button>
		<button on:click={submit}> Submit</button>
	</div>
{/if}
