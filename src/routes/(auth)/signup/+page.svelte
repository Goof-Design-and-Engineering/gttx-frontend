<script lang="js">
	import { useForm } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '$lib/style/main.css';
	import SignupNormal from '$lib/auth/SignupNormal.svelte';
	const form = useForm();
</script>

<body>
	<SignupNormal />
</body>
