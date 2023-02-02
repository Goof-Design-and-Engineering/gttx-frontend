<script>
	import { currentUser, notesRaw, pb } from '../pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { writable } from 'svelte/store';

	let element;
	let editor;
	let notes;
	// let content;
		
	export let content = '';
	
	const contentStore = writable(content);

	let newMessage;
	let newTitle;

	function setContent(a) {
		editor.commands.setContent(a);
	}

	onMount(() => {
		notes = notesRaw.items;
		console.log(notes);
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<p>Hello World! </p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});

		editor.on('update',({editor}) => {
			contentStore.set(editor.getHTML());
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	async function saveNote() {
		const data = {
			content: newMessage,
			title: newTitle,
			user: $currentUser?.id
		};
		const createdMessage = await pb.collection('notes').create(data);
		newMessage = '';
	}
</script>

{#if editor}
	{#each notes as value}
		<button on:click={(e) => setContent(value.content)}>{value.title}</button>
	{/each}

	<br />
	<hr />
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>

	<!-- <button on:click={() => console.log('test')}>save</button> -->
	<button
		on:click={() => {
			// newMessage = editor.getJSON();
			// console.log(newMessage);
			// newTitle = notes.length + 1;
			// saveNote().resolve();
		}}>save (NOT WORKING)</button
	>
{/if}

<br>

<div class="wrapper">
	<!-- <FixedMenu {editor} /> -->
	
	<div class="element-wrapper" bind:this={element}/>
</div>

<style>
	button.active {
		background: black;
		color: white;
	}

	.wrapper {
    border: 1px solid #ccc;
		/* max-height: 200px; */
		height: 25rem;
		width: 25rem;
		display: inline-flex;
		flex-direction: column;
	}
	
	.wrapper:focus-within {
    border: 1px solid red;
	}
	
	.element-wrapper {
    padding: 1rem;
		flex: 1 1 0%;
		resize: both;
		overflow: auto;
	}
	
	.element-wrapper :global(p:first-of-type) {
    margin-top: 0;
	}
	
	.element-wrapper :global(p:last-of-type) {
    margin-bottom: 0;
	}
	
	.element-wrapper > :global(.ProseMirror) {
    outline: 0;
	}
	
</style>
