<script>
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb, currentOrganization } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	import Modal from '$lib/Modal.svelte';
	let showModal = false;
	let organizationName;
	let deleting = false;

	const form = useForm();
	const formData = new FormData();

	var new_username = '';
	var new_emailaddr = '';
	var new_avatar = '';

	var password_confirm = '';

	var confirm_enabled = true;

	async function submit() {
		try {
			await pb.collection('users').update($currentUser.id, { username: new_username });
			if (new_avatar != '') {
				formData.append('documents', new_avatar);
				pb.collection('users').update($currentUser.id, formData);
			}
			goto('/account');
		} catch (e) {
			console.log(e);
			alert('Something went wrong, please try again!');
		}
	}

	async function back() {
		goto('/account');
	}

	async function delete_account() {
		try {
			deleting = true;
			await pb.collection('users').authWithPassword($currentUser.email, password_confirm);
		} catch (e) {
			deleting = false;
			alert('Your password was incorrect!');
			return;
		}

		try {
			if ($currentUser.role == 'facilitator') {
				await pb.collection('organization').delete($currentOrganization);
			} else {
				await pb.collection('users').delete($currentUser.id);
			}
		} catch (e) {
			deleting = false;
			console.log(e);
			alert('Something went wrong, please try again!');
		}
		pb.authStore.clear();
		goto('/');
	}

	async function getOrgName() {
		if ($currentOrganization) {
			const result = await pb.collection('organization').getOne($currentUser?.org);
			organizationName = result.name;
		}
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		} else {
			new_username = $currentUser.username;
		}
	});
</script>

{#await getOrgName()}
	<center>
		<br />
		<hgroup>
			<h1 aria-busy="true">Loading...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
	<!-- <br/><br/><center><p aria-busy="true">Loading...</p></center> -->
{:then}
	{#await currentUser then _}
		<!-- promise was fulfilled -->
		{#if $currentUser}
			<hgroup>
				<h1 style="font-size: 40px;">Edit settings for {$currentUser.username}</h1>
				<h2>Express yourself!</h2>
			</hgroup>
			<article>
				<label>
					Username
					<input
						type="text"
						name="new_username"
						id="new_username"
						bind:value={new_username}
						use:validators={[required]}
					/>

					Email Address
					<input
						type="text"
						name="new_emailaddr"
						id="new_emailaddr"
						value={$currentUser.email}
						use:validators={[required]}
						disabled
					/>

					<label for="file">
						Profile Picture
						<input
							type="file"
							id="pfp"
							name="pfp"
							accept="image/*"
							bind:value={new_avatar}
							disabled
						/>
					</label>
				</label>
			</article>
			<br />
			<div class="grid">
				<button on:click={back} class="secondary"> Back to Settings</button>
				<button on:click={submit}> Submit</button>
			</div>
			<center>
				<button
					class="outline contrast"
					data-target="modal-example"
					on:click={() => (showModal = true)}
					style="width:50%;"
					data-tooltip="This button is dangerous!"
				>
					Delete Account
				</button>
			</center>
			<Modal bind:showModal>
				<article>
					<hgroup>
						<h1>Woah there!</h1>
						<h4>Are you sure that you want to delete your account?</h4>
						<h5>
							<br />
							{#if $currentOrganization}
								{#if $currentUser.role != 'facilitator'}
									You'll need another invite code to join back into your organization.
								{:else}
									As the facilitator, your organization "<b>{organizationName}</b>" will be deleted
									as well!
								{/if}
								<br /><br />
							{/if}
							<input
								style="border: 2px solid red; border-radius: 5px; text-align: center;"
								type="text"
								value="This action can not be undone!"
								readonly
							/>
							<!-- <b style="color: red;">This action can not be undone!</b> -->
						</h5>
					</hgroup>
					<footer>
						<form use:form on:submit|preventDefault method="POST">
							<br />
							<input
								type="password"
								name="del_confirm_pass"
								id="del_confrim_pass"
								placeholder="Your current password, please!"
								bind:value={password_confirm}
								use:validators={[required]}
							/>
							<br />
							{#if $currentUser.role != 'facilitator'}
								<button
									data-target="modal-example"
									on:click={delete_account}
									disabled={!$form.valid}
								>
									Confirm
								</button>
							{:else}
								<fieldset>
									<label for="org_confirm" style="text-align: center;">
										<input
											type="checkbox"
											id="org_confirm"
											name="terms"
											use:validators={[required]}
										/>
										I will take responsibility for my actions.
									</label>
								</fieldset>
								<button
									aria-busy={deleting}
									data-target="modal-example"
									on:click={delete_account}
									disabled={!$form.valid}
								>
									Confirm
								</button>
							{/if}
						</form>
					</footer>
				</article>
			</Modal>
		{/if}
	{/await}
{/await}
