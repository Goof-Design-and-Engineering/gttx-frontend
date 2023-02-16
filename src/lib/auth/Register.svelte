<script lang="ts">
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	// var password_confirm = '';
	let signupErr;

	async function signup() {
		try {
			const data = {
				username: username,
				email: emailAddr,
				emailVisibility: emailVisibility,
				password: password,
				passwordConfirm: password,
				name: 'test',
				role: 'facilitator',
				org: 'itqo87s9chb4qk8'
			};
			const createdUser = await pb.collection('user').create(data);
			if (createdUser != null) {
				await pb.collection('user').authWithPassword(data['username'], data['password']);
			}
			// await login();
			// throw redirect(302,"/login");
			await goto('/account');
		} catch (err) {
			console.log(err);
			signupErr = err;
			await goto('/register');
		}
	}

	onMount(async () => {
		if ($currentUser) {
			goto('/account');
		} else {
			return;
		}
	});
</script>

{#if signupErr}
	<p>
		{signupErr}
	</p>
{/if}

<h1 class="page-name-header">Register</h1>
<form use:form on:submit|preventDefault method="POST">
	<div class="grid">
		<div>
			<label for="username">Username</label>
			<input
				type="username"
				name="username"
				id="username"
				placeholder="Goof"
				bind:value={username}
				use:validators={[required]}
			/>
			<HintGroup for="username">
				<Hint on="required">This is a mandatory field</Hint>
			</HintGroup>
		</div>

		<div>
			<label for="email">Email Address</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="goof@goofle.com"
				bind:value={emailAddr}
				use:validators={[required, email]}
			/>
			<HintGroup for="email">
				<Hint on="required">This is a mandatory field</Hint>
				<Hint on="email" hideWhenRequired><i><center>Email is not valid</center></i></Hint>
			</HintGroup>
		</div>
	</div>

	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		placeholder="Password"
		bind:value={password}
		use:validators={[required]}
	/>
	<Hint for="password" on="required">This is a mandatory field</Hint>

	<button disabled={!$form.valid} on:click={signup}>Sign up</button>
</form>

<center><p>Or create an account with:</p></center>

<div class="grid">
	<a href="https://www.google.com" role="button" class="oauth-button secondary" id="google-oauth"
		><i class="bi bi-google" /></a
	>
	<a href="https://www.discord.com" role="button" class="oauth-button secondary" id="discord-oauth"
		><i class="bi bi-discord" /></a
	>
	<a href="https://www.github.com" role="button" class="oauth-button secondary" id="github-oauth"
		><i class="bi bi-github" /></a
	>
</div>
