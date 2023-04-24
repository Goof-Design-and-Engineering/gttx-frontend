<script>
	import { currentRole, currentUser,currentOrganization, pb } from '../../pocketbase';
	

</script>

{#if $currentRole != 'facilitator'}
	<p>UNAUTHORIZED</p>
	
{:else}
	<p>Hello, {$currentOrganization}</p>
{/if}
