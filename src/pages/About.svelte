<script lang="ts">
    import { SERVER_ADDR } from "../assets/consts";

    import plays from "../assets/play_data";

    import TextPage from "../components/TextPage.svelte";
</script>

<style>
    ul.no-bullet {
        list-style-type: none;
    }
</style>

<TextPage>
    <p>Links:</p>
    <ul class="no-bullet">
        <li>
            <a
                href={`${SERVER_ADDR}/docs`}
                target="_blank"
                rel="noopener noreferrer">Backend</a>
        </li>
        <li>
            <a
                href="https://github.com/ruoshui-git/shakespeare-backend"
                target="_blank"
                rel="noopener noreferrer">Backend GitHub Repo</a>
        </li>
        <li>
            <a
                href="https://github.com/ruoshui-git/shakespeare-frontend"
                target="_blank"
                rel="noopener noreferrer">Frontend GitHub Repo</a>
        </li>
        <li>
            <a
                href="https://github.com/ruoshui-git/shakespeare-data"
                target="_blank"
                rel="noopener noreferrer">Text & Formatting GitHub Repo (text
                source and the code that I used to format them)</a>
        </li>
    </ul>
    <br />
    <p>Traning neural networks isn't hard. It's not as if I'm designing one.</p>
    <p>
        Designing a frontend like this, especially styling the site, is REALLY
        HARD.
    </p>
    <p>
        Similarly hard is to deploy the backend server on a budget. This server
        backend takes 2.9 GB on hard disk (in a docker image) and up to 4 GB RAM
        on startup.
    </p>
    <br />
    <p>Shoutouts to:</p>
    <ul>
        <li>Google Colab for free GPU</li>
        <li>aitextgen for training my model in Colab</li>
        <li>FastAPI for fast API endpoint</li>
        <li>Svelte for frontend</li>
        <li>Folger Shakespeare Library for the plays and website font</li>
    </ul>
    <br />
    <p>The complete list of plays in my training dataset and their prefix:</p>
    <ul class="no-bullet">
        {#each plays as { name, id }}
            <li>{id} - {name}</li>
        {/each}
    </ul>
</TextPage>
