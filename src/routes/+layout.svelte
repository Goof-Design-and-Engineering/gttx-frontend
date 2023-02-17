<head>
    <!-- Material Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <!-- Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"/>
    <!-- Roboto Mono -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono"/>

    <!-- SMUI Styles -->
    <link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
    <link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)"/>
</head>

<script lang="ts">
    import { currentUser } from '../lib/pocketbase';
    import Button, {Group, Label} from  '@smui/button';
    import { page } from '$app/stores';
</script>

<nav>
    <a href="/"><img class="gttx-logo" src='../svg/gttx_white.svg' alt="gttx!"/></a>
    <Group>
        <Button variant="outlined" href="/about"><Label>About</Label></Button>
        <Button variant="outlined" disabled ><Label>Foobar</Label></Button>
        {#if $currentUser}
            <Button variant="raised" href="/account"><Label>Account</Label></Button>
        {:else}
            {#if $page.route.id == "/login"}
                <Button variant="raised" href="/register"><Label>Register</Label></Button>
            {:else}
                <Button variant="raised" href="/login"><Label>Login</Label></Button>
            {/if}
        {/if}
    </Group>
</nav>

<slot></slot>