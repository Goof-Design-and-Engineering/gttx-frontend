<script>
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '$lib/pocketbase';

	let scenarioObject;
	onMount(async () => {
		if (!$currentUser) {
			goto('/login');
		}
		if (!$currentUser.org) {
			goto('/createorg');
		}

		// console.log(result);
	});

	let visible = true;

	function toggleVissible() {
		visible = !visible;
	}

	async function loadScenario() {
		const result = await pb.collection('room').getOne('otl8cddnj0p6hho', {
			expand: 'scenarios'
		});
		console.log(result);
		scenarioObject = result.expand.scenarios.contents;
	}

	// let scenarioObject = {
	// 	name: 'CISA CTEP #1',
	// 	source: 'https://www.cisa.gov/resources-tools/resources/cybersecurity-scenarios',
	// 	document:
	// 		'https://www.cisa.gov/sites/default/files/2023-02/ransomware-ctep-situation-manual-ncep-072022-508_0.docx',
	// 	overview: {
	// 		name: 'RANSOMWARE SITUATION',
	// 		scope: '...',
	// 		purpose:
	// 			'Examine the coordination, collaboration, information sharing, and response capabilities of <Insert Organization> in response to a significant cyber incident.',
	// 		objectives: [
	// 			'Examine the ability for <Insert Organization> to respond to a significant cyber incident.',
	// 			'Evaluate the ability for <Insert Organization> to coordinate information sharing during a significant cyber incident.',
	// 			'...'
	// 		],
	// 		scenario: '...'
	// 	},
	// 	modules: {
	// 		'1': {
	// 			description:
	// 				'This module introduces several events affecting IT users, including an operating system that is no longer supported by its developer, a lost laptop, and a phishing email.',
	// 			alerts: {
	// 				'Day 1':
	// 					'It has been one year since the developer of your current operating system announced that they will no longer develop security patches for your operating system. The final security patch was installed last week. This vulnerability was identified in your recently completed annual risk assessment',
	// 				'Day 2 - 8PM':
	// 					'An employee reports to their manager that their work laptop was stolen from their car overnight. The laptop contained sensitive information.',
	// 				'Day 4 - 3PM':
	// 					'A Cybersecurity and Infrastructure Security Agency (CISA) Alert is released regarding a new ransomware variant. This ransomware is being used in a campaign targeting state, local, tribal, and territorial governments and private sector firms.',
	// 				'Day 6 - 10AM':
	// 					'A system administrator from the Information Technology (IT) Department receives an email from the personal email account of a human resources (HR) employee. The system administrator and HR employee are connected via professional networking websites. The email notes that the HR employee recently noticed some discrepancies in their 401K withholdings and recommends that the system administrator review their own account information. The system administrator clicks on the link in the email and is re-directed to what appears to be the legitimate 401K website. The IT employee does not believe the email to be suspicious. '
	// 			},
	// 			questions: [
	// 				'What are the greatest cyber threats to your organization?',
	// 				'What cybersecurity threat intelligence does your organization receive?',
	// 				'What cyber threat information is most useful?',
	// 				'Who is responsible for collating information across your organization?',
	// 				'What actions would your organization take following an alert like the one presented in the scenario?',
	// 				'What patch management plans does your IT department utilize?',
	// 				'What procedures are followed to evaluate each server’s criticality and applicability to software patches?',
	// 				'Describe your organization’s cybersecurity training program for employees.',
	// 				'How often are employees required to go through this training?',
	// 				'What are the ramifications for employees not completing cybersecurity training?',
	// 				'What additional training is required for employees who have system administrator-level privileges?',
	// 				'How do employees report suspected phishing attempts and/or other cybersecurity incidents?',
	// 				'What actions does the IT department take when suspicious emails are reported?',
	// 				'What are some of the challenges your organization encounters with phishing?',
	// 				'How effective are your organization’s methods to protect against phishing?',
	// 				'What cyber risk assessment(s) has your organization conducted to identify specific threats, vulnerabilities, and critical assets?',
	// 				'What were the outcomes of the assessment(s)?',
	// 				'What considerations are addressed in your risk management strategy? (e.g., extended downtime, impaired functionality, loss of data, etc.) '
	// 			]
	// 		},
	// 		'2': {
	// 			description:
	// 				'This module includes the discovery of significant data exfiltration possibly including personally identifiable information, unauthorized changes to your website, and ransomware execution.'
	// 		}
	// 	}
	// };
</script>

{#await loadScenario()}
	<p>Loading...</p>
{:then}
	<!-- {#await rawscenarioObject then scenarioObject} -->
	<h3>
		{scenarioObject.overview.name}
	</h3>

	<div class="grid">
		{#if visible}
			<!-- content here -->
			<div>
				<h4>SCENARIO OVERVIEW</h4>
				<h5>SCOPE:</h5>
				<article>
					{scenarioObject.overview.scope}
				</article>
				<h5>PURPOSE:</h5>
				<article>
					{scenarioObject.overview.purpose}
				</article>
			</div>
			<div>
				<h4>OBJECTIVES</h4>
				<ul>
					{#each scenarioObject.overview.objectives as objective}
						<li>
							{objective}
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div>
				<h1>HELLO</h1>
			</div>
		{/if}
	</div>

	<button on:click={toggleVissible} class="secondary"> Hide </button>
	<!-- {/await} -->
{:catch error}
	<p>Error: {error.message}</p>
{/await}
