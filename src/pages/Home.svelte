<script lang="ts">
    import { link } from "svelte-spa-router";
    import { SERVER_ADDR } from "../assets/consts";
    import OutputBox from "../components/OutputBox.svelte";
    import TextPage from "../components/TextPage.svelte";
</script>

<style>
    pre {
        max-width: 300px;
        padding: 20px;
    }
</style>

<TextPage>
    <h2>Welcome!</h2>
    <p>TL;DR: Click <a href="/generate" use:link>ABC</a> and get started!</p>
    <p>
        The
        <a href={SERVER_ADDR} target="_blank">server (API endpoint)</a>
        (see Github link in the
        <a href="/about" use:link>About</a>
        section for more info) is hosted on Azure Web App Service with CPU only,
        so
        <em>it will take a long time to generate output. Be patient!</em>
    </p>
    <p>
        Results are stored in localStorage, so if you don't clear them, they
        will stay even if you close your browser.
    </p>
    <h2 class="intro">Intro</h2>
    <p>
        This is an app that uses Artificial Intelligence to generate Shakespeare
        passages. Specifically, it uses the GPT-2
        <a
            href="https://www.ospreydata.com/2020/02/24/ai-ml-models-101-what-is-a-model">model</a>,
        published by OpenAI in 2019.
    </p>
    <p>
        You can provide a prompt, and the app will generate some Shakespeare
        passages that GPT-2 "thinks" should follow. Or you can just let it
        generate without providing any input, and see what it comes up with.
        Here's a sample I got while writing this page. It's based on
        <em>Hamlet</em>:
    </p>
    <OutputBox
        compact
        prompt={`OPHELIA:
How stands your disposition to be married?

HAMLET:`}
        output={`
It is an honor that is not seen; for 'tis not seen.

OPHELIA:
What is it, my lord?

HAMLET:
Make but about it. It is no more unhandsome
to confess your impotent affection than to note
your passion.

OPHELIA:
O, my lord, your fantasy takes delight in
't. We shall hear your conference, and, by my
faith, welcome to England.

HAMLET:
 [aside]  Still on my mother.

OPHELIA:
My lord, I come to whet your mind to
church.

HAMLET:
As heartlings do, then.`} />
    <p>Some things to note:</p>
    <ol>
        <li>
            In the output box, the
            <strong>bolded part</strong>
            is the prompt, the rest is output.
        </li>
        <li>
            You don't have to provide a passage from the play. In fact, this is
            the whole point. The prompt used for Ophelia here is actually taken
            from
            <em>Romeo and Juliet</em>.
        </li>
        <li>
            AI isn't perfect. Expect things that are grammatically correct but
            have no meaning.
        </li>
    </ol>
    <p>There two defined "modes":</p>
    <ol>
        <li>"ABC" (or, Standard mode): choose play and enter a prompt</li>
        <li>
            Advanced mode: you can customize many other options, and prompt is
            not furthur
        </li>
    </ol>
    <h2 id="basic-mode">Framing a prompt</h2>
    <p>
        There are many ways to write a prompt. You can click
        <code>Example</code>
        to get some inspiration. You can "talk" to a character, let a character
        "talk" to a character, or let an unspecified character provoke a
        response from a character, or you might get a monologue without any
        character speaking it. You might also get stage directions.
    </p>
    <p>When specifying a character, use this format</p>
    <pre>
[CHARACTER IN CAPS]:
[Words spoken by the character]
</pre>
    <p>
        Namely, put the character name in all caps, add a colon after it, and
        start his/her words on a new line. You can also just specify the
        character name and no content, in which case the model will try to fill
        in what the character would say.
    </p>
    <h2 id="output">Output</h2>
    <p>
        The output box puts your prompt and the output together. Sometimes, the
        model will continue on the same line as your prompt, instead of always
        starting a new line.
    </p>
    <p>
        All outputs are saved in browser's localStorage, so they will be there
        even if you close your browser. However, having multiple tabs of this
        app open at the same time may cause weird concurrency issues. The app
        has not been tested in that way, so it's best to avoid doing that.
    </p>
    <p>
        If you want to export your generated output, currently the best way is
        copy and paste.
    </p>
    <h2 id="advanced-mode">Advanced mode</h2>
    <p>
        In advanced mode, the prompt is not furthur processed. This means that
        the play's ID (in the context of this app) is prefixed to every line.
        This was done for model training, which probably accounts for good
        results in containing the play output to a given play. This method is
        inspired by
        <a
            href="https://www.gwern.net/GPT-2#training-gpt-2-poetry-prefix"
            target="_blank">this</a>.
    </p>
    <p>
        Previously when prefixing was not done and when the model was trained
        with the the tinyshakespeare text, I ran into "issues" where Horatio
        would be speaking as a woman and characters across plays would be
        talking to each other. Which might be what you want, depending on
        circumstances.
    </p>
    <p>
        But prefixing also gives you the flexibility to deliberately mix and
        match plays and give a hint of which play you want. I did not try this,
        but you're free to explore!
    </p>
    <p>
        For a complete list of plays supported in this app and their ids, see
        <a href="/about" use:link>About</a>.
    </p>
    <p>
        You can also specify other parameters:
        <code>top-k</code>,
        <code>top-p</code>,
        <code>temperature</code>, minimum ouput length, and maximux output
        length. Look at
        <a
            href="https://huggingface.co/blog/how-to-generate"
            target="_blank">this article</a>
        for what those inputs mean, or simply ask Google.
    </p>
    <h2>More AI and Shakespeare</h2>
    <p>
        Check out a much more serious poetry generation with
        <a href="https://www.gwern.net/GPT-2" target="_blank">GPT-2</a>, and now
        with
        <a href="https://www.gwern.net/GPT-3" target="_blank">GPT-3</a>
        (which produces works with much higher quality!).
    </p>
</TextPage>
