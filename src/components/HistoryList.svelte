<script lang="ts">
    import { fly } from "svelte/transition";
    import { modelHistory } from "../modelHistory";
    import OutputBox from "./OutputBox.svelte";

    export let show = false;
    let navbar: HTMLElement;
    $: $modelHistory && navbar?.scroll({ top: 0, behavior: "auto" });
</script>

<style>
    nav {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        padding: 2rem 1rem 0.6rem;
        border-left: 1px solid #aaa;
        background: #fff;
        overflow-y: auto;
        width: 20rem;

        font-size: 1rem;
    }

    button.show {
        position: fixed;
        top: 1rem;
        right: 1rem;
    }
</style>

{#if show}
    <nav transition:fly={{ x: 500, opacity: 1 }} bind:this={navbar}>
        <button on:click={modelHistory.reset}>Clear History</button>
        <button class="close" on:click={() => (show = false)}>Close</button>

        <hr />

        {#each $modelHistory as entry (entry.id)}
            <OutputBox
                prompt={entry.prompt}
                response={entry.response}
                compact />
        {/each}
    </nav>
{:else}
    <button class="show" on:click={() => (show = true)}>Show History</button>
{/if}
