<script lang="ts">
	import { currentRole, currentUser, pb } from './pocketbase';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	// import { redirect } from '@sveltejs/kit';
	
	// function gotoLogin() {
	// 	throw redirect(302,'/login');
	// }

</script>

{#if $currentRole != 'facilitator'}
	<p>UNAUTHORIZED</p>
	
{:else}
	<p>Hello, dave</p>
{/if}
