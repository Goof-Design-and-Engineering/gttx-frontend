<script>
	import { onMount } from 'svelte';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb
	} from '$lib/pocketbase';
	import { jsPDF } from 'jspdf';

	let scenarioObject;
	let modules = [];
	let roomID = 'yir2twyh4ws5697';
	let newModule = '';
	let errorThrown = '';
	let docxDownload = '';
	let latexDownload = '';
	let htmlDownload = '';

	onMount(async () => {
		// docx
		let exportDOCX = await exportNotes('docx');
		const docxBlob = new Blob([exportDOCX], { type: 'application/octet-stream' });
		docxDownload = URL.createObjectURL(docxBlob);

		// // latex
		// tmp = await exportNotes('latex');
		// const latexBlob = new Blob([tmp], { type: 'application/octet-stream' });
		// latexDownload = URL.createObjectURL(latexBlob);

		// html
		let exportHTML = await exportNotes('html');
		const htmlBlob = new Blob([exportHTML], { type: 'application/octet-stream' });
		htmlDownload = URL.createObjectURL(htmlBlob);

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
		const result = await pb.collection('room').getOne(roomID, {
			expand: 'scenarios'
		});
		console.log(result);
		scenarioObject = result.expand.scenarios.contents;

		// save module name
		for (var moduleName in scenarioObject.modules) {
			modules.push(moduleName);
		}
	}

	async function incrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		const result = await pb.collection('room').getOne(roomID);

		let maxLength = scenarioObject.modules[result.module].questions.length;

		if (result.question < maxLength) {
			const data = {
				question: result.question + 1
			};

			const result2 = await pb.collection('room').update(roomID, data);
		} else {
			errorThrown = 'no questions left';
		}
	}

	async function decrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		const result = await pb.collection('room').getOne(roomID);

		if (result.question > 1) {
			const data = {
				question: result.question - 1
			};

			const result2 = await pb.collection('room').update(roomID, data);
		} else {
			errorThrown = 'no questions left';
		}
	}

	async function changeModule() {
		const result = await pb.collection('room').getOne(roomID);

		const data = {
			module: newModule
		};

		const result2 = await pb.collection('room').update(roomID, data);
	}

	// takes in one dimensional arrays and returns a string
	function _makeMD(responses) {
		return (
			'## ' +
			responses[0].question +
			'\n' +
			responses
				.map(
					(response) =>
						`### ${response.expand.user.username || ''} - ${response.expand.user.email || ''}\n\n ${
							response.content
						}\n\n`
				)
				.join('\n')
		);
	}

	async function _callPandoc(markdown, format) {
		let query = {
			text: markdown,
			from: 'markdown',
			to: format
		};

		let result = fetch('https://gttx-pandoc.fly.dev/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(query)
		})
			.then((response) => response.text())
			.then((data) => {
				return data;
			});
		// .then((data) => console.log(data));

		return result;
	}

	async function exportNotes(format) {
		let filterMagic = `(org='${$currentUser.org}' && room='${roomID}')`;
		const resultList = await pb.collection('notes').getList(1, 50, {
			filter: filterMagic,
			expand: 'user'
		});

		// magic code to split the array of all into ones where the question is common accross all
		const result = resultList.items.reduce((acc, obj) => {
			const key = obj.question;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
		const blocks = Object.values(result);

		// convert bad array to a string
		let markdown = blocks.map((responses) => _makeMD(responses)).join('\n');

		let final_result = await _callPandoc(markdown, format);
		return final_result;
	}

	async function rawPDF() {
		let exportHTML = await exportNotes('html');
		const htmlBlob = new Blob([exportHTML], { type: 'application/octet-stream' });
		htmlDownload = URL.createObjectURL(htmlBlob);

		// turn html 2 pdf
		const doc = new jsPDF();
		doc.setFont("times", "normal");
		doc.html(exportHTML, {
			callback: function (doc) {
				// Save the PDF
				doc.save('sample-document.pdf');
			},
			autoPaging: 'text',
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 650 //window width in CSS pixels
		});
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
			<h2>Specify Module (current {newModule})</h2>
			<select bind:value={newModule}>
				<option value="" disabled selected>Select</option>
				{#each modules as module}
					<p>{module}</p>
					<!-- content here -->
					<option value={module} on:click={changeModule}>{module}</option>
				{/each}
			</select>
			<hr />
			<button on:click={incrementQuestion}>INC QUESTION</button>
			<button on:click={decrementQuestion}>DEC QUESTION</button>
		{/if}
	</div>

	<button on:click={toggleVissible} class="secondary"> Hide </button>
	<!-- {/await} -->
{:catch error}
	<p>Error: {error.message}</p>
{/await}

<a role="button" class="contrast outline" href={docxDownload} download="results.docx">
	EXPORT DOCX</a
>
<a role="button" class="contrast outline" on:click={rawPDF} href="#"> EXPORT PDF</a>
<a role="button" class="contrast outline" href={htmlDownload} download="results.html">
	EXPORT HTML</a
>
