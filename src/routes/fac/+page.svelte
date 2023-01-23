<script>
	import Fac from '$lib/Fac.svelte';

</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.10.0/pocketbase.es.mjs"></script>
	<title>Hello, world!</title>
</head>


<body>
	<main class="container">
		<Fac />
	</main>
</body>

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
