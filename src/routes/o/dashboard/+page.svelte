<script>
	import { onMount } from 'svelte';
	import * as Y from 'yjs';
	import { QuillBinding } from 'y-quill';
	// import { QuillCursors } from 'quill-cursors';
	import { WebrtcProvider } from 'y-webrtc';
	// import Quill from 'quill';

	let editor;
	let binding;
	let provider;
	let ydoc;
	let ytext;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
        const { default: Quill } = await import("quill");

		ydoc = new Y.Doc();
		provider = new WebrtcProvider('gttx', ydoc, {});
		ytext = ydoc.getText('quill');

		// Quill.register('modules/cursors', QuillCursors);

		editor = new Quill(editor, {
			cursors: false,
			modules: {
				toolbar: toolbarOptions
			},
			history: {
				userOnly: true
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
		binding = new QuillBinding(ytext, editor, provider.awareness);
	});
</script>

<div class="editor-wrapper">
	<div bind:this={editor} />
</div>

<br />
<button on:click={provider.disconnect()}> disconnect </button>

<br />

<button on:click={provider.connect()}> connect </button>

<svelte:head />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
