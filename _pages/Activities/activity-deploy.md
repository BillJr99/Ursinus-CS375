---
layout: activity
permalink: /Activities/Deploy
title: "CS375: Software Engineering - Publishing and Deployment"


info:
  goals:
    - To choose an appropriate deployment target for a given software artifact
    - To publish a versioned package to the npm registry
    - To deploy a serverless function to Cloudflare Workers with Wrangler
    - To recognize container registries (ghcr, Docker Hub) and GitHub Pages as deployment targets, and to keep deployment credentials safe

  models:
    - model: |
        <pre><code>{
          "name": "@myteam/course-utils",
          "version": "1.0.0",
          "description": "Shared helpers for our CS375 project",
          "main": "index.js",
          "files": ["index.js", "README.md"],
          "license": "MIT"
        }</code></pre>
      title: "A Publishable package.json"
      questions:
        - "The <code>name</code> is <em>scoped</em> (<code>@myteam/...</code>).  Why might a team publish under a scope instead of a bare name like <code>course-utils</code>?"
        - "The <code>files</code> field lists what actually ships to consumers.  Why would you <em>not</em> want to publish your tests, <code>.git</code>, or <code>node_modules</code>?"
        - "A published version is <strong>immutable</strong>: once <code>1.0.0</code> is out, you can never change what <code>1.0.0</code> contains.  Why is that a feature for the people who depend on your package?"
    - model: |
        <pre><code># wrangler.toml
        name = "myteam-api"
        main = "src/worker.js"
        compatibility_date = "2024-01-01"

        // src/worker.js
        export default {
          async fetch(request, env) {
            return new Response("Hello from the edge!");
          }
        };</code></pre>
      title: "A Cloudflare Worker and its wrangler.toml"
      questions:
        - "The Worker is just a <code>fetch</code> function that takes a request and returns a response.  Where does this code run -- on a server you rent and manage, or on Cloudflare's network?"
        - "A secret such as an API key is read from <code>env</code>, not written in the source.  Why should the secret never appear in <code>src/worker.js</code> or <code>wrangler.toml</code>?"
        - "What is the difference between running <code>wrangler dev</code> and running <code>wrangler deploy</code>?"
    - model: |
        <div align="center">
        <table border="1" cellpadding="6">
          <thead>
            <tr><th>Target</th><th>Best for</th><th>How a consumer uses it</th><th>Always running?</th></tr>
          </thead>
          <tbody>
            <tr><td>npm registry</td><td>A reusable library or command-line tool</td><td><code>npm install your-package</code></td><td>No -- it is downloaded into their project</td></tr>
            <tr><td>Cloudflare Workers</td><td>A serverless HTTP API or endpoint</td><td>An HTTPS URL</td><td>Yes -- on the edge, scaling automatically</td></tr>
            <tr><td>ghcr / Docker Hub</td><td>A whole containerized application</td><td><code>docker pull</code>, then run</td><td>Wherever the image is run</td></tr>
            <tr><td>GitHub Pages</td><td>A static site, documentation, or frontend</td><td>An HTTPS URL</td><td>Yes -- static hosting</td></tr>
          </tbody>
        </table>
        </div>
      title: "Choosing a Deployment Target"
      questions:
        - "For your semester project, which target fits the piece you want to ship: a reusable utility, an API endpoint, the whole app, or a documentation site?"
        - "Which of these targets have you already used -- ghcr in the <a href=\"./CICD\">CI/CD activity</a>, and GitHub Pages in the <a href=\"../Project/DocumentationFinalReport\">User Manual deliverable</a>?"
        - "Why might one project use more than one target at once (for example, a package on npm <em>and</em> a docs site on Pages)?"

  additional_reading:
    - link: https://docs.npmjs.com/creating-and-publishing-scoped-public-packages
      title: "Creating and Publishing Packages (npm Docs)"
    - link: https://semver.org/
      title: "Semantic Versioning 2.0.0"
    - link: https://developers.cloudflare.com/workers/get-started/guide/
      title: "Cloudflare Workers: Get Started"
    - link: https://developers.cloudflare.com/workers/wrangler/commands/
      title: "Wrangler Commands Reference"
    - link: https://docs.docker.com/docker-hub/
      title: "Docker Hub Documentation"
    - link: https://docs.github.com/en/pages/quickstart
      title: "GitHub Pages Quickstart"

