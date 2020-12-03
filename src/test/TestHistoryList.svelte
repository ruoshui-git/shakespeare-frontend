<script lang="ts">
	import ModelHistory, { modelHistory } from "../modelHistory";

	import HistoryList from "./HistoryList.svelte";
	import TestOutputBox from "./tests/TestOutputBox.svelte";

	let prompt: string;
	let response: string;
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<svelte:head>
	<title>Your Shakespeare Play</title>
</svelte:head>

<main>
	<TestOutputBox bind:prompt bind:response />

	<button
		on:click={() => {
			modelHistory.add(new ModelHistory(prompt, response));
		}}>Add to History</button>
</main>
<HistoryList />
