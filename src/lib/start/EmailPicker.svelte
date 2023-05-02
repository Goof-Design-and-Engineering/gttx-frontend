<script>
	import { onMount } from 'svelte';
	import { currentUser, pb } from '../pocketbase';
	import { useForm, validators, email, required } from 'svelte-use-form';

	export let emails = [];
	export let usersIDs = [];
	export let emailsPicked = false;
	const form = useForm();

	// let emailsInOrg2 = [];
	// let emailsOutOfOrg = [];

	let newEmail = '';
	let orgMembers;
	let inOrg = [];
	let loadedOrg = false;

	let addEmailLoading = false;
	let inviteLoading = false;

	async function addMember(member) {
		// emails = [...emails, member.email];
		if (usersIDs.includes(member.id))
		{
			usersIDs = usersIDs.filter(item => item !== member.id)
			emails = emails.filter(item => item !== member.email)
		}
		else {
			usersIDs = [...usersIDs, member.id];
			emails = [...emails, member.email];
			emails = emails.filter((item, index) => emails.indexOf(item) === index); 
		}
		// console.log(usersIDs);
		// console.log(emails);
	}

	onMount(async () => {
		orgMembers = await pb.collection('organization').getOne($currentUser.org, { expand: 'members' });
		loadedOrg = true;
	});
</script>

<hgroup>
	<h1>Email Picker</h1>
	<h2>Let's get this party started.</h2>
</hgroup>

<article>
	<header>
		<hgroup>
			<h2>Emails In</h2>
			<h3>These are the emails you'll be inviting to the game.</h3>
		</hgroup>
		{#if emails[0]}
			{#each emails as email}
				<!-- TODO make pretty  -->
				<li>
					<ul>{email}</ul>
				</li>
			{/each}
		{:else}
			<center>
				<input style="border: 2px solid var(--primary-contrast); border-radius: 5px; text-align: center;" type="text" value="You have no emails selected right now!" readonly>
			</center>
		{/if}				
	</header>
	<hgroup>
		<h2>Add from organization</h2>
		<h3>Get your colleagues in on the action.</h3>
	</hgroup>
	{#if loadedOrg && orgMembers != {}}
		<details role="list">
			<summary aria-haspopup="listbox">Select Members from Organization</summary>
			<ul role="listbox">
				{#each orgMembers.expand.members as member}
					<li>
						<label>
						<input type="checkbox" on:change={addMember(member)} value={member.email}>
							{member.username} ({member.email})
						</label>
					</li>
					<!-- <button
						on:click={() => {
							emails = [...emails, member.email];
							usersIDs = [...usersIDs, member.id];
							emails = emails.filter((item, index) => emails.indexOf(item) === index);
						}}
					>
						{member.username}</button
					> -->
				{/each}
			</ul>
		</details>
	{:else}
		<progressbar />
	{/if}
	
	<footer><br/>
		<hgroup>
			<h2>Invite new people via email</h2>
			<h3>Let others join in on the exercise.</h3>
		</hgroup>
		<form use:form on:submit|preventDefault>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="kevin@example.edu"
				bind:value={newEmail}
				use:validators={[required, email]}
			/>
			<button disabled={!$form.valid} 
				on:click={() => {
					emails = [...emails, newEmail];
					emails = emails.filter((item, index) => emails.indexOf(item) === index);
					newEmail = "";
				}}
			>
				Add this email
			</button>
		</form>
	</footer>
</article>

<button
	on:click={() => {
		emailsPicked = true;
	}}
>
	Invite people</button
>
