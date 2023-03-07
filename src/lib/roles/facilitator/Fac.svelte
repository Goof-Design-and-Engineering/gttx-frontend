<script lang="ts">
	import { currentRole, currentUser,currentOrganization, pb } from '../../pocketbase';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	

</script>

{#if $currentRole != 'facilitator'}
	<p>UNAUTHORIZED</p>
	
{:else}
	<p>Hello, {$currentOrganization}</p>
{/if}
