<script>
	import { onMount } from 'svelte';
	import * as Y from 'yjs';
	import { QuillBinding } from 'y-quill';
	import { WebsocketProvider } from 'y-websocket';
	import { currentUser, WriteToNotesCollection, pb } from '$lib/pocketbase';

	let editor;
	let binding;
	let provider;
	let ydoc;
	let ytext;
	let userCursor;
	let module;
	let userCursorName;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		if ($currentUser) {
			userCursorName = $currentUser.username;
		}

		console.log(userCursorName);

		const { default: Quill } = await import('quill');
		const { default: QuillCursors } = await import('quill-cursors');
		Quill.register('modules/cursors', QuillCursors);

		// (async () => {Quill.register('modules/cursors', QuillCursors)});

		ydoc = new Y.Doc();
		provider = new WebsocketProvider('ws://gttx-ws.fly.dev', 'gttx', ydoc);
		// provider = new WebrtcProvider('quill', ydoc, { signaling: ['ws://localhost:1234'] });
		ytext = ydoc.getText('quill');

		// Quill.register('modules/cursors', QuillCursors);

		editor = new Quill(editor, {
			cursors: true,
			modules: {
				toolbar: toolbarOptions,
				cursors: { transformOnTextChange: true }
			},
			history: {
				userOnly: true
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
		binding = new QuillBinding(ytext, editor, provider.awareness);
		userCursor = editor.getModule('cursors');
		userCursor.createCursor('cursor', $currentUser.username, 'red');
		provider.on('synced', (synced) => {
			console.log('synced!', synced);
		});
	});

	async function saveToDB() {
		const tmp = await editor.getContents();
		console.log(tmp);
		WriteToNotesCollection(tmp, 'notes', $currentUser?.id || '');
	}

	async function loadFromDB() {
		const tmp = await pb.collection('notes').getFirstListItem('title="test"');
		await editor.setContent(tmp?.content);
	}
</script>

<div class="editor-wrapper">
	<div bind:this={editor} />
</div>

<br />
<button on:click={console.log(provider.disconnect())}> disconnect </button>

<br />

<button on:click={console.log(provider.connect())}> connect </button>

<!-- <button on:click={saveToDB}> save to DB</button> -->
<!-- <button on:click={loadFromDB}> loadFromDB</button> -->

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
