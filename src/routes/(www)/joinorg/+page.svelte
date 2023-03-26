<script lang="js">
	import { useForm } from 'svelte-use-form';
	import '$lib/style/main.css';
	import Neworg from '$lib/auth/Neworg.svelte';
	import Joinorg from '../../../lib/auth/Joinorg.svelte';
	const form = useForm();
</script>

<body>
	<Joinorg />
</body>
