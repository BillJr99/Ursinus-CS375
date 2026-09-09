---
layout: activity
permalink: /Activities/CICD
title: "CS375: Software Engineering - Continuous Integration and Continuous Deployment (CI/CD)"


info:
  goals:
    - To explain the purpose of Continuous Integration (CI) and Continuous Deployment (CD) in a software team workflow
    - To create a GitHub Actions workflow that automatically runs a test suite on every push
    - To write and explain a Dockerfile that packages an application and its dependencies into a portable image
    - To describe a deployment pipeline that builds and publishes a container image when changes are merged

  models:
    - model: |
        <pre><code>name: Python package

        on: [push]

        jobs:
          build:
            runs-on: ubuntu-latest
            strategy:
              matrix:
                python-version: ["3.9"]
            steps:
              - uses: actions/checkout@v3
              - name: Set up Python
                uses: actions/setup-python@v4
                with:
                  python-version: $&#123;&#123; matrix.python-version &#125;&#125;
              - name: Install dependencies
                run: |
                  python -m pip install --upgrade pip
                  pip install pytest pytest-cov
                  if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
              - name: Test with pytest
                run: |
                  pytest --cov</code></pre>
      title: A Continuous Integration Workflow with GitHub Actions
      questions:
        - "This file lives at <code>.github/workflows/automatedtesting.yaml</code> in the repository.  What event causes this workflow to run?  How often would that happen on a four-person team?"
        - "Read the <code>steps</code> list from top to bottom, and describe in your own words what each step does.  Why must <code>actions/checkout</code> come first?"
        - "What happens to a pull request if the <code>pytest</code> step fails?  Why is it valuable to know this <em>before</em> merging, rather than after?"
        - "The workflow runs on a fresh <code>ubuntu-latest</code> virtual machine every time.  Why is it a <em>feature</em> that nothing is left over from the previous run?  What kinds of &quot;works on my machine&quot; bugs does this catch?"
    - model: |
        <pre><code>FROM node:22-slim
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        EXPOSE 3000
        CMD ["node", "server.js"]</code></pre>
      title: Packaging an Application with a Dockerfile
      questions:
        - "Each line of a Dockerfile creates a <strong>layer</strong>.  Describe what each of the seven lines above contributes to the final image."
        - "Why do we <code>COPY package*.json</code> and run <code>npm install</code> <em>before</em> copying the rest of the source code?  (Hint: Docker caches layers, and re-uses a cached layer if its inputs have not changed.)"
        - "What is the difference between <code>EXPOSE 3000</code> and actually publishing the port with <code>docker run -p 3000:3000</code>?"
        - "How does shipping this image differ from shipping a README that says &quot;install node 22, then run npm install&quot;?  Which is more reproducible, and why?"
    - model: |
        <div align="center">
        <table border="1" cellpadding="6">
          <thead>
            <tr><th>Stage</th><th>Trigger</th><th>What Happens</th><th>Who Notices If It Fails</th></tr>
          </thead>
          <tbody>
            <tr><td>1. Continuous Integration</td><td>Every push and pull request</td><td>Checkout, build, run unit tests and coverage</td><td>The author, within minutes, via a red X on the commit</td></tr>
            <tr><td>2. Continuous Delivery</td><td>Merge to the main branch</td><td>Build the Docker image and push it to a registry (for example, the GitHub Container Registry <code>ghcr.io</code>)</td><td>The team: the latest image is the release candidate</td></tr>
            <tr><td>3. Continuous Deployment</td><td>Successful image publish</td><td>The hosting environment pulls and runs the new image (a cloud host, a lab server, or a container platform)</td><td>The users -- which is why stages 1 and 2 gate this one!</td></tr>
          </tbody>
        </table>
        </div>
      title: "The Pipeline: from Commit to Deployment"
      questions:
        - "In your own words, what is the difference between continuous <em>integration</em>, continuous <em>delivery</em>, and continuous <em>deployment</em>?"
        - "Why does each stage <strong>gate</strong> the next one?  What could go wrong if a team deployed on every push without running the tests first?"
        - "Suppose a bug reaches production anyway.  How does this pipeline help you roll back quickly?  (Hint: every merge produced a tagged image.)"

  additional_reading:
    - link: https://docs.github.com/en/actions/writing-workflows/about-workflows
      title: "About GitHub Actions Workflows"
    - link: https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing
      title: "Building and Testing with GitHub Actions (per-language examples)"
    - link: https://docs.docker.com/get-started/
      title: "Docker Getting Started Guide"
    - link: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
      title: "Publishing Images to the GitHub Container Registry"
    - link: https://martinfowler.com/articles/continuousIntegration.html
      title: "Continuous Integration by Martin Fowler"

tags:
  - cicd
  - testing
  - docker

---

## Why CI/CD?

On a solo project, you know exactly what state your code is in, because you are the only one changing it.  On a team, four people are pushing changes to the same repository every day, and any one of those changes can break something another person depends on.  **Continuous Integration (CI)** is the practice of merging everyone's work frequently -- at least daily -- and having a robot build the project and run the full test suite on *every single push*, so that a breaking change is caught within minutes of being written, while it is still fresh in its author's mind and cheap to fix.  **Continuous Deployment (CD)** extends the same idea to releasing: once the tests pass on the main branch, a machine (not a stressed-out human at midnight) packages and ships the new version automatically.  This is how real teams ship software many times per day with confidence: not by being more careful than you, but by automating the checking.

