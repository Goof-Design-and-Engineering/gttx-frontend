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

    // takes the scenario id and the module id from the thing and puts it here
	function selectScenario(s,m) {
        scenarioID = s;
        moduleID = m
		scenarioChosen = true;
	}
    

    $: {
        load = true
    }

	// $: scenarios = scenarios;
</script>

<h1>Scenarios</h1>
{#if load}
	{#if Array.isArray(scenarios)}
		{#each scenarios as scenario}
			<details>
				<summary>{scenario.name}</summary>
				<h2>{scenario.contents?.overview?.name || ''}</h2>
				<h5>{scenario.contents?.name || ''} {scenario.contents?.source || ''}</h5>
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
						<em>
							{name}
						</em>
						<p>{module.description}</p>
						<button on:click={() => selectScenario(scenario.id, name)}> Choose this scenario and module</button>
					{/each}
				</ul>
			</details>
		{/each}
	{:else}
		<h3>FAILURE</h3>
		{scenarios}
	{/if}
{/if}
