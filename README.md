# Your Shakespeare Play

Generate Shakespeare with GPT-2

The Home page of the app contains instructions on how to use the app.

Links to related places:

1. Backend: https://shakespeare-backend.azurewebsites.net/docs
2. Backend GitHub repo: https://github.com/ruoshui-git/shakespeare-backend
3. Text formatting GitHub repo: https://github.com/ruoshui-git/shakespeare-data

My original idea was to run this in the browser, maybe though rust+wasm, or with tfjs. Both methods failed. So this is what I came up with.

Todos:

- [x] Add advanced mode - no prefixing and removing; able to set top-k, top-p, temperature, min & max
- [x] add examples
- [x] add even more examples
- [x] Deploy frontend
- [x] configure file hashing
- [x] deploy backend

nice to have:

-   a `show-more` feature to output box and cut output at the end of the first character's output
-   export outputs
-   ~~thinner scrollbar~~

# Building the frontend locally

## Get started

Install the dependencies...

```bash
cd shakespeare-front
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) install the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
