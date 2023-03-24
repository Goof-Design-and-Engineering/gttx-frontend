<script lang="ts">
	import { pb, currentUser, currentOrganization } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const form = useForm();

	let organization;
	let secretkey;
	let signupErr;

	async function signup() {
		try {
			if (secretkey != 'password') {
				signupErr = 'INVALID SIGNUP TOKEN';
				return;
			}

			const data = {
				name: organization,
				members: [$currentUser.id]
			};
			const createdOrg = await pb.collection('organization').create(data);
			if (createdOrg != null) {
				const newOrg = { org: createdOrg.id };
				pb.collection('users').update(pb.authStore.model?.id, newOrg);
			}
			await goto('/account');
		} catch (err) {
			console.log(err);
			signupErr = err;
			await goto('/createorg');
		}
	}

	async function signout() {
		await pb.authStore.clear();
		goto('/');
	}

	onMount(async () => {
		if ($currentUser.org == '') {
			return;
		} else {
			goto('/account');
		}
	});
</script>

{#if signupErr}
	<p>
		{signupErr}
	</p>
{/if}

<h1 class="page-name-header">Create new org</h1>
<form use:form on:submit|preventDefault method="POST">
	<div class="grid">
		<div>
			<label for="organization">Organization Name</label>
			<input
				type="username"
				name="organization"
				id="username"
				placeholder="Goof, LLC"
				bind:value={organization}
				use:validators={[required]}
			/>
			<HintGroup for="organization">
				<Hint on="required">This is a mandatory field</Hint>
			</HintGroup>
		</div>

		<div>
			<label for="secretkey">Invite key</label>
			<input
				type="password"
				name="secretkey"
				id="secretkey"
				placeholder="dQw4w9WgXcQ"
				bind:value={secretkey}
				use:validators={[required]}
			/>
			<HintGroup for="secretkey">
				<Hint on="required">This is a mandatory field</Hint>
				<Hint on="secretkey" hideWhenRequired><i><center>Email is not valid</center></i></Hint>
			</HintGroup>
		</div>
	</div>

	<div class="grid">
		<button disabled={!$form.valid} on:click={signup}>Sign up</button>
		<button on:click={signout} class="secondary">Nevermind, sign out</button>
	</div>
</form>
