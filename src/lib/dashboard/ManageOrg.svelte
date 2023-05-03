<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { pb, currentUser, currentRole } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/Modal.svelte';

	const form = useForm();

	let organizationEvent;
	let organizationName;
	let members = [];
	let rolechangeErr = '';

	// invite codes
	let participantCode = '';
	let facilitatorCode = '';
	let observerCode = '';

	// Modal stuff
	let showModal = false;
	let memberToRemove;
	var password_confirm = '';

	// Select box
	let selected = [];

	function presentModal(member) {
		memberToRemove = member;
		showModal = true;
	}

	onMount(async () => {
		if ($currentUser == null) {
			goto('createorg');
			return;
		}
		if ($currentUser?.org == '') {
			goto('createorg');
			return;
		}
		if ($currentUser.role != 'facilitator') {
			goto('/dashboard');
			return;
		}
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		organizationEvent?.();
	});

	async function getMembers() {
		// get current members
		const result = await pb
			.collection('organization')
			.getOne($currentUser?.org, { expand: 'members' });
		// merge member list
		members = [...members, ...result.expand.members];

		// store organization name
		organizationName = result.name;

		participantCode = result.participant_code;
		facilitatorCode = result.facilitator_code;
		observerCode = result.observer_code;

		// subscribe to *all* changes made to the current organization
		organizationEvent = await pb
			.collection('organization')
			.subscribe($currentUser?.org, async function (e) {
				console.log(e.record);
				// on change get the members expanded list
				const result = await pb
					.collection('organization')
					.getOne(e.record.id, { expand: 'members' });

				// and set it to the global members
				members = result.expand.members;

				// messages.push(e.record);
				// const result = e.members;
				// members.push(map());
				// members = await Promise.all(
				// 	[...members, ...e.members].map(async (item) => {
				// 		console.log(item);
				// 		return await pb.collection('users').getOne(item);
				// 	})
				// );
			});
		// organizationTest = await pb.collection('organization').getOne($currentUser?.org,{});
	}

	async function deleteUser(userid) {
		try {
			await pb.collection('users').authWithPassword($currentUser.email, password_confirm);
		} catch (e) {
			alert('Your password was incorrect!');
			return;
		}

		try {
			await pb.collection('users').update(userid, { org: '' });
		} catch (e) {
			deleting = false;
			console.log(e);
			alert('Something went wrong, please try again!');
			return;
		}

		// const result = pb.collection('organization').getOne($currentUser?.org);
		const result = members.filter((m) => m.id !== userid);
		console.log(result);
		// gross javascript that updates the database to point not to the object member but the member ID
		pb.collection('organization').update($currentUser?.org, {
			members: result.map((e) => {
				return e.id;
			})
		});
	}

	async function changeRole(id, index) {
		// First update the user
		let role = selected[index];
		const data = { role: role };
		try {
			const result = await pb.collection('users').update(id, data);
		} catch (error) {
			rolechangeErr = error;
			return
		}

		// Then update the organization members list
		const result2 = await pb
			.collection('organization')
			.getOne($currentUser?.org, { expand: 'members' });
		members = result2.expand.members;
	}
</script>

{#if rolechangeErr != ''}
	{rolechangeErr}
{/if}

<article>
	{#await getMembers()}
		<!-- <hgroup>
			<h1>Loading...</h1>
			<h2>Give it a second.. or three...</h2>
		</hgroup>
		<progress /> -->
		<center>
			<br />
			<hgroup>
				<h1 aria-busy="true">Loading...</h1>
				<h2>Give it a second...</h2>
			</hgroup>
		</center>
	{:then}
		<header>
			<hgroup>
				<h1>{organizationName || 'Organization Name'}</h1>
				<h2>Time for a change?</h2>
			</hgroup>
		</header>

		<details open>
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="secondary">Invite Codes</summary>
			<ul>
				<li>
					<!-- <p id="p_code"><b>Participant</b>: <em on:click={() => navigator.clipboard.writeText(participantCode)} data-tooltip="Click me to copy to clipboard!">{participantCode}</em></p> -->
					<p id="p_code"><b>Participant</b>: {participantCode}</p>
				</li>
				<li>
					<p id="o_code"><b>Observer</b>: {observerCode}</p>
				</li>
				<li>
					<p id="f_code"><b>Facilitator</b>: {facilitatorCode}</p>
				</li>
			</ul>
		</details>

		{#each members as member, index (member.id)}
			<div>
				{#if member.id == $currentUser.id}
					<b>{member.username} (that's you!)</b>
				{:else}
					{member.username}
				{/if}
				<hr />
				<div class="grid">
					<input type="text" value={member.email} aria-invalid="false" disabled />
					{#if member.id == $currentUser.id}
						<select disabled>
							<option value="facilitator">Facilitator</option>
						</select>
						<button class="primary" disabled="true">Remove</button>
					{:else}
						<select bind:value={selected[index]} on:change={changeRole(member.id, index)}>
							{#if member.role == 'facilitator'}
								<option value="facilitator" selected>Facilitator</option>
								<option value="participant">Participant</option>
								<option value="observer">Observer</option>
							{:else if member.role == 'participant'}
								<option value="participant" selected>Participant</option>
								<option value="facilitator">Facilitator</option>
								<option value="observer">Observer</option>
							{:else}
								<option value="observer" selected>Observer</option>
								<option value="facilitator">Facilitator</option>
								<option value="participant">Participant</option>
							{/if}
						</select>
						<button class="primary" on:click={presentModal(member)}>Remove</button>
					{/if}
				</div>
			</div>
			<br />
		{/each}
	{/await}
</article>

{#if showModal}
	<Modal bind:showModal>
		<article>
			<h3>Woah there!</h3>
			<p>
				Are you sure that you want to remove <b>{memberToRemove.username}</b> from your
				organization?
				<br /><br />
				If you change your mind, you'll have to send <b>{memberToRemove.username}</b> another
				invite.
				<br /><br />
				<b style="color: red;">This action can not be undone!</b>
			</p>
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
					<button
						data-target="modal-example"
						on:click={deleteUser(memberToRemove.id)}
						disabled={!$form.valid}
					>
						Confirm
					</button>
				</form>
			</footer>
		</article>
	</Modal>
{/if}
