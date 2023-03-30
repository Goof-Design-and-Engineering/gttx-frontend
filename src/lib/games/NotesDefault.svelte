<script>
    import { onMount } from 'svelte';
    import {
        currentRole,
        currentUser,
        currentOrganization,
        currentProfilePic,
        pb
    } from '$lib/pocketbase';

    onMount(() => {
        if (!$currentUser) {
            goto('/login');
        }
        if (!$currentUser.org) {
            goto('/createorg')
        }
    });
</script>

<form>

    <!-- Grid -->
    <h2>
        Request for comment
    </h2>

    <label for="bluh">
        <textarea name="blah" id="blah" cols="50" rows="4">
            
        </textarea>
    </label>
  
    <!-- Button -->
    <button type="submit">Submit</button>
  
  </form>