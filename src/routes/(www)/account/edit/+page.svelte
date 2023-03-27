<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	// import '$lib/style/main.css'
	import EditSettings from '$lib/auth/settings/Edit.svelte';
	const form = useForm();
</script>

<head>
	<title>Hello, world!</title>
</head>

<body>
	<EditSettings />
</body>

<pre />
