<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
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
	<main class="container">
		<form method="POST" action="?/login">
            <h1>Login</h1>

            <input type="email" name="email" use:validators={[required, email]} />
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>

            <input type="password" name="password" use:validators={[required]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>

			<button disabled={!$form.valid}>Login</button> 
		</form>
	</main>
</body>

<pre />

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
