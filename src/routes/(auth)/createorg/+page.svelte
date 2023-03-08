<script lang="js">
	import { useForm } from 'svelte-use-form';
	import '$lib/style/main.css';
	import Neworg from '$lib/auth/Neworg.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { currentUser, pb } from '$lib/pocketbase';

	const form = useForm();

	onMount(async () => {
		if (!$currentUser) {
			goto('signup');
		}
	});
</script>

<body>
	<Neworg />
</body>
