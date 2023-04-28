<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		currentRole,
		currentUser,
		currentOrganization,
		currentProfilePic,
		pb,
		getCurrentOrganizationRecord,
		formatScenario
	} from '$lib/pocketbase';
	import { jsPDF } from 'jspdf';
	import Modal from '$lib/Modal.svelte';
	import { page } from '$app/stores';

	import CurrentQuestion from '$lib/games/CurrentQuestion.svelte';
	import { insert } from 'svelte/internal';
	import { replaceInJSON } from '../pocketbase';

	let scenarioObject;
	let modules = [];
	const url = $page.url;
	export let roomID = url.searchParams.get('roomid') || '';
	export let compactView = false;
	let newModule = '';
	let errorThrown = '';
	let docxDownload = '';
	let latexDownload = '';
	let htmlDownload = '';
	let question;

	let prevEnabled = false;
	let nextEnabled = true;

	let prevLoading = false;
	let nextLoading = false;

	let newTab = false;

	let newRoomName = '';

	let currOrg;

	let roomChange;

	onMount(async () => {

		if (roomID == ''){
			alert("NO ROOM ID SET")
			goto("/dashboard")
		} 

		roomChange = await pb.collection('room').subscribe(roomID, async function (e) {
			console.log(e.record.module);
			// if (e.record.question != currQ) {
			// 	const result = await getQuestionForSubscription(e.record.module, e.record.question);
			// 	// currQ = "test";
			// 	metaQuestion = result || '';
			// }
		});

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
		currOrg = await getCurrentOrganizationRecord();
	});

	async function getQuestion() {
		// if not loaded load it
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }

		const result = await pb.collection('room').getOne(roomID);

		question = scenarioObject.modules[result.module].questions[result.question] || '';
	}

	let showModal = false;

	function toggleVisible() {
		showModal = true;
	}

	async function insertOrg(text) {
		// org = await getCurrentOrganizationRecord();
		// console.log(org.name);
		return text.replace('(<Organization’s>|<Insert Organization>)', currOrg.name);
	}

	async function loadScenario() {
		if (roomID == ''){
			goto('/dashboard')
		}

		const result = await pb.collection('room').getOne(roomID, {
			expand: 'scenarios'
		});
		console.log(result);
		scenarioObject = result.expand.scenarios.contents;

		// do the inline modification of the code
		scenarioObject =
			replaceInJSON(
				scenarioObject,
				['<Insert Organization>', '<Organization’s>', '<Organization>'],
				currOrg?.name || 'your organization'
			) || scenarioObject;

		// save module name
		for (var moduleName in scenarioObject.modules) {
			modules.push(moduleName);
		}
	}

	async function incrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		nextEnabled = false;
		prevEnabled = false;
		nextLoading = true;
		const result = await pb.collection('room').getOne(roomID);

		let maxLength = scenarioObject.modules[result.module].questions.length;

		if (result.question < maxLength) {
			const data = {
				question: result.question + 1
			};

			const result2 = await pb.collection('room').update(roomID, data);

			await getQuestion();
			nextEnabled = true;
		} else {
			errorThrown = 'no questions left';
			nextEnabled = false;
		}
		prevEnabled = true;
		nextLoading = false;
	}

	async function decrementQuestion() {
		// if (scenarioObject == null) {
		// 	loadScenario();
		// }
		prevLoading = true;
		prevEnabled = false;
		nextEnabled = false;
		const result = await pb.collection('room').getOne(roomID);

		if (result.question > 1) {
			const data = {
				question: result.question - 1
			};

			const result2 = await pb.collection('room').update(roomID, data);

			await getQuestion();

			prevEnabled = true;
		} else {
			errorThrown = 'no questions left';
			prevEnabled = false;
		}
		nextEnabled = true;
		prevLoading = false;
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
		const title_page = new jsPDF();
		title_page.text(20, 20, 'Hello world!');

		doc.setFont('times', 'normal');
		doc.html(exportHTML, {
			callback: function (doc) {
				if (newTab) {
					// Open PDF in new tab
					doc.output('dataurlnewwindow');
				} else {
					// Save the PDF
					doc.save('sample-document.pdf');
				}
			},
			autoPaging: 'text',
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 650 //window width in CSS pixels
		});
	}

	async function patchRoomName() {
		const result = pb.collection('room').update(roomID, { name: newRoomName || '' });
		alert('Changed to ' + newRoomName + ' under way!');
		return result;
	}
