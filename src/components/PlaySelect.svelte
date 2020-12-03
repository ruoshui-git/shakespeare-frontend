<!-- Expose id of a selected play -->
<script lang="ts">
    import plays from "../play_data";

    export let playId: number = 6;
</script>
    
<select bind:value={playId}>
    {#each plays as play}
        <option value={play.id}>{play.name}</option>
    {/each}
</select>
