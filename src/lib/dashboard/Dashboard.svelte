<script lang="ts">
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	
	async function signout() {
        try {
		    await pb.authStore.clear();
        }
        finally {
		    goto('/login');
        }
	}

    async function settings() {
        goto('/account');
    }

	async function back() {
		goto('/');
	}

    async function opengames() {
        goto('start');
    }

    async function manageorg() {
        alert("Not implemented.");
    }

    async function opennotes() {
        alert("Not implemented.");
    }

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
        if (!$currentUser.org) {
            goto('/createorg')
        }
	});
</script>

{#if $currentUser}
    <div class="grid">
        <div>
            <hgroup>
                <h1 style="font-size: 40px;">Dashboard</h1>
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
    <hr>
    <!-- Signed in as {$currentUser.username}, {$currentRole},{$currentUser.org.name},{$currentOrganization},{$currentUser.avatar} -->
    <b style="font-size: 40px;">Recent Games</b>
    <p>obamna</p>
    <div class="grid">
        <button on:click={opengames}> Open a Game Room</button>
        <button on:click={opennotes} data-tooltip="Not implemented."> Open Notes</button>
    </div>
    <div class="grid">
        {#if $currentRole == "facilitator"}
            <button on:click={manageorg} class="secondary" data-tooltip="Not implemented."> Manage Organization</button>
        {/if}
        <button on:click={settings} class="secondary">Manage account</button>
        <button on:click={signout} class="secondary outline">Sign out</button>
    </div>
<!-- {:else}
    <h1>Not sure how, but this is screwy.</h1> -->
{/if}
