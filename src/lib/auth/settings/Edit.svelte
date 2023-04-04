<script>
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { toggleModal } from '$lib/modal';
	// TODO: Get a file import working. For now, shoving the modal stuff in here will work

	var new_username = '';
	var new_emailaddr = '';
	var new_avatar = '';

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
		<button class="outline contrast" data-target="modal-example" on:click={toggleModal}>Delete Account</button>
	</div>

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
			<br>
			You'll need another invite code to join back into your organization.
			<br>
			<br>
			<b style="color: red;">This action can not be undone!</b>
		  </p>
		  <footer>
			<br>
			<button href="#cancel" class="secondary" data-target="modal-example" on:click={toggleModal}>
				Cancel
			</button>
			<button href="#confirm" data-target="modal-example" on:click={toggleModal}>
			  Confirm
			</button>
		  </footer>
		</article>
	  </dialog>
{/if}
