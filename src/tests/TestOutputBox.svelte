<script lang="ts">
    import OutputBox from "../components/OutputBox.svelte";

    export let prompt = "HAMLET:\nDost thou not suspect my place?";
    export let response = "\n\nOPHELIA:\nWhat a noble mind has blown away!\r\nOh mine!";
</script>

<section>
    <textarea id='prompt' bind:value={prompt} />
    <textarea id='res' bind:value={response} />
    <OutputBox bind:prompt bind:response/>
</section>

<style>

    section {
        justify-content: center;
        width: 30rem;
        margin-left: auto;
        margin-right: auto;

        font-size: 1.5rem;
    }

    textarea {
        width: 100%;
        min-height: 8rem;
        margin: auto;
    }
</style>