<script>
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	const form = useForm();

	var emailaddr = '';
	var password = '';
	let isFailure = false;
	let loading = false;
	let logonError;
	let discordRedir;

	async function login() {
		try {
			loading = true;
			logonError = false;
			isFailure = false;
			await pb.collection('users').authWithPassword(emailaddr, password);
			// throw redirect(307, '/account');
			goto('/dashboard');
		} catch (e) {
			loading = false;
			console.log(pb.authStore.isValid);
			logonError = e;
		}
	}

	function signup() {
		goto('/signup');
	}

	onMount(async () => {
		if ($currentUser) {
			goto('/createorg');
		} else {
			return;
		}
	});

	// async function signout() {
	// 	pb.authStore.clear();
	// }
</script>

<!-- {#if logonError}
	<p>
		{logonError}
	</p>
{/if} -->

{#await currentUser then _}
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
				<Hint on="required"><i><center>This is a mandatory field</center></i><br></Hint>
				<Hint on="email" hideWhenRequired class="login-hint"
					><i><center>Email is not valid</center></i><br></Hint
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
			<Hint for="password" on="required"><i><center>This is a mandatory field</center></i><br></Hint>

			<button id="login_button" disabled={!$form.valid} on:click={login} aria-busy={loading}>Login</button>
		</form>
		{#if logonError}
			<center>
				<input style="border: 2px solid red; border-radius: 5px; text-align: center;" type="text" value={logonError} readonly>
				<!-- <p style="color: #B24C4C;">Failed to authenticate! <em data-tooltip={logonError}>(View Login Error)</em></p> -->
			</center>
		{/if}
		<!-- <center><p><s>Or login with:</s></p></center>
		<div class="grid">
			<a
				role="button"
				class="oauth-button secondary"
				id="google-oauth"
				data-tooltip="Login with Google"><i class="bi bi-google" /></a
			>
			<a
				aria-disabled=true
				role="button"
				class="oauth-button secondary"
				id="discord-oauth"
				data-tooltip="Login with Discord"><i class="bi bi-discord" /></a
			>
			<a
				role="button"
				class="oauth-button secondary"
				id="github-oauth"
				data-tooltip="Login with GitHub"><i class="bi bi-github" /></a
			>
		</div> -->
		<hr />
		<button id="signup_button" on:click={signup}> Signup </button>
	{/if}
{/await}
