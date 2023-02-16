<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '$lib/style/main.css';
	import Register from "$lib/auth/Register.svelte";
	const form = useForm();
</script>


<body>
	<Register />
</body>

