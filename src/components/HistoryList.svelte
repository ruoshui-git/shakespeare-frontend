<script lang="ts">
  import { modelHistory } from "../modelHistory";
  import OutputBox from "./OutputBox.svelte";
  import Button from "@smui/button";
</script>

<style>

  div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: right;
    /* top: 0;
    right: 0;
    height: 100%; */
    /* padding: 2rem 1rem 0.6rem; */
    /* background: #fff; */
    /* overflow-y: auto; */
    max-width: 30rem;
    /* border: 1px solid #aaa; */
    margin: 0 auto;
    padding: 1rem;
    align-content: stretch;

    /* overflow: auto;
    height: 100%; */
  }

  @media (min-width: 900px) {
    /* Scroll inside flexbox
    https://stackoverflow.com/a/47377149/7584881 */
    div {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
    }
  }

  /* button.show {
    position: fixed;
    top: 1rem;
    right: 1rem;
  } */
</style>

<div>
  
  <hr />
  <Button class='my-mdc-button-no-collapse' variant='unelevated' on:click={modelHistory.reset}>Clear History</Button>

  {#each $modelHistory as entry (entry.id)}
    <OutputBox prompt={entry.prompt} output={entry.output} compact />
  {/each}
</div>
