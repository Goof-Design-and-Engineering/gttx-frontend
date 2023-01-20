<script>
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
    import "bootstrap-icons/font/bootstrap-icons.css";
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

            <label for="email">Email Address</label>
            <input type="email" name="email" id="email" placeholder="goof@goofle.com" use:validators={[required, email]} />
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>

            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" use:validators={[required]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>

			<button disabled={!$form.valid}>Login</button>
		</form>
        <div class="grid">
            <button class="secondary"><i class="bi bi-google"></i></button>
            <button class="secondary"><i class="bi bi-discord"></i></button>
            <button class="secondary"><i class="bi bi-github"></i></button>
        </div>
	</main>
</body>

<pre />

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
