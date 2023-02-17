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

	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, {Group, Label} from  '@smui/button';

	const form = useForm();

	var emailaddr = '';
	var password = '';
	let isFailure = false;
	let logonError;
	let discordRedir;

	let invalid = false;
	$: disabled = !invalid;

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

	<h3>Login</h3>

	<form use:form on:submit|preventDefault>
		<Textfield
			type="email"
			variant="outlined"
			bind:value={emailaddr}
			bind:invalid
			updateInvalid
			label="Email"
			style="min-width: 250px;"
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
			required
		/>

		<div style="padding: 1%;">
			<Button variant="raised" color="secondary" disabled={!disabled} on:click={login}>
				<Label>Login</Label>
			</Button>
		</div>
	</form>

	{#if isFailure}
		<center><p style="color: #FF0000;">Invalid Email or Password</p></center>
	{/if}

	<center><p>Or login with:</p></center>

	<LayoutGrid>
		<Cell>
			<Button variant="raised" href="https://www.google.com" class="oauth-button secondary" id="google-oauth">
				<Label class="bi bi-google"></Label>
			</Button>
		</Cell>
		<Cell>
			<Button variant="raised" href={discordRedir} class="oauth-button secondary" id="discord-oauth">
				<Label class="bi bi-discord"></Label>
			</Button>
		</Cell>
		<Cell>
			<Button variant="raised" href="https://www.github.com" class="oauth-button secondary" id="github-oauth">
				<Label class="bi bi-github"></Label>
			</Button>
		</Cell>
	</LayoutGrid>
{/if}
