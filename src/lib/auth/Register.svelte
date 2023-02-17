<script lang="ts">
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, {Group, Label} from  '@smui/button';


	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	// var password_confirm = '';
	let signupErr;

	let invalid = false;
	$: disabled = !invalid;

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

<h3>Register</h3>
<form use:form on:submit|preventDefault method="POST">
	<Textfield
		type="username"
		variant="outlined"
		bind:value={username}
		bind:invalid
		updateInvalid
		label="Username"
		placeholder="Goof"
		required
	/>

	<Textfield
		type="email"
		variant="outlined"
		bind:value={emailAddr}
		bind:invalid
		updateInvalid
		label="Email"
		placeholder="goof@goofle.com"
		input$autocomplete="email"
		required
	/>

	<Textfield
		type="password"
		variant="outlined"
		bind:value={password}
		bind:invalid
		updateInvalid
		label="Password"
		placeholder="Password"
		required
	/>

	<div style="padding: 1%;">
		<Button variant="raised" color="secondary" disabled={!disabled} on:click={signup}>
			<Label>Sign Up</Label>
		</Button>
	</div>
</form>

<center><p>Or create an account with:</p></center>

<LayoutGrid>
	<Cell>
		<Button variant="raised" href="https://www.google.com" class="oauth-button secondary" id="google-oauth">
			<Label class="bi bi-google"></Label>
		</Button>
	</Cell>
	<Cell>
		<Button variant="raised" href="https://www.discord.com" class="oauth-button secondary" id="discord-oauth">
			<Label class="bi bi-discord"></Label>
		</Button>
	</Cell>
	<Cell>
		<Button variant="raised" href="https://www.github.com" class="oauth-button secondary" id="github-oauth">
			<Label class="bi bi-github"></Label>
		</Button>
	</Cell>
</LayoutGrid>
