<script lang="ts">
    import Header from "./components/Header.svelte";

    import About from "./pages/About.svelte";
    import App from "./App.svelte";
    import NotFound from "./components/NotFound.svelte";

    import Router from "svelte-spa-router";
    import type { RouteDefinition } from "svelte-spa-router";
    import Home from "./pages/Home.svelte";
    import { installGtag, notifyPagePageview } from "./common/gtag";
    import { onMount } from "svelte";

    onMount(async () => {
        installGtag();
    });

    const routes: RouteDefinition = {
        "/about": About,
        "/generate": App,
        "/generate/*": App,
        "/": Home,
        "*": NotFound,
    };
</script>

<style>
    div.container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        width: 100%;
        align-items: stretch;

        flex: 1 1 auto;
    }
</style>

<Header />

<div class="container">
    <Router {routes} on:routeLoaded={notifyPagePageview} />
</div>
