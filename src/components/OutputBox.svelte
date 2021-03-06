<script lang="ts">
    import { fly } from "svelte/transition";
    import Skeleton from "./Skeleton.svelte";

    export let prompt = "";
    export let output = "";
    export let loading = false;
    export let promptEditable = false;
    export let compact = false;

    let promptComponent: HTMLSpanElement;

    const range = document.createRange();

    const focusPrompt = () => {
        // only focus if the component is bound and there's no selection and isn't focused
        if (promptEditable && promptComponent !== document.activeElement) {
            let selection = window.getSelection();

            if (selection && selection.type === "Range") return;

            // move cursor to the end
            let nodes = promptComponent.childNodes;
            // need to check len b/c if nodes is empty when no element is in it, and `range.setStartAfter()` will throw
            if (nodes.length) {
                // need to get last element b/c there might be multiple text nodes if user pressed "enter"
                range.setStartAfter(nodes[nodes.length - 1]);

                range.collapse(true);
                selection?.removeAllRanges();
                selection?.addRange(range);
            }

            promptComponent.focus();
        }
    };

    const handlePromptInput = (e: Event) => {
        // console.log(e);
        let text = (e.target as HTMLElement).textContent;
        prompt = text ? text : "";
        // console.log(prompt);
    };
    const cancelDrag = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "none";
        }
    };

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    let width: number = 30 * rem;
    let height: number = 15 * rem;
</script>

<style>
    pre {
        font-size: 1.5rem;

        max-width: 40rem;
        min-height: 15rem;

        margin-left: auto;
        margin-right: auto;
        padding: 0.8em;
    }

    pre.compact {
        min-height: fit-content;
        font-size: 1rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        margin: 0.5rem 0;
        /* width: 100%; */
    }
    /* https://stackoverflow.com/questions/26960417/when-a-span-element-contains-no-text-fill-with-placeholder-text */
    span.prompt[contenteditable="true"] {
        display: inline-block;
    }

    span.prompt[contenteditable="true"]:empty::before {
        content: "[Your lines]:";
        /* font-weight: lighter; */
        font-weight: 100;
        color: rgba(0, 0, 0, 0.33);
        display: inline-block;
    }
    span.prompt[contenteditable="true"]:focus {
        /* https://www.w3schools.com/css/css_outline.asp */
        outline-style: groove;
        outline-offset: 5px;
        /* padding: 3px; */
    }
</style>

<!-- prettier-ignore -->

{#if loading}
    <Skeleton {width} {height} />
{:else}
    <pre
        transition:fly|local={{duration: 200}}
        class:compact
        on:click={focusPrompt}><strong><span
                    class="prompt"
                    on:input={handlePromptInput}
                    on:dragend={cancelDrag}
                    on:dragover={cancelDrag}
                    contenteditable={promptEditable}
                    bind:this={promptComponent}
        >{prompt}</span></strong>{output}</pre>
{/if}
