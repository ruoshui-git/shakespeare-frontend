<script lang="ts">
    import PlaySelect from "./PlaySelect.svelte";
    import ModelHistory, { modelHistory } from "../modelHistory";
    import LinearProgress from "@smui/linear-progress";
    import Snackbar, { Actions, Label } from "@smui/snackbar";
    import Button from "@smui/button";
    import IconButton from "@smui/icon-button";
    import axios, { AxiosResponse } from "axios";
    import { serverAddr } from "../consts";
    import type { ModelOut } from "../consts";

    export let advanced: boolean;

    let prompt: string = `Lorem ipsum dolor sit amet, consectetur 
adipiscing elit, sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud 
exercitation ullamco
laboris nisi ut
aliquip ex
ea commodo
consequat.`;
    let loading = false;
    let errorMsg: string = "";

    let ErrorSnackbar: Snackbar;

    let playId = 6;

    const advProps = {
        top_k: 40,
        top_p: 0.95,
        temperature: 1.2,
        max_length: 256,
        min_length: 100,
    };

    let form: HTMLFormElement;

    const getResponse = () => {
        if (!form.reportValidity()) return;
        loading = true;
        let axiosReq: Promise<AxiosResponse<ModelOut>>;
        if (advanced) {
            axiosReq = axios.get<any, AxiosResponse<ModelOut>>(
                `${serverAddr}/generate/raw`,
                {
                    params: { ...advProps, prompt },
                }
            );
        } else {
            axiosReq = axios.get<any, AxiosResponse<ModelOut>>(
                `${serverAddr}/generate`,
                {
                    params: {
                        prompt,
                        play_id: playId,
                    },
                }
            );
        }

        axiosReq
            .then(({ data }) => {
                modelHistory.add(new ModelHistory(data.prompt, data.output));
            })
            .catch((err) => {
                if (err) {
                    if (navigator.onLine) {
                        errorMsg =
                            "😞 Failed to connect to server. Server is probably down at this point.";
                    } else {
                        errorMsg =
                            "Browser is offline. Check your 🌐 internet connection.";
                    }
                } else {
                    errorMsg = `Could not fetch data. Unknown Error.`;
                }
                console.trace(err);
                ErrorSnackbar.open();
            })
            .finally(() => {
                loading = false;
            });
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
</style>

<form bind:this={form}>
    {#if advanced}
        <div class="tuners">
            <label for="prompt-input">Prompt:</label>
            <textarea bind:value={prompt} id="prompt-input" />
            <label>top-k:
                <input
                    type="number"
                    min="0"
                    bind:value={advProps.top_k} /></label>
            <label>top-p:
                <input
                    type="number"
                    step="0.01"
                    bind:value={advProps.top_p} /></label>
            <label>temperature:
                <input
                    type="number"
                    step="0.01"
                    bind:value={advProps.temperature} /></label>
            <label>Maximum output length:
                <input type="number" bind:value={advProps.max_length} /></label>
            <label>Minimum output length:
                <input type="number" bind:value={advProps.min_length} /></label>
        </div>
    {:else}
        <label for="generate-play-select">Select a play:</label>
        <PlaySelect id="generate-play-select" bind:playId />

        <br /><br />

        <label for="prompt-input">Optionally, give it some lines to start off
            with:</label>
        <textarea
            id="prompt-input"
            rows="9"
            bind:value={prompt}
            placeholder="Give me some shakespeare!" />
    {/if}
    <Button
        variant="unelevated"
        on:click={() => getResponse()}
        disabled={loading}>
        <Label>Generate!</Label>
    </Button>
    <Button
        variant="unelevated"
        disabled={loading}
        on:click={() => modelHistory.add(new ModelHistory(prompt, ''))}>
        <Label>Example</Label>
    </Button>
    <LinearProgress indeterminate closed={!loading} />
    <Snackbar bind:this={ErrorSnackbar}>
        <Label>{errorMsg}</Label>
        <Actions>
            <IconButton class="material-icons" title="Dismiss">
                close
            </IconButton>
        </Actions>
    </Snackbar>
</form>
