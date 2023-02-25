<script lang="js">
	import { useForm } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '$lib/style/main.css';
	import Signup from '$lib/auth/Signup.svelte';
	const form = useForm();
</script>

<body>
	<Signup />
</body>
