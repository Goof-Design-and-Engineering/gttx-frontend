<script>
	import { pb, currentUser } from '../pocketbase';
	import { onMount } from 'svelte';

	import { jsPDF } from 'jspdf';

    export let docxDownload = '';
    export let htmlDownload = '';
    let newTab;

	onMount(async () => {
		// docx
		let exportDOCX = await exportNotes('doc');
		const docxBlob = new Blob([exportDOCX], { type: 'application/octet-stream' });
		docxDownload = URL.createObjectURL(docxBlob);

		// html
		let exportHTML = await exportNotes('html');
		const htmlBlob = new Blob([exportHTML], { type: 'application/octet-stream' });
		htmlDownload = URL.createObjectURL(htmlBlob);
	});

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

	export async function exportNotes(format) {
		let filterMagic = `(org='${$currentUser.org}' && room='${$currentUser.roomid}')`;
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

	export async function rawPDF() {
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
</script>

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
