<script>
	import { pb, getCurrentOrganizationRecord } from '$lib/pocketbase';
	import { currentUser } from '../../../lib/pocketbase';

	let email;
	let desired_role;
	var resultToShow;

	async function api_request() {
		const org = await getCurrentOrganizationRecord();
		if (org != {}) {
			console.log(`{
					"email": ${email},
					"participant_code": ${org?.participant_code},
					"facilitator_code": ${org?.facilitator_code},
					"observer_code": ${org?.observer_code},
					"desired_role": ${desired_role}
				}`);
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

			console.log(result)

			resultToShow = result;
		}
	}
</script>

<h1>DESIRED ROLE: {desired_role}</h1>
<select>
	<option value="" disabled selected>Select</option>
	<option
		on:click={() => {
			desired_role = 'facilitator';
		}}>facilitator</option
	>
	<option
		on:click={() => {
			desired_role = 'observer';
		}}>observer</option
	>
	<option
		on:click={() => {
			desired_role = 'participant';
		}}>participant</option
	>
</select>

<form>
	<label for="email">Email of person to invite</label>
	<input type="text" bind:value={email} />
	<button on:click={api_request}> CLICK ME </button>
</form>

{resultToShow}
