<script lang="ts">
    import { currentUser } from '../lib/pocketbase';
</script>

<nav>
    <ul>
      <li><a href="/"><img class="gttx-logo" src='../svg/gttx_white.svg' alt="gttx!"/></a></li>
    </ul>
    <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/login">foobar</a></li>
        {#if $currentUser}
            <li><a href="/account" role="button">Account</a></li>
        {:else}
            <li><a href="/login" role="button">Login</a></li>
        {/if}
    </ul>
</nav>

<slot></slot>