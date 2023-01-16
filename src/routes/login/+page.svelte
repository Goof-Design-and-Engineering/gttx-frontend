<script>
    import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form";

    const form = useForm();
</script>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
    <title>Hello, world!</title>
</head>

<body>
    <main class = "container">
        <form use:form>
            <h1>Login</h1>

            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email address" use:validators={[required, email]} />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" use:validators={[required]} />

            <button disabled={!$form.valid}>Login</button>
        </form>
    </main>
</body>
<pre>
{JSON.stringify($form, null, " ")}
</pre>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }
</style>