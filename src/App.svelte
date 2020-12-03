<script lang="ts">
  import ModelHistory, { modelHistory } from "./modelHistory";

  import HistoryList from "./components/HistoryList.svelte";
  import Generate from "./Generate.svelte";

  let prompt: string;
  let response: string;
</script>

<style>
  header {
    text-align: center;
    width: 100%;
    border-bottom: 2px solid black;

    flex: 0 1 auto;
  }

  div.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 100%;
    align-items: stretch;

    flex: 1 1 auto;
  }
  /* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
  } */

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
    div.container {
      align-items: center;
    }
  }
</style>

<header>
  <h1>Your Shakespeare Play</h1>
  <p>
    A
    <a
      href="https://openai.com/blog/better-language-models/"
      target="_blank">GPT-2</a>
    model trained on Shakespeare's text
  </p>
</header>

<div class="container">
  <main>
    <Generate />
  </main>
  <aside>
    <HistoryList />
  </aside>
</div>
