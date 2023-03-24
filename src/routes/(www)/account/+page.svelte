<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '$lib/style/main.css'
	import Settings from '$lib/auth/settings/Account.svelte';
	const form = useForm();
</script>

<head>
	<title>Hello, world!</title>
</head>

<body>
	<Settings />
</body>

<pre />
