<script>
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	let organizationName = "None";

	async function signout() {
		pb.authStore.clear();
		goto('/');
	}

	async function editsettings() {
		goto('/account/edit');
	}

	async function changepass() {
		goto('/account/password');
	}

	async function back() {
		goto('/');
	}

	async function getOrgName() {
		if ($currentOrganization) {
			const result = await pb.collection('organization').getOne($currentUser?.org);
			organizationName = result.name;
		}
	}

	onMount(async () => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{#await getOrgName()}
	<center>
		<br/>
		<hgroup>
			<h1 aria-busy="true">Loading...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
	<!-- <br/><br/><center><p aria-busy="true">Loading...</p></center> -->
{:then}
	<!-- promise was fulfilled -->
	{#if $currentUser}
		<div class="grid">
			<div>
				<hgroup>
					<h1 style="font-size: 40px;">Account Settings</h1>
					<h2>Welcome back, {$currentUser.username}</h2>
				</hgroup>
			</div>
			<div style="text-align: right;">
				{#if $currentUser.avatar}
					<img
						src="https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100"
						width="100"
						height="100"
						style="border-radius: 25px;"
						alt={$currentUser.username}
					/>
				{:else}
					<img
						src="/defaultpfp.png"
						width="100"
						height="100"
						style="border-radius: 25px;"
						alt={$currentUser.username}
					/>
				{/if}
			</div>
		</div>
		<hr />
		<br />
		<div class="grid">
			<div>
				Name
				<input style="border: 1px solid var(--primary); border-radius: 1px;" type="text" value={$currentUser.username} readonly />
			</div>
			<div>
				Email
				<input style="border: 1px solid var(--primary); border-radius: 1px;" type="text" value={$currentUser.email} readonly />
			</div>
		</div>
		{#if $currentOrganization}
			<div class="grid">
				<div>
					Organization
					<input style="border: 1px solid var(--primary); border-radius: 1px;" type="text" value={organizationName} readonly />
				</div>
				<div>
					Role
					<input style="border: 1px solid var(--primary); border-radius: 1px;" type="text" value={$currentUser.role} readonly />
				</div>
			</div>
		{/if}
		<!-- </article> -->
		<br />
		<div class="grid">
			<button on:click={editsettings}> Edit Account</button>
			<button on:click={changepass}> Change Password</button>
			<button on:click={signout} class="secondary outline"> Sign Out</button>
		</div>
	{/if}
{/await}
