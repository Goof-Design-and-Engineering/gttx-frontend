<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	async function signout() {
		pb.authStore.clear();
		goto('/');
	}
</script>

<!-- 
<button on:click={goto('invite')}>Have an invite code? Click here </button> -->

<div class="grid">
	<a href="signup" role="button" class="outline">Click here to use invite code</a>

	<a href="manageorg" role="button" class="contrast outline">Click here to manage an org</a>
</div>
<br />
<a href="login" role="button" style="width: 100%">Click here to login</a>
<br>
<br>
<a href="login" role="button" style="width: 100%" on:click={signout}>Click here to logout</a>
