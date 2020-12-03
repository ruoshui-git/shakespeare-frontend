<script lang="ts">
	import ModelHistory, { modelHistory } from "./modelHistory";

	import HistoryList from "./components/HistoryList.svelte";
	import Generate from "./Generate.svelte";

	let prompt: string;
	let response: string;
</script>

<style>
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>

<svelte:head>
	<title>Your Shakespeare Play</title>
</svelte:head>
<header>
	<p>Your Shakespeare Play</p>
	
</header>
<main>
	<Generate />
</main>
<HistoryList />
