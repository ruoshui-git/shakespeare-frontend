<!-- Expose id of a selected play -->
<script lang="ts">
    import plays from "../common/play_data";

    export let playId: number = 6;
    let elementId: string | undefined;
    export { elementId as id };
</script>

<select id={elementId} bind:value={playId}>
    {#each plays as play}
        <option value={play.id}>{play.name}</option>
    {/each}
</select>
