<script>
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb } from '../../pocketbase';
	import { goto } from '$app/navigation';

	var old_password = '';
	var new_password = '';
	var new_password_again = '';

	const form = useForm();
	
	async function submit() {
		console.log(currentUser)
		try{
			await pb.collection('users').authWithPassword($currentUser.username, old_password)

			if((new_password == new_password_again) && (new_password != "")){
				console.log("Passwords matched, clearing auth and updating password!")
				try{
					await pb.collection('users').update($currentUser.id, {oldPassword: old_password, password: new_password, passwordConfirm: new_password_again})
					pb.authStore.clear();
					goto("/login")
				} catch(e){
					console.log(e)
					alert("Something went wrong, please try again.")
				}
				
			}
			else{
				alert("Your passwords do not match!")
			}
		} catch(e){
			console.log(e)
			alert("Your old password was not correct!")
		}
	}

    async function back() {
		goto('/account');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{#if $currentUser}
    <!-- <b style="font-size: 40px;">Password Change for {$currentUser.username}</b> -->
	<hgroup>
		<h1 style="font-size: 40px;">Password Change for {$currentUser.username}</h1>
		<h2>Be careful! Password changes are permanent!</h2>
	</hgroup>
	<form use:form on:submit|preventDefault method="POST">
		<label>
			Old Password
			<input
				type="password"
				name="oldpassword"
				id="password"
				placeholder="hunter2"
				bind:value={old_password}
				use:validators={[required]}
			/>

			New Password
			<input
				type="password"
				name="oldpassword"
				id="password"
				placeholder="SuperSecure69"
				bind:value={new_password}
				use:validators={[required]}
			/>

			New Password (...Again)
			<input
				type="password"
				name="new_password_again"
				id="password"
				placeholder="SuperSecure69"
				bind:value={new_password_again}
				use:validators={[required]}
			/>
		</label>
	</form>
    <br />
    <div class="grid">
        <button on:click={back} class="secondary"> Back to Settings</button>
        <button on:click={submit}> Submit</button>
    </div>
{/if}
