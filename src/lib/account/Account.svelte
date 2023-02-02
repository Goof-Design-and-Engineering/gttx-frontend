<script lang="ts">
	import { currentRole, currentUser, currentOrganization, currentProfilePic, pb } from '../pocketbase';
    import { redirect } from '@sveltejs/kit';
	async function signout() {
		pb.authStore.clear();
	}
    async function login() {
		throw redirect(302, '/login');
	}
</script>

{#if $currentUser}
	<img src='https://api.gttx.app/api/files/_pb_users_auth_/{$currentUser.id}/{$currentUser.avatar}?thumb=100x100' alt={$currentUser.username}/>
	Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org},{$currentOrganization},{$currentUser.avatar}
	<button on:click={signout}> logout</button>
{:else}
	You're not logged in...
{/if}