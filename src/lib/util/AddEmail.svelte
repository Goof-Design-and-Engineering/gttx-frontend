<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { getCurrentOrganizationRecord } from '$lib/pocketbase';
	const form = useForm();

	let newEmail = '';
	let emailsInOrg = [];
	// let emailsNotOrg = [];
	let emailsAll = [];

	function addEmail(formStatus, email) {
		if (formStatus) {
			// first put all emails together
			emailsAll = [...emailsAll, ...emailsInOrg, email];
		}
		// ensure no duplicates
		emailsAll = emailsAll.filter((item, index) => emailsAll.indexOf(item) === index);

		console.log(emailsAll);
	}
</script>

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
                                            emailsAll = emailsAll.filter((item, index) => emailsAll.indexOf(item) === index);
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
					on:click={() =>
						(emailsAll = emailsAll.filter(function (item) {
							return item !== emailValue;
						}))}
				/>
			{/each}
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

		<footer>
			<button disabled={!form.valid}>Invite!</button>
		</footer>
	</article>
</form>
