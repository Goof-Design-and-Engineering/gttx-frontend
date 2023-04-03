<script>
	import { onMount } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	//import { toggleModal } from '$lib/modal';
	// TODO: Get a file import working. For now, shoving the modal stuff in here will work

	var new_username = '';
	var new_emailaddr = '';
	var new_avatar = '';

	async function submit() {
		try {
			await pb.collection('users').update($currentUser.id, { username: new_username });
			if (new_avatar != '') {
				await pb.collection('users').update($currentUser.id, { avatar: new_avatar });
			}
			goto('/account');
		} catch (e) {
			console.log(e);
			alert('Something went wrong, please try again!');
		}
	}

	async function back() {
		goto('/account');
	}

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		} else {
			new_username = $currentUser.username;
		}
	});

	/*
	* Modal
	*
	* Pico.css - https://picocss.com
	* Copyright 2019-2023 - Licensed under MIT
	*/

	// Config
	const isOpenClass = 'modal-is-open';
	const openingClass = 'modal-is-opening';
	const closingClass = 'modal-is-closing';
	const animationDuration = 400; // ms
	let visibleModal = null;


	// Toggle modal
	export const toggleModal = event => {
	const modal = document.getElementById(event.currentTarget.getAttribute('data-target'));
	(typeof(modal) != 'undefined' && modal != null)
		&& isModalOpen(modal) ? closeModal(modal) : openModal(modal)
	}

	// Is modal open
	export const isModalOpen = modal => {
	return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
	}

	// Open modal
	export const openModal = modal => {
	if (isScrollbarVisible()) {
		document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
	}
	document.documentElement.classList.add(isOpenClass, openingClass);
	setTimeout(() => {
		visibleModal = modal;
		document.documentElement.classList.remove(openingClass);
	}, animationDuration);
	modal.setAttribute('open', true);
	}

	// Close modal
	export const closeModal = modal => {
	visibleModal = null;
	document.documentElement.classList.add(closingClass);
	setTimeout(() => {
		document.documentElement.classList.remove(closingClass, isOpenClass);
		document.documentElement.style.removeProperty('--scrollbar-width');
		modal.removeAttribute('open');
	}, animationDuration);
	}

	// Get scrollbar width
	export const getScrollbarWidth = () => {

	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
	}

	// Is scrollbar visible
	const isScrollbarVisible = () => {
	return document.body.scrollHeight > screen.height;
	}
</script>

{#if $currentUser}
	<hgroup>
		<h1 style="font-size: 40px;">Edit settings for {$currentUser.username}</h1>
		<h2>Express yourself!</h2>
	</hgroup>
	<label>
		Username
		<!--  -->
		<input
			type="text"
			name="new_username"
			id="new_username"
			bind:value={new_username}
			use:validators={[required]}
		/>

		Email Address
		<!-- bind:value={new_emailaddr} -->
		<input
			type="text"
			name="new_emailaddr"
			id="new_emailaddr"
			value={$currentUser.email}
			use:validators={[required]}
			disabled
		/>

		<label for="file"
			>Profile Picture
			<input type="file" id="pfp" name="pfp" accept="image/*" bind:value={new_avatar} disabled />
		</label>
	</label>
	<!-- </article> -->
	<br />
	<div class="grid">
		<button on:click={back} class="secondary"> Back to Settings</button>
		<button on:click={submit}> Submit</button>
		<button class="outline contrast" data-target="modal-example" on:click={toggleModal}>Delete Account</button>
	</div>

	<dialog id="modal-example">
		<article>
		  <a href="#close"
			aria-label="Close"
			class="close"
			data-target="modal-example"
			on:click={toggleModal}>
		  </a>
		  <h3>Woah there!</h3>
		  <p>
			Are you sure that you want to delete your account?
			<br>
			You'll need another invite code to join back into your organization.
			<br>
			<br>
			<b style="color: red;">This action can not be undone!</b>
		  </p>
		  <footer>
			<br>
			<button href="#cancel" class="secondary" data-target="modal-example" on:click={toggleModal}>
				Cancel
			</button>
			<button href="#confirm" data-target="modal-example" on:click={toggleModal}>
			  Confirm
			</button>
		  </footer>
		</article>
	  </dialog>
{/if}
