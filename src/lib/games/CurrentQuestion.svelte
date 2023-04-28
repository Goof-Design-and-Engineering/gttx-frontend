<script>
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '../pocketbase';

	export let question = '';
	export let roomID = '';
	export let scenarioObject = {};
	// let currQ = 0;
	// let roomChange = {};

	// async function getQuestion(module, question) {
	// 	const result = await pb.collection('room').getOne(roomID);
	// 	question = scenarioObject?.modules[module].questions[question] || '';
	// }

	// onMount(async () => {
	// 	console.log(roomID)
	// 	roomChange = await pb.collection('room').subscribe(roomID, async function (e) {
	// 		console.log(e.record);
	// 		if (e.record.question != currQ) {
	// 			// await getQuestion(e.record.module,e.record.question);
	// 			currQ = "test";
	// 		}
	// 	});
	// });

	// onDestroy(async () => {
	// 	roomChange?.();
	// 	// await pb.collection('room').unsubscribe(roomID);
	// });
</script>

<article>
	<header>
		<b>Current Question</b>
	</header>
	{#if question}
		{question}
	{:else}
		<i>Question failed to load.</i>
	{/if}
</article>
