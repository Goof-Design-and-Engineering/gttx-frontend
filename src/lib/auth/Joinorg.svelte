<script>
	import { pb, currentUser, currentOrganization } from '../pocketbase';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const form = useForm();

	let invitecode;
	let signupErr;
	let buttonBusy = false;

	async function get_organization_role(key) {
		let invite_codes = ['observer_code', 'participant_code'];
		let invite_roles = ['observer', 'participant'];
		let counter = 0;
		// loop through each and see if it matches anything
		for (const invite_code of invite_codes) {
			try {
				const result = await pb
					.collection('organization')
					.getFullList(200, { filter: `${invite_code}="${key}"` });
				if (Array.isArray(result) && result.length == 1) {
					// return (result[0], invite_roles[counter]);
					let org_name = result[0],
						role_name = invite_roles[counter];
					return { org_name, role_name };
				}
				counter++;
			} finally {
				//console.log(('');
			}
		}
	}

	async function signup() {
		signupErr = "";
		try {
			buttonBusy = true;
			// call cursed function
			let org_magic = await get_organization_role(invitecode);
			if (org_magic.role_name == '' || org_magic.org_name?.id == '') {
				signupErr = 'Your code seems to be invalid; try again!';
			}

			const data = {
				role: org_magic.role_name,
				org: org_magic.org_name?.id
			};
			// update user
			const record = await pb.collection('users').update($currentUser.id, data);

			// update organization table
			if ($currentUser.org != '') {
				const org_record = await pb.collection('organization').getOne($currentUser.org, {
					expand: 'members'
				});

				// do the cursed of turning
				//console.log((org_record.members);

				// let new_members = org_record.expand.members.push($currentUser);
				// //console.log((new_members);
				let new_members = [...org_record.members, $currentUser.id];
				//console.log((new_members);

				const data2 = { name: org_magic.org_name.name, members: new_members };

				//console.log((data2);

				const record2 = await pb.collection('organization').update(org_magic.org_name?.id, data2);

				await goto('/dashboard');
			} else {
				signupErr = 'Your code seems to be invlid; try again!';
				await goto('/joinorg');
			}
		} catch (err) {
			buttonBusy = false;
			signupErr = err;
			//console.log((err);
		}
		buttonBusy = false;
	}

	async function createorg() {
		goto('createorg');
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

<!-- {#if signupErr}
	<p>
		{signupErr}
	</p>
{/if} -->

{#await currentUser then _}
	<h1 class="page-name-header">Join an org</h1>
	<form use:form on:submit|preventDefault method="POST">
		<div class="grid">
			<div>
				<label for="invitecode">Invite key</label>
				<input
					type="username"
					name="invitecode"
					id="invitecode"
					placeholder="Your code (should be a mix of letters and numbers)"
					bind:value={invitecode}
					use:validators={[required]}
				/>
				<HintGroup for="invitecode">
					<Hint on="required"><center>This is a mandatory field</center><br/></Hint>
				</HintGroup>
			</div>
		</div>

		<button disabled={!$form.valid || buttonBusy} aria-busy={buttonBusy} on:click={signup}>Join the organization!</button>
		{#if signupErr}
			<center>
				<input style="border: 2px solid red; border-radius: 5px; text-align: center;" type="text" value={signupErr} readonly>
			</center>
		{/if}
		<hr><br/>
		<div class="grid">
			<button on:click={createorg}>Create an org instead</button>
			<button on:click={signout} class="contrast">Nevermind, sign out</button>
		</div>
	</form>
{/await}
