<script>
	import { pb, currentUser, currentOrganization } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		// console.log(pb.authStore.model?.org.id);
	});

	async function usersOfOrg() {
		const userModel = await pb
			.collection('users')
			.getOne(pb.authStore.model?.id, { expand: 'org' });
		console.log(userModel);

		const organizationRecord = await pb
			.collection('organization')
			.getOne(userModel.org);
		console.log(organizationRecord);
		return organizationRecord;

	}

</script>

<h1>start</h1>

{#await usersOfOrg() then record}
	<article>
		<h3>
			{record.name}
		</h3>
		{#each record.members as user}
			<li>
				{user}
			</li>
		{/each}
	</article>
{/await}
