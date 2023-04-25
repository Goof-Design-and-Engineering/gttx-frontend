<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/Modal.svelte';

	const form = useForm();

	let organizationEvent;
	let organizationName;
	let members = [];
	let rolechangeErr = '';

	// Modal stuff
	let showModal = false;
	let memberToRemove;
	var password_confirm = '';

	function presentModal(username) {
		showModal = true;
		memberToRemove = username;
	}

	onMount(async () => {
		if ($currentUser == null) {
			goto('createorg');
			return;
		}
		if (currentUser?.org == '') {
			goto('createorg');
			return;
		}

		// get current members
		const result = await pb
			.collection('organization')
			.getOne($currentUser?.org, { expand: 'members' });
		// merge member list
		members = [...members, ...result.expand.members];

		// members = await Promise.all(
		// 	[...members, ...result.members].map(async (item) => {
		// 		console.log(item);
		// 		return await pb.collection('users').getOne(item);
		// 	})
		// );
		// console.log(result.members);

		// store organization name
		organizationName = result.name;

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
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		organizationEvent?.();
	});

	async function deleteUser(userid) {
		try {
			await pb.collection('users').authWithPassword($currentUser.email, password_confirm);
		} catch (e) {
			alert('Your password was incorrect!');
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

	async function changeRole(id, role) {
		// TODO sanitize update here
		console.log(role);
		console.log(id);
		// first update the user
		const data = { role: role };
		const result = await pb.collection('users').update(id, data);
		rolechangeErr = result;

		// then update the organization members list
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
	<header>
		<hgroup>
			<h1>{organizationName}</h1>
			<h2>Time for a change?</h2>
		</hgroup>
	</header>

	{#each members as member, index (member.id)}
		<div>
			{#if member.id == $currentUser.id}
				<b>{member.username} (that's you!)</b>
			{:else}
				{member.username}
			{/if}
			<hr />
			<div class="grid">
				<input type="text" value={member.email} aria-invalid="false" disabled>
				{#if member.id == $currentUser.id}
					<select disabled>
						<option value="facilitator">Facilitator</option>
					</select>
					<button class="primary" disabled="true">Remove</button>
				{:else}
					<select>
						{#if member.role == 'facilitator'}
							<option value="facilitator" selected>Facilitator</option>
							<option value="participant">Participant</option>
							<option value="observer">Observer</option>
						{:else if member.role == 'participant'}
							<option value="facilitator">Facilitator</option>
							<option value="participant" selected>Participant</option>
							<option value="observer">Observer</option>
						{:else}
							<option value="facilitator">Facilitator</option>
							<option value="participant">Participant</option>
							<option value="observer" selected>Observer</option>
						{/if}
					</select>
					<button class="primary" on:click={presentModal(member.username)}>Remove</button>
				{/if}
			</div>
		</div>
		<br>
	{/each}
</article>

<Modal bind:showModal>
	<article>
		<h3>Woah there!</h3>
		<p>
			Are you sure that you want to remove <b>{memberToRemove}</b> from your organization?
			<br /><br />
			If you change your mind, you'll have to send <b>{memberToRemove}</b> another invite.
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
					href="#confirm"
					data-target="modal-example"
					on:click={deleteUser}
					disabled={!$form.valid}
				>
					Confirm
				</button>
			</form>
		</footer>
	</article>
</Modal>
