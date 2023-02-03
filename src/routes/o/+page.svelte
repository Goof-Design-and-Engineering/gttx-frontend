<script>
	import { currentRole } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if ($currentRole == 'observer' || $currentRole == "facilitator") {
			goto('/o/dashboard');
		}else{
            goto('/account')
        }
	});
</script>
