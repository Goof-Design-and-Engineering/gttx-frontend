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
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	const form = useForm();

	var invitecode = '';
    var isFailure = false;

	async function back() {
		goto('/');
	}

    async function opengames() {
        goto('start');
    }

    async function submitinvitecode() {
        try {
			isFailure = false;
			// throw redirect(307, '/account');
		} catch (e) {
			console.log("Invite Code Failure!");
			// logonError = e;
		}
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

{#if $currentUser && $currentOrganization}
    <!-- Facilitator -->
    {#if $currentRole == "facilitator"}
        <hgroup>
            <h1 style="font-size: 40px;">Start a New Exercise</h1>
            <h2>Let's do it to it.</h2>
        </hgroup>
        <hr>
        <hgroup>
            <h1>Scenario Settings</h1>
            <h2>What's going on?</h2>
        </hgroup>
        <b style="font-size: 40px;">Recent Games</b>
        
    <!-- Participant and Observer -->
    {:else if $currentRole == "participant" || $currentRole == "observer"}
        <hgroup>
            <h1>Join a game Room</h1>
            <h2>Let's a-go.</h2>
        </hgroup>
        <form use:form on:submit|preventDefault>
            <label for="email">Invite Code</label>
            <input
                type="invite"
                name="invite"
                id="invite"
                placeholder="N5IvhutkcLc"
                bind:value={invitecode}
                use:validators={[required]}
            />
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
            </HintGroup>

            <button disabled={!$form.valid} on:click={submitinvitecode}>Join</button>
        </form>
    {:else}
        <hgroup>
            <br/>
            <h2>Not sure how, but you don't have a valid role.</h2>
            <h3>Your role is {$currentRole}. Please contact your organization manager.</h3>
        </hgroup>
    {/if}
{:else}
    <h2>Oops. Try refreshing.</h2>
{/if}