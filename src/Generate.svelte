<script lang="ts">
  import PlaySelect from "./components/PlaySelect.svelte";
  import ModelHistory, { modelHistory } from "./modelHistory";
  import LinearProgress from "@smui/linear-progress";
  import Snackbar, { Actions, Label } from "@smui/snackbar";
  import Button from "@smui/button";
  import IconButton from "@smui/icon-button";
  import axios, { AxiosResponse } from "axios";
  import { serverAddr } from "./consts";
  import type { ModelOut } from "./consts";

  let prompt: string = "";
  let output: string = "";
  let loading = false;
  let error = false;
  let errorMsg: string = "";

  let SnackComponent: Snackbar;

  let playId = 6;

  const getResponse = () => {
    loading = true;
    error = false;
    axios
      .get<any, AxiosResponse<ModelOut>>(`${serverAddr}/generate`, {
        params: {
          prompt,
          play_id: playId,
        },
      })
      .then(({ data }) => {
        modelHistory.add(new ModelHistory(data.prompt, data.output));
      })
      .catch((e) => {
        SnackComponent.open();
        if (e) {
          errorMsg = `Could not fetch data. ${e}.`;
          console.log(e);
        } else {
          errorMsg = `Could not fetch data. Unknown Error.`;
        }
      })
      .finally(() => {
        loading = false;
      });
  };
</script>

<style>
  div {
    margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
    max-width: 30rem;
  }

  textarea {
    font-family: Garamond, Georgia, "Times New Roman", Times, serif;
    font-size: 1.5rem;
    font-weight: bold;
    width: 100%;
    min-height: 10rem;
    resize: vertical;
  }
</style>

<div>
  First, select a play to generate from:
  <PlaySelect bind:playId />

  <br />
  Optionally, give it some lines to start off from:
  <textarea bind:value={prompt} />
  <!-- <OutputBox bind:loading promptEditable bind:prompt bind:response /> -->
  <Button variant="unelevated" on:click={getResponse} disabled={loading}>
    <Label>Generate!</Label>
  </Button>
  <LinearProgress indeterminate closed={!loading} />
  {#if loading}
    <p>Please be patient, text generation takes a long time.</p>
  {/if}
  <Snackbar bind:this={SnackComponent} on:close={() => (error = false)}>
    <Label>{errorMsg}</Label>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
  </Snackbar>
</div>
<Button
  variant="raised"
  on:click={() => modelHistory.add(new ModelHistory(prompt, output))}>
  Add Text
</Button>
