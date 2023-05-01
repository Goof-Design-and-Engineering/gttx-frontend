<script>
	import { onMount } from 'svelte';
	import { currentUser, formatScenario, getScenarios } from '$lib/pocketbase';

	export let scenarioChosen = false;
	let scenarios = [];
    let load = false;
    export let scenarioID = '';
    export let moduleID = '';

	onMount(async () => {
		const scenariosRaw = await getScenarios();
		scenarios = scenariosRaw;
	});

	async function notOnMount() {
		const scenariosRaw = await getScenarios();
		scenarios = scenariosRaw;
	}

    // takes the scenario id and the module id from the thing and puts it here
	function selectScenario(s,m) {
        scenarioID = s;
        moduleID = m
		scenarioChosen = true;
		// force user to top of the page
		document.body.scrollTop = 0;
  		document.documentElement.scrollTop = 0;
	}    

    $: {
        load = true
    }

	// $: scenarios = scenarios;
</script>

<hgroup>
	<h1>Scenarios</h1>
	<h2>What kind of exercise do you want to play?</h2>
</hgroup>
{#if load}
	{#if Array.isArray(scenarios)}
		{#each scenarios as scenario}
			<details>
				<summary class="scenario-summary-header">{scenario.name}</summary>
				<div class="scenario-box">
					<hgroup>
						<h2>{scenario.contents?.overview?.name || ''}</h2>
						<h3>
							<b>{scenario.contents?.name || ''}</b>
							{#if scenario.contents?.source != "N/A"}
								(<a href={scenario.contents?.source || ''} target="_blank" rel="noreferrer"> {scenario.contents?.source || ''}</a>)
							{/if}
						</h3>
					</hgroup>
					<hr />
					<h4>PURPOSE</h4>
					<p>{scenario.contents?.overview?.purpose || ''}</p>
					<h4>SCOPE</h4>
					<p>{scenario.contents?.overview?.scope || ''}</p>
					<hr />
					<h4>OBJECTIVES</h4>
					<ul>
						{#each scenario.contents?.overview.objectives || [] as objective}
							<li>
								{objective}
							</li>
						{/each}
					</ul>
					<hr />
					<h4>MODULES</h4>
					<ul>
						{#each Object.entries(scenario.contents?.modules || []) as [name, module]}
							<p>
								<b>
									{name}.
								</b>
								{module.description}
							</p>
							<button on:click={() => selectScenario(scenario.id, name)}> Choose this scenario and module</button>
							<hr>
						{/each}
					</ul>
				</div>
			</details>
		{/each}
	{:else}
		<h3>FAILURE</h3>
		{scenarios}
	{/if}
{:else}
	<center>
		<br />
		<hgroup>
			<h1 aria-busy="true">Loading the scenarios...</h1>
			<h2>Give it a second...</h2>
		</hgroup>
	</center>
{/if}