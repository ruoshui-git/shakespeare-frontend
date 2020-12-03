<script lang="ts">
    import OutputBox from "./components/OutputBox.svelte";
    import PlaySelect from "./components/PlaySelect.svelte";
    import ModelHistory, { modelHistory } from "./modelHistory";

    let prompt: string;
    let response: string;
    let loading = false;

    let playId = 6;
</script>

<style>
    div {
        margin-left: auto;
        margin-right: auto;
        max-width: 30rem;
    }
</style>

<div>
    <OutputBox bind:loading promptEditable bind:prompt bind:response />
    <PlaySelect bind:playId />
    <button
        on:click={() => {
            modelHistory.add(new ModelHistory(prompt, response));
        }}>Add to History</button>
</div>