tags:
  - deployment
  - cloud
  - docker
  - cicd

---

## Four Ways to Ship

Building software is only half the job; at some point other people have to be able to *use* it.  **Deployment** (also called **publishing** or **releasing**) is the act of putting a finished artifact somewhere the world can reach it.  The right destination depends on *what* you built: a reusable library goes to a package registry, a running service goes to a host, a container image goes to a container registry, and a static site goes to static hosting.  The third model above summarizes the four targets we will practice; the essential skill is matching your artifact to the right one.

Two rules apply to every target: **version everything**, and **never put secrets in your source code**.  We will return to both.

## Publishing a Package to npm

npm is the package registry for the JavaScript world -- when you run `npm install`, this is where the code comes from.  Publishing your own package lets a teammate (or the world) install your code with one command.

**1. Create an account and turn on two-factor authentication.**  Sign up at [npmjs.com](https://www.npmjs.com/), then enable **2FA** in your account settings.  Publishing is a supply-chain-sensitive action -- everyone who installs your package runs what you publish -- so protecting the account is not optional.

**2. Create the package manifest.**  In your project folder, run `npm init` and answer the prompts (or `npm init -y` for defaults).  This creates the `package.json` from the first model.  Pick a `name` (a scope like `@myteam/course-utils` avoids collisions with the millions of existing package names) and a starting `version`.

**3. Version it with Semantic Versioning.**  npm versions follow **[semver](https://semver.org/)**: `MAJOR.MINOR.PATCH`.

| Change you made | Bump | Example | Command |
|---|---|---|---|
| Backward-compatible bug fix | PATCH | `1.4.2` -> `1.4.3` | `npm version patch` |
| New feature, still compatible | MINOR | `1.4.3` -> `1.5.0` | `npm version minor` |
| Breaking change | MAJOR | `1.5.0` -> `2.0.0` | `npm version major` |

This is a *contract* with the people who depend on you: they can safely accept your patches and minors, but a major version warns them that something changed out from under them.

**4. Log in and publish.**

```
npm login                      # authenticate this machine
npm publish --access public    # scoped packages are private by default; this makes it public
```

**5. Verify it.**  From a different folder, `npm install @myteam/course-utils` (or `npx` your tool) and confirm it works.

**6. Publish updates.**  Change your code, bump the version, and publish again -- you can never overwrite an existing version, only release a new one:

```
npm version patch    # updates package.json and creates a git tag
npm publish
```

**In continuous integration:** never type your password into a pipeline.  Create an **automation token** on npm, store it as a repository **secret** (for example `NPM_TOKEN`), and let the workflow expose it to npm through the `NODE_AUTH_TOKEN` environment variable (via an `.npmrc` line `//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}`).  The token is least-privilege and revocable; your password is neither.

## Deploying to the Edge with Cloudflare Workers

A **Cloudflare Worker** is a *serverless* function: you write a small piece of code, and Cloudflare runs it on its global network, close to your users, with no server for you to provision, patch, or scale.  **Wrangler** is its command-line tool.

**1. Get the tools.**  Create a free [Cloudflare](https://dash.cloudflare.com/sign-up) account, then install Wrangler (or run it on demand with `npx`):

```
npm install -g wrangler    # or use: npx wrangler <command>
```

**2. Scaffold a project.**  The quickstart creates a ready-to-run Worker with a `wrangler.toml` and a `src/worker.js` like the second model:

```
npm create cloudflare@latest myteam-api
```

**3. Understand the config.**  `wrangler.toml` names the Worker (`name`), points at your entry file (`main`), and pins a `compatibility_date`.  Your `src/worker.js` exports a `fetch` handler that receives each `request` and returns a `Response`.

**4. Run it locally.**  `wrangler dev` starts a local server so you can iterate without deploying:

```
wrangler dev       # develop and test at http://localhost:8787
```

**5. Deploy it live.**

```
wrangler login     # authenticate with your Cloudflare account
wrangler deploy    # publish -- your Worker is now live at https://myteam-api.<your-subdomain>.workers.dev
```

**6. Handle secrets and watch logs.**  Never commit an API key.  Store it with Wrangler, then read it from `env` inside the Worker:

```
wrangler secret put API_KEY    # prompts for the value; stored encrypted, not in your repo
wrangler tail                  # stream live logs from the deployed Worker
```

In CI, store a **scoped** `CLOUDFLARE_API_TOKEN` as a repository secret and let the deploy step read it -- the same least-privilege pattern as the npm token.

## Container Registries as a Deploy Target: ghcr and Docker Hub

You already met this target.  In the [CI/CD activity](./CICD) your pipeline pushed an image to the GitHub Container Registry (`ghcr.io`), and in the [Containers activity](./Containers) you pulled and ran a published image.  **Docker Hub** (`docker.io`) is the other widely used registry; publishing to it is the same three moves with a different host:

```
docker login                                  # log in to Docker Hub
docker tag myapp <dockerhub-user>/myapp:1.0.0 # name it for the registry, with a version tag
docker push <dockerhub-user>/myapp:1.0.0      # upload it
```

In a GitHub Actions workflow you would use `docker/login-action` with a `DOCKERHUB_USERNAME` and a `DOCKERHUB_TOKEN` secret -- again, a revocable token, never a password.  Choose a container registry when the thing you are shipping is *the whole running application*, not just a library.

## Static Sites and Docs with GitHub Pages

The simplest and cheapest target is **GitHub Pages**: free static hosting served straight from your repository.  You have already used it -- the [git assignment](../Assignments/git) had you publish an `index.md` on a `gh-pages` branch, and your [User Manual deliverable](../Project/DocumentationFinalReport) requires publishing the project documentation as a Pages site.  Reach for Pages whenever the artifact is a **static** site: documentation, a project landing page, or a compiled single-page frontend (**Settings**, then **Pages**, then deploy from a branch or via a GitHub Actions workflow).  There is no server and no cost -- ideal for the public face of your project.

## Keeping Deployment Credentials Safe

Every target above authenticates with a **token**, and the same discipline applies to all of them:

- Use a **least-privilege** credential: an npm *automation* token, a *scoped* Cloudflare API token, a *fine-grained* GitHub personal access token, a registry token that can push only what it needs.
- Store it as a repository or environment **secret**, and read it from the environment at deploy time.  **Never commit a token or key to git** -- this is exactly the kind of exposure the [Secure Software Engineering activity](./SoftwareSecurity) and the [security assignment](../Assignments/Security) warn about, and it is trivially found by attackers scanning public repositories.
- If a secret leaks, **rotate it** (revoke and reissue) immediately; because you used a scoped token, the blast radius is small.

## Your Turn

1. Extract one small reusable module from **your project** and publish it to npm with a proper semver `version`.  Have a teammate `npm install` it into a scratch folder and use it.
2. Deploy one endpoint of your project (or a simple health check) as a Cloudflare Worker with `wrangler deploy`, and store one configuration value with `wrangler secret put`.
3. In your project's [technical documentation](../Project/DocumentationFinalReport), state which deployment target(s) your team will use for the final demo, and justify the choice using the "Choosing a Deployment Target" table.
4. Put one deploy credential in your repository's **Actions secrets** and reference it from a workflow step -- confirm it works, and that the token appears **nowhere** in your source.
