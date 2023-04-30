<script>
	import { onMount } from 'svelte';
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, email, required } from 'svelte-use-form';

	export let emails = [];
	export let userIDs = [];
	export let emailsPicked = false;
	const form = useForm();

	// let emailsInOrg2 = [];
	// let emailsOutOfOrg = [];

	let newEmail = '';
	let test;
	let inOrg = [];
	let loadedOrg = false;

	onMount(async () => {
		test = await pb.collection('organization').getOne($currentUser.org, { expand: 'members' });
		loadedOrg = true;
	});
</script>

<h1>Email Picker</h1>

<article>
	<h2>Emails In</h2>
	{#each emails as email}
		<!-- TODO make pretty  -->
		<li>
			<ul>{email}</ul>
		</li>
	{/each}
</article>

<article>
	<h2>Add from organization</h2>

	{#if loadedOrg && test != {}}
		{#each test.expand.members as member}
			<button
				on:click={() => {
					emails = [...emails, member.email];
					userIDs = [...userIDs, member.id];
					emails = emails.filter((item, index) => emails.indexOf(item) === index);
				}}
			>
				{member.username}</button
			>
		{/each}
	{:else}
		<progressbar />
	{/if}
</article>

<hr />

<article>
	<h2>Invite new people via email</h2>
	<form use:form on:submit|preventDefault>
		<input
			type="email"
			name="email"
			id="email"
			bind:value={newEmail}
			use:validators={[required, email]}
		/>
		<button
			on:click={() => {
				emails = [...emails, newEmail];
				emails = emails.filter((item, index) => emails.indexOf(item) === index);
			}}
		>
			Add this email
		</button>
	</form>
</article>

<button
	on:click={() => {
		emailsPicked = true;
	}}
>
	Invite people</button
>