We will build up a pipeline in three small steps: first automated testing (CI), then packaging with Docker, then automated delivery (CD).

## Step 1: Continuous Integration with GitHub Actions

GitHub Actions is GitHub's built-in automation service.  You describe a **workflow** in a YAML file inside your repository under `.github/workflows/`, and GitHub runs it for you on a fresh virtual machine whenever the triggering event occurs.  You do not need to install anything: if the file exists in your repository, it runs.

To add CI to a Python project:

1. In your repository, create the directory `.github/workflows/` (note the leading dot).
2. Add a file named `automatedtesting.yaml` containing the workflow from the first model above.
3. Commit and push.  Then click the **Actions** tab on GitHub: you will see your workflow running.  A green check mark means every step succeeded; a red X means a step failed, and clicking it shows you the console output of the failing step -- exactly as if you had run `pytest` yourself.
4. Now the fun part: push a commit that breaks a test on purpose.  Watch the red X appear on the commit (and on any pull request containing it).  This is your safety net.

The complete working example below contains a small Python program, a `pytest` test suite, and the workflow file wired together; browse the code and note where each piece lives in the directory tree.

### Example: GitHub Automated Testing Workflow Example

<iframe height="500px" width="100%" src="https://www.billmongan.com/Ursinus-CS375-Spring2025/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FGitHubWorkflowPythonTestExample.zip&title=GitHub%20Automated%20Testing%20Workflow%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

For other languages (node.js, Java, and others), GitHub provides starter workflows: see the "Building and Testing" link in the readings, or click **Actions**, then **New workflow** in your repository and GitHub will suggest one that matches your project.

## Step 2: Packaging with Docker

CI proves your code works on a clean machine.  Docker takes the next step: it packages your application *together with* the exact operating system libraries, language runtime, and dependencies it needs into an **image**, so that the thing you tested is byte-for-byte the thing you deploy.  A running instance of an image is called a **container** -- think of the image as a class and the container as an object instance.

Work through the Dockerfile in the second model above, one layer at a time:

| Line | What it does |
|------|--------------|
| `FROM node:22-slim` | Start from a published base image that already contains node.js 22 on a minimal Linux. |
| `WORKDIR /app` | All subsequent commands run inside `/app` in the image. |
| `COPY package*.json ./` | Copy *only* the dependency manifest first... |
| `RUN npm install` | ...so that this slow step is cached and re-run only when the manifest changes. |
| `COPY . .` | Now copy the application source code. |
| `EXPOSE 3000` | Document that the app listens on port 3000. |
| `CMD ["node", "server.js"]` | The command that runs when a container starts. |

Try it (Docker Desktop is a free install on Windows/macOS/Linux):

```
docker build -t myapp .        # build the image from the Dockerfile
docker run -p 3000:3000 myapp  # run it, publishing container port 3000 to your machine
```

Then browse to `http://localhost:3000`.  The application is running in an isolated container: it does not matter what versions of node (or anything else) are installed on your laptop, and the identical image will behave identically on a teammate's laptop or a cloud server.  (The `DatabaseMVCExample` from the [MVC activity](./MVC) ships with a `Dockerfile` and `docker-compose.yml` you can experiment with.)  The [Containers activity](./Containers) goes deeper on Docker as a shared development and testing environment -- sharing folders with **volumes**, running a whole stack with **docker-compose**, and **isolation** for safety.

## Step 3: Continuous Deployment

The last stage connects the first two: when a pull request is merged to `main` (and only after the CI tests pass), a second workflow builds the Docker image and pushes it to a **container registry** -- a package repository for images, such as the GitHub Container Registry (`ghcr.io`) that comes free with your repository.  A minimal deployment workflow looks like this:

<pre><code>name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      - name: Log in to the GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: $&#123;&#123; github.actor &#125;&#125;
          password: $&#123;&#123; secrets.GITHUB_TOKEN &#125;&#125;
      - name: Build and push the image
        run: |
          docker build -t ghcr.io/$&#123;&#123; github.repository &#125;&#125;:latest .
          docker push ghcr.io/$&#123;&#123; github.repository &#125;&#125;:latest
</code></pre>

From there, *where* the container actually runs is a configuration detail that varies by team: a cloud provider (AWS, Azure, Google Cloud, Render, Fly.io), a department server, or an orchestrator like Kubernetes simply **pulls the newest image from the registry and restarts the container**.  The essential idea is the same everywhere: deployment is a pull of an already-tested artifact, not a rebuild from source on the production machine.  Pushing an image to a registry is only one way to ship; the [Publishing and Deployment activity](./Deploy) compares it with publishing a package to **npm**, deploying a serverless function with **Cloudflare Wrangler**, and hosting a static site on **GitHub Pages**.

Notice how the three stages form a chain of gates: a change cannot be deployed unless it was merged, it should not be merged unless CI is green, and CI is green only if the tests pass.  Your test plan is what gives those gates their meaning -- which is why your project test plan requires a passing CI workflow.

## Your Turn

1. Add the CI workflow from Step 1 to your project repository (adapting it to your project's language), push a commit, and confirm a green check appears under the **Actions** tab.
2. Break a test on purpose, push, and take a screenshot of the red X.  Then fix it.  You have just experienced the entire point of CI.
3. Write a `Dockerfile` for your project, build the image, and run it locally with `docker run`.
4. (Challenge) Add the deployment workflow from Step 3 and confirm your image appears under **Packages** on your repository page.
