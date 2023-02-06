<script lang="ts">
	import { currentRole, currentUser, currentOrganization, currentProfilePic, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { redirect } from '@sveltejs/kit';
	import { escape_attribute_value } from 'svelte/internal';
	import { goto } from '$app/navigation';

	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	var password_confirm = '';

	async function login() {
		throw redirect(302, '/login');
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
			if (createdUser != null){
				await pb.collection('users').authWithPassword(data["username"],data["password"]);
				
			}
			// await login();
			// throw redirect(302,"/login");
			await goto("/account");

		} catch (err){
			console.log(err);
			await goto("/signup")
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
		<form method="POST" action="?/login">
			<button>Login</button>
		</form>
		<button on:click={signout} class="secondary">Logout</button>
	</div>
{:else}
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
		<a href="https://www.google.com" role="button" class="oauth-button secondary" id="google-oauth"><i class="bi bi-google" /></a>
		<a href="https://www.discord.com" role="button" class="oauth-button secondary" id="discord-oauth"><i class="bi bi-discord" /></a>
		<a href="https://www.github.com" role="button" class="oauth-button secondary" id="github-oauth"><i class="bi bi-github" /></a>
	</div>
{/if}