</script>

<article>
	{#await loadScenario()}
		<center>
			<br />
			<hgroup>
				<h1 aria-busy="true">Loading...</h1>
				<h2>Give it a second...</h2>
			</hgroup>
			<br />
		</center>
	{:then}
		{#await getQuestion()}
			<!-- getQuestion() is pending -->
			<center>
				<br />
				<hgroup>
					<h1 aria-busy="true">Loading...</h1>
					<h2>Give it a second...</h2>
				</hgroup>
				<br />
			</center>
		{:then _}
			<!-- getQuestion() was fulfilled -->

			<header>
				<b>{scenarioObject.overview.name}</b>
			</header>

			{#if !compactView}
				Specify Module
				<div class="grid">
					<select bind:value={newModule}>
						<option value="" disabled selected>Select</option>
						{#each modules as module}
							<p>{module}</p>
							<!-- content here -->
							<option value={module} on:click={changeModule}>{module}</option>
						{/each}
					</select>
					<hr />
					<button on:click={decrementQuestion} aria-busy={prevLoading} disabled={!prevEnabled}>Prev. Question</button>
					<button on:click={incrementQuestion} aria-busy={nextLoading} disabled={!nextEnabled}>Next Question</button>
				</div>
			{/if}

			{#if prevLoading || nextLoading}
				<article>
					<header>
						<b>Current Question</b>
					</header>
					<progress />
				</article>
			{:else}
				<CurrentQuestion bind:question bind:scenarioObject bind:roomID />
			{/if}

			<button on:click={toggleVisible} class="secondary"> Show Scenario Information </button>

			<Modal bind:showModal>
				<article>
					<header>
						<b>Scope</b>
					</header>
					{scenarioObject.overview.scope.replace('<Insert Organization>', 'org.name')}
				</article>
				<article>
					<header>
						<b>Purpose</b>
					</header>
					{scenarioObject.overview.purpose.replace('<Insert Organization>', 'org.name')}
				</article>

				<article>
					<header>
						<b>Objectives</b>
					</header>
					<ul>
						{#each scenarioObject.overview.objectives as objective}
							<!-- {#await}
						<article aria-busy="true" />
					{:then objective} -->
							<li>{objective}</li>
							<!-- {:catch error}
						<li>Failed to load this objective ({error})</li>
					{/await} -->
						{/each}
					</ul>
				</article>
			</Modal>
		{:catch error}
			<!-- getQuestion() was rejected -->
		{/await}
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}

	{#if !compactView}
		<article>
			<header>Change Room Name</header>
			<form on:submit={patchRoomName}>
				<label for="text"> enter new roomname</label>
				<input type="text" bind:value={newRoomName} />
			</form>
		</article>

		<footer>
			<br />
			<div class="grid">
				<div>
					<b>Export Options</b>
				</div>
				<div>
					<label style="text-align: right;">
						<input type="checkbox" bind:checked={newTab} />
						Open in a new tab
					</label>
				</div>
			</div>
			<hr />
			<div class="grid">
				<a role="button" class="contrast outline" href={docxDownload} download="results.docx"
					>Export DOCX</a
				>
				<a
					role="button"
					class="contrast outline"
					on:click={async (e) => {
						await rawPDF();
					}}
					href="#">Export PDF</a
				>
				<a role="button" class="contrast outline" href={htmlDownload} download="results.html">
					Export HTML</a
				>
			</div>
		</footer>
	{/if}
</article>
