<script>
    import { page } from '$app/stores';
</script>

<hgroup>
    <h1>{$page.status} {$page.error.message}</h1>
    <h2>Well, that's certainly something.</h2>
</hgroup>