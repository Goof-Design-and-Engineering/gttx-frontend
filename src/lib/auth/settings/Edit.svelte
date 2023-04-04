<script>
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb, currentOrganization } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { toggleModal } from '$lib/modal';

	const form = useForm();

	var new_username = '';
	var new_emailaddr = '';
	var new_avatar = '';

	var password_confirm = '';

	var confirm_enabled = true

	async function submit() {
		try {
			await pb.collection('users').update($currentUser.id, { username: new_username });
			if (new_avatar != '') {
				await pb.collection('users').update($currentUser.id, { avatar: new_avatar });
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

	async function delete_account(){
		try{
			await pb.collection('users').authWithPassword($currentUser.email, password_confirm);
		} catch(e){
			toggleModal
			alert('Your password was incorrect!');
			return
		}

		try {
			if ($currentUser.role == "facilitator"){
				await pb.collection('organization').delete($currentOrganization)
			}
			else {
				await pb.collection('users').delete($currentUser.id);
			}
		} catch (e) {
			console.log(e);
			alert('Something went wrong, please try again!');
		}
		pb.authStore.clear();
		goto('/');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		} else {
			new_username = $currentUser.username;
		}
	});
</script>

{#if $currentUser}
	<hgroup>
		<h1 style="font-size: 40px;">Edit settings for {$currentUser.username}</h1>
		<h2>Express yourself!</h2>
	</hgroup>
	<label>
		Username
		<!--  -->
		<input
			type="text"
			name="new_username"
			id="new_username"
			bind:value={new_username}
			use:validators={[required]}
		/>

		Email Address
		<!-- bind:value={new_emailaddr} -->
		<input
			type="text"
			name="new_emailaddr"
			id="new_emailaddr"
			value={$currentUser.email}
			use:validators={[required]}
			disabled
		/>

		<label for="file"
			>Profile Picture
			<input type="file" id="pfp" name="pfp" accept="image/*" bind:value={new_avatar} disabled />
		</label>
	</label>
	<!-- </article> -->
	<br />
	<div class="grid">
		<button on:click={back} class="secondary"> Back to Settings</button>
		<button on:click={submit}> Submit</button>
	</div>
	<center>
		<button 
			class="outline contrast"
			data-target="modal-example"
			on:click={toggleModal}
			style="width:50%;"
			data-tooltip="This button is dangerous!">
			Delete Account
		</button>
	</center>

	<dialog id="modal-example">
		<article>
		  <a href="#close"
			aria-label="Close"
			class="close"
			data-target="modal-example"
			on:click={toggleModal}>
		  </a>
		  <h3>Woah there!</h3>
		  <p>
			Are you sure that you want to delete your account?
			<br><br>
			{#if $currentUser.role != "facilitator"}
			You'll need another invite code to join back into your organization.
			{:else}
			As the facilitator, your organization "<b>{$currentOrganization.name}</b>" will be deleted as well!
			{/if}
			<br><br>
			<b style="color: red;">This action can not be undone!</b>
		  </p>
		  <footer>
			<form use:form on:submit|preventDefault method="POST">
				<br>
				<input
					type="password"
					name="del_confirm_pass"
					id="del_confrim_pass"
					placeholder="Your current password, please!"
					bind:value={password_confirm}
					use:validators={[required]}
					/>
				<br>
				<button href="#cancel" class="secondary" data-target="modal-example" on:click={toggleModal}>
					Cancel
				</button>
				{#if $currentUser.role != "facilitator"}
					<button href="#confirm" data-target="modal-example" on:click={delete_account} disabled={!$form.valid}>
						Confirm
					</button>
				{:else}
					<fieldset>
						<label for="org_confirm">
							<input type="checkbox" id="org_confirm" name="terms" use:validators={[required]}>
							I acknowlege that my organization will be deleted as well!
						</label>
					</fieldset>
					<button href="#confirm" data-target="modal-example" on:click={delete_account} disabled={!$form.valid}>
						Confirm
					</button>
				{/if}
			</form>
		  </footer>
		</article>
	  </dialog>
{/if}
