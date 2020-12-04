<script lang="ts">
  import HistoryList from "./components/HistoryList.svelte";
  import Generate from "./Generate.svelte";
</script>

<style>
  main {
    margin-top: 2rem;
    flex-grow: 1;
  }

  aside {
    /* Scroll inside flexbox
      https://stackoverflow.com/a/47377149/7584881 */
    position: relative;
    font-size: 1rem;
    /* flex: 40%; */
    flex-grow: 2;
    border-radius: 0;
    border-left: 2px solid #000;
  }
  @media (max-width: 900px) {
    main {
      flex: 100%;
    }
    aside {
      border-top: 2px solid #000;
      border-left: 0px;
      flex: 70%;
    }
  }
</style>

<main>
  <Generate />
</main>
<aside >
  <HistoryList />
</aside>
