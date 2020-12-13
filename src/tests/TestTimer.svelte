<script lang="ts">
    import timer from "../common/timer";
</script>

<p>Time elapsed: {$timer} seconds</p>
<button on:click={timer.reset}>reset</button>
<button on:click={timer.start}>start</button>
<button on:click={timer.stop}>stop</button>
