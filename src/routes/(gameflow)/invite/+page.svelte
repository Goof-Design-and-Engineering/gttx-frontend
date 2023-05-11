<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let organizationEvent;
	let organizationName;
	let members = [];
	let rolechangeErr = '';

	onMount(async () => {
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
		// 		//console.log((item);
		// 		return await pb.collection('users').getOne(item);
		// 	})
		// );
		// //console.log((result.members);

		// store organization name
		organizationName = result.name;

		// subscribe to *all* changes made to the current organization
		organizationEvent = await pb
			.collection('organization')
			.subscribe($currentUser?.org, async function (e) {
				//console.log((e.record);
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
				// 		//console.log((item);
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
		// const result = pb.collection('organization').getOne($currentUser?.org);
		const result = members.filter((m) => m.id !== userid);
		//console.log((result);
		// gross javascript that updates the database to point not to the object member but the member ID
		pb.collection('organization').update($currentUser?.org, {
			members: result.map((e) => {
				return e.id;
			})
		});
	}

	async function changeRole(id, role) {
		// TODO sanitize update here
		//console.log((role);
		//console.log((id);
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

<h1>start: {organizationName}</h1>

<br />
{#each members as member, index (member.id)}
	<div class="grid">
		<div>
			<h3>
				{#if member.id == $currentUser.id}
					{member.username} (self)
				{:else}
					{member.username}
				{/if}
			</h3>
		</div>
		<div>
			{member.role}
		</div>
		<div>
			<details role="list">
				<summary aria-haspopup="listbox" role="button" class="secondary"> role </summary>

				<ul role="listbox">
					<li><a on:click={changeRole(member.id, 'facilitator')}>facilitator</a></li>
					<li><a on:click={changeRole(member.id, 'participant')}>participant</a></li>
					<li><a on:click={changeRole(member.id, 'observer')}>observer</a></li>
				</ul>
			</details>
		</div>

		<div>
			<a href="#" role="button" on:click={deleteUser(member.id)}> DELETE</a>
		</div>
	</div>
{/each}
