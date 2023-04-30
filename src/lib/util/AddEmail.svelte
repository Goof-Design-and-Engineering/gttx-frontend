<script>
	import { useForm, validators, email, required } from 'svelte-use-form';
	import { getCurrentOrganizationRecord, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	const form = useForm();

	let newEmail = '';
	export let emailsInOrg = [];
	let warning = '';
	export let emailsAll = [];
	export let gameData;

	let createGameSwitch = false;
	// export let showModal = false;

	function addEmail(formStatus, email) {
		if (formStatus) {
			// first put all emails together
			emailsAll = [...emailsAll, ...emailsInOrg, email];
			warning = '';
		} else {
			warning = 'NOT A VALID EMAIL';
		}
		// ensure no duplicates
		emailsAll = emailsAll.filter((item, index) => emailsAll.indexOf(item) === index);

		console.log(emailsAll);
	}

	async function emailUsersNotInOrg(org) {

		const result = await pb.send('/api/send_invite_code', {
			// for all possible options check
			// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			params: {
				email: email,
				participant_code: org?.participant_code,
				facilitator_code: org?.facilitator_code,
				observer_code: org?.observer_code,
				desired_role: desired_role
			}
		});
	}

	async function emailUsersInOrg(org) {}

	async function creategame() {

		const org = await getCurrentOrganizationRecord();

		const email = {observer_code: org.observer_code, participant_code: org.participant_code, facilitator_code: org.facilitator_code}
		
		let message2send = `
		<html>
			<img class="gttx-logo" src="/svg/gttx_white.svg" alt="gttx!" />

			<p>
			Hello! Welcome to GTTX.
			Here is the information to get started:

			observer_code: ${email.observer_code}
			participant_code: ${email.participant_code}
			facilitator_code: ${email.facilitator_code}
			
			GOTO https://gttx.api/blah to get started!
			</p>
		</html>
		`;

		// set message2send
		gameData.emailbody = message2send

		// ensure all emails are inserted
		gameData.emails = emailsAll;

		// create record
		const record = await pb.collection('room').create(gameData);
		console.log(record);
		return record;
	}
</script>

{#key createGameSwitch}
	{#if createGameSwitch}
		{#await creategame()}
			<!-- creategame is pending -->
			<progress />
		{:then result}
			<!-- creategame was fulfilled -->
			{result.id}
			{goto("/dashboard/notes?roomid="+result.id)}
		{:catch error}
			<!-- creategame was rejected -->
			{error}
		{/await}
	{/if}
{/key}

<form use:form on:submit|preventDefault method="POST">
	<article>
		<header>
			<h3>Who's participating?</h3>
			<details role="list">
				<summary aria-haspopup="listbox">Org members</summary>
				<ul role="listbox">
					{#await getCurrentOrganizationRecord()}
						<progress />
					{:then org}
						{#each org.expand.members as member}
							<li>
								<label>
									<input
										bind:group={emailsInOrg}
										value={member.email}
										on:click={() => {
											emailsAll = [...emailsAll, member.email];
											emailsAll = emailsAll.filter(
												(item, index) => emailsAll.indexOf(item) === index
											);
										}}
										type="checkbox"
									/>
									{member.email}
								</label>
							</li>
						{/each}
					{/await}
				</ul>
			</details>
		</header>
		<body>
			<h3>External participants</h3>
			<!-- goes through all emails -->
			{#each emailsAll as emailValue}
				<!-- and adds the remove yourself function -->
				<input
					type="button"
					value={emailValue}
					class="secondary outline"
					on:click={() =>
						(emailsAll = emailsAll.filter(function (item) {
							return item !== emailValue;
						}))}
				/>
			{/each}

			{#if warning != ''}
				<label for="email">{warning}</label>
			{/if}
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Enter an email"
				on:change={() => addEmail($form.valid, newEmail.repeat(1))}
				use:validators={[required, email]}
				required
				bind:value={newEmail}
			/>
		</body>

		<footer />
	</article>
</form>

<button disabled={emailsAll.length == 0} on:click={() => (createGameSwitch = true)}>Invite!</button>
