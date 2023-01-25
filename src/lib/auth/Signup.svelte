<script lang="ts">
	import { currentRole, currentUser, currentOrganization, currentProfilePic, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { escape_attribute_value } from 'svelte/internal';

	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	var password_confirm = '';

	async function login() {
		await pb.collection('users').authWithPassword(emailAddr, password);
	}

	async function signup() {
		try{
			const data = {
				"username": username,
				"email": emailAddr,
				"emailVisibility": emailVisibility,
				"password": password,
				"passwordConfirm": password,
				"name": "test",
				"role": "facilitator",
				"org": "itqo87s9chb4qk8"
			};
			const createdUser = await pb.collection('users').create(data);
			await login();
		} catch (err){
			console.error(err)
		}
	}
	async function signout() {
		pb.authStore.clear();
	}
</script>

{#if $currentUser}
	<p>
		Looks like you're already signed into an account (Hi, {$currentUser.username}!).
		Sign out to make a new account, or head to the login page to login.
	</p>
	<div class="grid">
		<button on:click={signout}>Login</button>
		<button on:click={signout} class="secondary">Logout</button>
	</div>
{:else}
	<h1 class="page-name-header">Signup</h1>
	<form use:form on:submit|preventDefault>
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
				<Hint on="email" hideWhenRequired>Email is not valid</Hint>
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

		<button disabled={!$form.valid} on:click={signup}>Signup</button>
	</form>

	<center><p>Or login with:</p></center>

	<div class="grid">
		<button class="secondary" id="google-oauth"><i class="bi bi-google" /></button>
		<button class="secondary" id="discord-oauth"><i class="bi bi-discord" /></button>
		<button class="secondary" id="github-oauth"><i class="bi bi-github" /></button>
	</div>
{/if}
