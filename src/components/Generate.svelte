<script lang="ts">
    import PlaySelect from "./PlaySelect.svelte";
    import ModelHistory, { modelHistory } from "./modelHistory";
    import LinearProgress from "@smui/linear-progress";
    import Snackbar, { Actions, Label } from "@smui/snackbar";
    import Button from "@smui/button";
    import IconButton from "@smui/icon-button";
    import axios, { AxiosResponse } from "axios";
    import { SERVER_ADDR } from "../common/consts";
    import type { ModelOut } from "../common/consts";
    import * as examples from "../common/examples";
    import { notifyGenerate } from "../common/gtag";
    import timer from "../common/timer";

    export let advanced: boolean;

    let loading = false;
    let loadingMsg = "";
    let errorMsg = "";
    $: secondsTaken = $timer;

    let form: HTMLFormElement;
    let errorSnackbar: Snackbar;

    const regProps = {
        playId: 6,
        prompt: "To be or not to be--that is the",
    };

    const advProps = {
        prompt: "6|There is nothing either good or bad but",
        top_k: 40,
        top_p: 0.95,
        temperature: 1.2,
        max_length: 256,
        min_length: 100,
    };

    const preventSubmitOnEnter = (e: KeyboardEvent) => {
        if (e.code.endsWith("Enter")) e.preventDefault();
        return false;
    };

    const fillExample = (e: Event) => {
        e.preventDefault();
        if (advanced) {
            advProps.prompt = examples.getAdv();
        } else {
            [regProps.prompt, regProps.playId] = examples.getReg();
        }
    };

    const getResponse = async () => {
        if (!form.reportValidity()) return;
        loading = true;
        loadingMsg = "Checking server status...";
        timer.reset();
        timer.start();

        // Verify server is up, before asking for inference.
        try {
            const { data } = await axios.get(SERVER_ADDR);
            if (data.message !== "Up and and running!") {
                throw new Error("Bad response"); // deal with error all in one place
            }
            loadingMsg =
                "Server is up. Generating text... (Takes up to 30 seconds or more.)";

            let output: AxiosResponse<ModelOut>;

            if (advanced) {
                output = await axios.get<any, AxiosResponse<ModelOut>>(
                    `${SERVER_ADDR}/generate/raw`,
                    {
                        params: advProps,
                    }
                );
            } else {
                output = await axios.get<any, AxiosResponse<ModelOut>>(
                    `${SERVER_ADDR}/generate`,
                    {
                        params: regProps,
                    }
                );
            }
            modelHistory.add(
                new ModelHistory(output.data.prompt, output.data.output)
            );
            notifyGenerate(advanced, secondsTaken);
            loadingMsg = "Done.";
        } catch (err) {
            if (err.message === "Bad response") {
                errorMsg = `❌ Server didn't send the correct response. Server is probably down right now.`;
            } else if (navigator.onLine) {
                if (err.message === "Network Error") {
                    errorMsg = `😞 Failed to connect to server. Server is probably down right now.`;
                } else {
                    errorMsg = `😞 Failed to connect to server. ${err}`;
                }
            } else {
                errorMsg =
                    "Browser is offline. Check your 🌐 internet connection.";
            }
            errorSnackbar.open();
            loadingMsg = "Error";
        } finally {
            // loadingMsg = "";
            loading = false;
            timer.stop();
        }
    };
</script>

<style>
    form {
        margin: 0 auto;
        padding: 0 1rem;
        max-width: 30rem;
    }

    textarea {
        font-family: Garamond, Georgia, "Times New Roman", Times, serif;
        font-size: 1rem;
        font-weight: bold;
        width: 100%;
        min-height: 10rem;
        resize: vertical;
    }

    input {
        width: 70px;
        display: inline-block;
    }
    div.tuners {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    div.controls {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
</style>

<form bind:this={form}>
    {#if advanced}
        <div class="tuners">
            <label for="prompt-input">Prompt:</label>
            <textarea bind:value={advProps.prompt} id="prompt-input" />
            <label>top-k:
                <input
                    on:keydown={preventSubmitOnEnter}
                    type="number"
                    min="0"
                    bind:value={advProps.top_k} /></label>
            <label>top-p:
                <input
                    on:keydown={preventSubmitOnEnter}
                    type="number"
                    step="0.01"
                    bind:value={advProps.top_p} /></label>
            <label>temperature:
                <input
                    on:keydown={preventSubmitOnEnter}
                    type="number"
                    step="0.01"
                    bind:value={advProps.temperature} /></label>
            <label>Maximum output length:
                <input
                    type="number"
                    on:keydown={preventSubmitOnEnter}
                    bind:value={advProps.max_length} /></label>
            <label>Minimum output length:
                <input
                    type="number"
                    on:keydown={preventSubmitOnEnter}
                    bind:value={advProps.min_length} /></label>
        </div>
    {:else}
        <label for="generate-play-select">Select a play:</label>
        <PlaySelect id="generate-play-select" bind:playId={regProps.playId} />

        <br /><br />

        <label for="prompt-input">Optionally, give it some lines to start off
            with:</label>
        <textarea
            id="prompt-input"
            rows="9"
            bind:value={regProps.prompt}
            placeholder="Give me some shakespeare!" />
    {/if}
    <div class="controls">
        <Button variant="unelevated" disabled={loading} on:click={fillExample}>
            <Label>Example</Label>
        </Button>
        <Button
            variant="unelevated"
            on:click={async () => await getResponse()}
            disabled={loading}>
            <Label>Generate!</Label>
        </Button>
    </div>

    <LinearProgress indeterminate closed={!loading} />

    <p>{loadingMsg}</p>
    {#if loading}
        <p>Time elapsed: {$timer} seconds</p>
    {/if}

    <Snackbar bind:this={errorSnackbar}>
        <Label>{errorMsg}</Label>
        <Actions>
            <IconButton class="material-icons" title="Dismiss">
                close
            </IconButton>
        </Actions>
    </Snackbar>
</form>
