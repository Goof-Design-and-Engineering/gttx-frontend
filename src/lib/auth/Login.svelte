<script lang="ts">
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	const form = useForm();

	var emailaddr = '';
	var password = '';
	let isFailure = false;
	let logonError;
	let discordRedir;

	async function login() {
		try {
			isFailure = false;
			await pb.collection('user').authWithPassword(emailaddr, password);
			// throw redirect(307, '/account');
			goto('/account');
		} catch (e) {
			console.log(pb.authStore.isValid);
			logonError = e;
		}
	}

	function signup() {
		goto('/register');
	}

	onMount(async () => {
		if ($currentUser) {
			goto('/account');
		} else {
			return;
		}
	});

	// async function signout() {
	// 	pb.authStore.clear();
	// }
</script>

{#if logonError}
	<p>
		{logonError}
	</p>
{/if}

{#if !$currentUser}

	<h1 class="page-name-header">Login</h1>
	<form use:form on:submit|preventDefault>
		<label for="email">Email Address</label>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="goof@goofle.com"
			bind:value={emailaddr}
			use:validators={[required, email]}
		/>
		<HintGroup for="email">
			<Hint on="required">This is a mandatory field</Hint>
			<Hint on="email" hideWhenRequired class="login-hint"
				><i><center>Email is not valid</center></i></Hint
			>
		</HintGroup>

		<label for="password">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			bind:value={password}
			use:validators={[required]}
		/>
		<Hint for="password" on="required"><i><center>This is a mandatory field</center></i></Hint>

		<button disabled={!$form.valid} on:click={login}>Login</button>
	</form>
	{#if isFailure}
		<center><p style="color: #FF0000;">Wrong password, idiot.</p></center>
	{/if}
	<center><p>Or login with:</p></center>
	<div class="grid">
		<a href="https://www.google.com" role="button" class="oauth-button secondary" id="google-oauth"
			><i class="bi bi-google" /></a
		>
		<a href={discordRedir} role="button" class="oauth-button secondary" id="discord-oauth"
			><i class="bi bi-discord" /></a
		>
		<a href="https://www.github.com" role="button" class="oauth-button secondary" id="github-oauth"
			><i class="bi bi-github" /></a
		>
	</div>

	<hr />
	<button on:click={signup}> register </button>
{/if}
