<script lang="ts">
    import { link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
</script>

<style>
    header {
        /* for self */
        text-align: center;
        width: 100%;
        border-bottom: 2px solid black;
        flex: 0 1 auto;

        /* for stuff inside */
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    nav {
        position: absolute;
    }

    @media (max-width: 900px) {
        nav {
            position: relative;
            margin-bottom: 10px;
        }
        header {
            flex-flow: column-reverse nowrap;
        }
        ul {
            padding: 0;
        }
    }

    ul {
        display: flex;
        flex-flow: row nowrap;
    }

    li {
        float: left;
        list-style-type: none;
        margin: auto 4px;
    }

    main {
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }

    :global(a.active) {
        text-decoration: underline;
        color: #f47e17;
    }

    a:hover {
        text-decoration: underline;
    }

    a.out-link {
        text-decoration: underline;
    }
</style>

<header>
    <nav>
        <ul>
            <li>
                <a
                    href="/generate"
                    use:link
                    use:active={/^\/(generate)?$/}>ABC</a>
            </li>
            <li>
                <a href="/generate/advanced" use:link use:active>Advanced</a>
            </li>
            <li><a href="/about" use:link use:active>About</a></li>
        </ul>
    </nav>
    <main>
        <h1>Your Shakespeare Play</h1>
        <p>
            Generating Shakespeare with
            <a
                class="out-link"
                href="https://openai.com/blog/better-language-models/"
                target="_blank">GPT-2</a>
        </p>
    </main>
</header>
