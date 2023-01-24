<script lang="ts">
	import { currentRole, currentUser, currentOrganization, currentProfilePic, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { escape_attribute_value } from 'svelte/internal';
	const form = useForm();

	var emailaddr = '';
	var password = '';

	async function login() {
		await pb.collection('users').authWithPassword(emailaddr, password);
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
	<form on:submit|preventDefault>
		<h1>Login</h1>

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
	<div class="grid">
		<button class="secondary"><i class="bi bi-google" /></button>
		<button class="secondary"><i class="bi bi-discord" /></button>
		<button class="secondary"><i class="bi bi-github" /></button>
	</div>
{/if}
