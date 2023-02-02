<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '$lib/style/main.css';
	import Register from "$lib/auth/Register.svelte";
	const form = useForm();
</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.10.0/pocketbase.es.mjs"></script>
	<title>Hello, world!</title>
</head>

<body>
	<Register />
</body>

<pre />
