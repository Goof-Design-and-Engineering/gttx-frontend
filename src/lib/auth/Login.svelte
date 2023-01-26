<script lang="ts">
	import { currentRole, currentUser, currentOrganization, currentProfilePic, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { escape_attribute_value } from 'svelte/internal';
	const form = useForm();

	var emailaddr = '';
	var password = '';
	let isFailure = false;

	async function login() {
		try {
			isFailure = false;
			await pb.collection('users').authWithPassword(emailaddr, password);
		} catch (e) {
			console.log(pb.authStore.isValid);
			isFailure = true;
		}
	}
	async function signout() {
		pb.authStore.clear();
	}
</script>

{#if $currentUser}
	<p>
		<img src='https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100' alt={$currentUser.username}/>
		Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org},{$currentOrganization},{$currentUser.avatar}
	</p>
	<button on:click={signout}> logout</button>
{:else}
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
			<Hint on="email" hideWhenRequired>Email is not valid</Hint>
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
		<Hint for="password" on="required">This is a mandatory field</Hint>

		<button disabled={!$form.valid} on:click={login}>Login</button>
	</form>
	{#if isFailure}
		<center><p style="color: #FF0000;">Wrong password, idiot.</p></center>
	{/if}
	<center><p>Or login with:</p></center>
	<div class="grid">
		<button class="secondary" id="google-oauth"><i class="bi bi-google" /></button>
		<button class="secondary" id="discord-oauth"><i class="bi bi-discord" /></button>
		<button class="secondary" id="github-oauth"><i class="bi bi-github" /></button>
	</div>
{/if}