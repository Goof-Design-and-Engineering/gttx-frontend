<script lang="ts">
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const form = useForm();

	var username = '';
	var emailAddr = '';
	var emailVisibility = true;
	var password = '';
	var orgkey = '';
	// var password_confirm = '';
	let signupErr;

	async function get_organization_role(key) {
		let invite_codes = ['facilitator_code', 'observer_code', 'participant_code'];
		let invite_roles = ['facilitator', 'observer', 'participant'];

		// ["facilitator_code","observer_code","participant_code"].forEach(async (element) =>  {
		// })

		let counter = 0;

		for (const invite_code of invite_codes) {
			try {
				const result = await pb
					.collection('organization')
					.getFullList(200, { filter: `${invite_code}="${key}"` });
				console.log(typeof result);
				console.log(result);
				if (Array.isArray(result) && result.length == 1) {
					// return (result[0], invite_roles[counter]);
					let org_name = result[0],
						role_name = invite_roles[counter];
					return { org_name, role_name };
				}
				counter++;
			} finally {
				console.log('');
			}
		}
	}

	async function signup() {
		try {
			let org_magic = await get_organization_role(orgkey);

			const data = {
				username: username,
				email: emailAddr,
				emailVisibility: emailVisibility,
				password: password,
				passwordConfirm: password,
				name: 'test',
				role: org_magic.role_name || '',
				org: org_magic.org_name?.id || ''
			};
			const createdUser = await pb.collection('users').create(data);
			if (createdUser != null) {
				await pb.collection('users').authWithPassword(data['username'], data['password']);
			}
			// await login();
			// throw redirect(302,"/login");
			await goto('/createorg');
		} catch (err) {
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

{#if signupErr}
	<p>
		{signupErr}
	</p>
{/if}

<h1 class="page-name-header">Signup</h1>
<form use:form on:submit|preventDefault method="POST" in:fly={{ delay: 100, duration: 500, y: -10, }} out:fly={{ duration: 500,  y: 10, }}>
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

	<label for="orgkey">Invite code</label>
	<input
		type="text"
		name="orkgey"
		id="text"
		placeholder=""
		bind:value={orgkey}
		use:validators={[required]}
	/>

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
