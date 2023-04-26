<script>
	import { pb, currentUser, currentOrganization } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const form = useForm();

	let organization;
	let secretkey;
	let signupErr;

	function generateInviteCode(role) {
		const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const codeLength = 8;
		const prefix = role.substr(0, 3).toUpperCase();
		let code = prefix;

		for (let i = 0; i < codeLength - prefix.length; i++) {
			code += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
		}

		return code;
	}

	async function signup() {
		try {
			console.log(generateInviteCode('test'));
			// create organization data
			const data = {
				name: organization,
				members: [$currentUser.id],
				participant_code: generateInviteCode('participant'),
				facilitator_code: generateInviteCode('facilitator'),
				observer_code: generateInviteCode('observer')
			};
			// put it in pocketbase
			const createdOrg = await pb.collection('organization').create(data);
			// use this information
			if (createdOrg != null) {
				// to make the user table show org id
				const newOrg = { org: createdOrg.id };
				pb.collection('users').update(pb.authStore.model?.id, newOrg);
			}
			await goto('/dashboard');
		} catch (err) {
			// if there is an error drop it here
			console.log(err);
			signupErr = err;
			await goto('/createorg');
		}
	}

	async function joinorg() {
		goto('joinorg');
	}

	async function signout() {
		await pb.authStore.clear();
		goto('/');
	}

	onMount(async () => {
		if ($currentUser.org == '') {
			return;
		} else {
			goto('/dashboard');
		}
	});
</script>

{#if signupErr}
	<p>
		{signupErr}
	</p>
{/if}

<h1 class="page-name-header">Create an org</h1>
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
				<Hint on="required"><center>This is a mandatory field</center><br/></Hint>
			</HintGroup>
		</div>

		<!-- <div>
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
		</div> -->
	</div>

	<button disabled={!$form.valid} on:click={signup}>Create your organization!</button>
	<hr><br/>
	<div class="grid">
		<button on:click={joinorg}>Join an org instead</button>
		<button on:click={signout} class="secondary">Nevermind, sign out</button>
	</div>
</form>
