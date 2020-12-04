<script lang="ts">
    import { wrap } from "svelte-spa-router/wrap";
    import Router from "svelte-spa-router";
    import type { RouteDefinition } from "svelte-spa-router";

    import HistoryList from "./components/HistoryList.svelte";
    import Generate from "./components/Generate.svelte";
    import NotFound from "./components/NotFound.svelte";

    const prefix = "/generate";
    const routes: RouteDefinition = {
        "/": wrap({
            component: Generate,
            props: { advanced: false },
        }),
        "/advanced": wrap({
            component: Generate,
            props: { advanced: true },
        }),
        "*": NotFound,
    };
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
    <Router {routes} {prefix} />
</main>
<aside>
    <HistoryList />
</aside>
