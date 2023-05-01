<script>
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	// var password_confirm = '';
	let signupErr;
	let loading = false;

	async function signup() {
		try {
			loading = true;
			signupErr = false;
			const data = {
				username: username,
				email: emailAddr,
				emailVisibility: emailVisibility,
				password: password,
				passwordConfirm: password,
				role: 'facilitator',
			};
			const createdUser = await pb.collection('users').create(data);
			if (createdUser != null) {
				await pb.collection('users').authWithPassword(data['username'], data['password']);
			}
			// await login();
			// throw redirect(302,"/login");
			await goto('/createorg');
		} catch (err) {
			loading = false;
			console.log(err);
			signupErr = err;
			await goto('/signup');
		}
	}

	onMount(async () => {
		if ($currentUser) {
			goto('/createorg');
		} else {
			return;
		}
	});
</script>

<!-- {#if signupErr}
	<p>
		{signupErr}
	</p>
{/if} -->

<h1 class="page-name-header">Signup</h1>
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
				<Hint on="required"><i><center>This is a mandatory field</center></i><br></Hint>
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
				<Hint on="required"><i><center>This is a mandatory field</center></i><br></Hint>
				<Hint on="email" hideWhenRequired><i><center>Email is not valid</center></i><br></Hint>
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
	<Hint for="password" on="required"><i><center>This is a mandatory field</center></i><br></Hint>

	<!-- Checkboxes -->
	<fieldset>
		<div class="grid">
			<label for="terms">
				<input type="checkbox" id="terms" name="terms" use:validators={[required]}>
				I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
			</label>
			<label for="privacy">
				<input type="checkbox" id="privacy" name="privacy" use:validators={[required]}>
				I agree to the <a href="/privacy" target="_blank">Privacy Policy</a>
			</label>
		</div>
  	</fieldset>

	<button disabled={!$form.valid} on:click={signup} aria-busy={loading}>Sign up</button>

	{#if signupErr}
	  <center>
		<input style="border: 2px solid red; border-radius: 5px; text-align: center;" type="text" value={signupErr} readonly>
	  </center>
  	{/if}
</form>

<!-- <center><p><s>Or create an account with:</s></p></center>

<div class="grid">
	<a role="button" class="oauth-button secondary" id="google-oauth" data-tooltip="Signup with Google"
		><i class="bi bi-google" /></a
	>
	<a role="button" class="oauth-button secondary" id="discord-oauth" data-tooltip="Signup with Discord"
		><i class="bi bi-discord" /></a
	>
	<a role="button" class="oauth-button secondary" id="github-oauth" data-tooltip="Signup with GitHub"
		><i class="bi bi-github" /></a
	>
</div> -->
