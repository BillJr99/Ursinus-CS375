---
layout: activity
permalink: /Activities/Containers
title: "CS375: Software Engineering - Reproducible Environments and Isolation with Docker"


info:
  goals:
    - To explain how a container gives a team one reproducible development and testing environment
    - To share code and data between your computer and a container using bind mounts and named volumes
    - To orchestrate a multi-service application locally with docker-compose
    - To pull and run a published image, and to reason about container isolation and safety

  models:
    - model: |
        <div align="center">
        <table border="1" cellpadding="6">
          <thead>
            <tr><th>Term</th><th>What it is</th><th>Analogy</th><th>You make it with</th></tr>
          </thead>
          <tbody>
            <tr><td>Image</td><td>A read-only package of your app plus its OS libraries, runtime, and dependencies</td><td>A class</td><td><code>docker build</code> (from a Dockerfile)</td></tr>
            <tr><td>Container</td><td>A running instance of an image, isolated from the host</td><td>An object</td><td><code>docker run</code></td></tr>
            <tr><td>Registry</td><td>A shared library of images that teams push to and pull from</td><td>A package repository (like npm, but for images)</td><td><code>docker push</code> / <code>docker pull</code> (ghcr.io, Docker Hub)</td></tr>
          </tbody>
        </table>
        </div>
      title: "Image, Container, and Registry"
      questions:
        - "You wrote a Dockerfile and ran <code>docker build</code> in the <a href=\"./CICD\">CI/CD activity</a>.  Which of the three terms above did that produce, and which one does <code>docker run</code> produce?"
        - "Where does an image live <em>before</em> anyone runs it?  How does a teammate on a different laptop get the exact image you built?"
        - "Why is pulling an already-tested image from a registry more reproducible than asking a teammate to &quot;install node 22 and run npm install&quot; on their own machine?"
    - model: |
        <pre><code>version: "3.9"
        services:
          api:
            build: .
            ports:
              - "3000:3000"
            volumes:
              - .:/usr/src/app
            environment:
              - NODE_ENV=development</code></pre>
      title: "docker-compose.yml (from the DatabaseMVCExample)"
      questions:
        - "The line <code>- .:/usr/src/app</code> is a <strong>bind mount</strong>: it maps the current directory on your computer to <code>/usr/src/app</code> inside the container.  If you edit <code>server.js</code> in your editor, what happens inside the running container?"
        - "<code>ports: - &quot;3000:3000&quot;</code> maps a container port to a host port.  How is this different from the <code>EXPOSE</code> line in a Dockerfile?"
        - "What single command starts this whole stack?  Why is committing this file to your repository better onboarding than a README listing ten <code>docker</code> commands?"
    - model: |
        <pre><code>docker run --rm \
          -u 1000:1000 \
          --read-only \
          --cap-drop ALL \
          --memory 256m --cpus 0.5 \
          --network none \
          my-untrusted-tool</code></pre>
      title: "Running Untrusted Code in a Sandbox"
      questions:
        - "Each flag removes a capability from the container.  What does a compromised program inside this container <em>not</em> have access to (the network? the rest of your disk? unlimited memory? root)?"
        - "<code>--rm</code> deletes the container when it exits.  Why is that a safety feature as well as a tidiness feature?"
        - "You want to try a dependency you do not fully trust, or run a classmate's grader on your machine.  Why is a locked-down container a safer place to do that than your bare laptop?"

  additional_reading:
    - link: https://docs.docker.com/get-started/
      title: "Docker Getting Started Guide"
    - link: https://docs.docker.com/engine/storage/
      title: "Docker Storage: Volumes and Bind Mounts"
    - link: https://docs.docker.com/compose/
      title: "Docker Compose Overview"
    - link: https://docs.docker.com/engine/security/
      title: "Docker Engine Security (Isolation)"
    - link: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
      title: "Working with the GitHub Container Registry (ghcr.io)"

tags:
  - docker
  - cicd
  - testing

---

## Docker as Your Team's Dev Environment

"It works on my machine" is the oldest bug in software engineering.  It happens because your laptop, your teammate's laptop, the lab computer, and the production server all have slightly different versions of the language runtime, the libraries, and the operating system.  In the [CI/CD activity](./CICD) you wrote a **Dockerfile** that packages your application together with the exact runtime and dependencies it needs into an **image**.  Here we use that same idea for a different purpose: not just to *deploy* the app, but to *develop and test* it in an environment that is byte-for-byte identical for every member of your team.

Build the image once from your Dockerfile, and everyone runs the same thing:

```
docker build -t myapp .        # build the image from the Dockerfile (see the CI/CD activity)
docker run -p 3000:3000 myapp  # run it, publishing container port 3000 to your machine
```

No one has to install the right node, Python, or database on their own laptop -- it is all inside the image.  A new teammate goes from "cloned the repo" to "running the app" in one command.

## Seeing and Managing Your Containers

Once you start running containers, you need to see what is going on.  These are the commands you will use constantly (and Docker Desktop shows the same information in its **Containers** and **Images** tabs):

```
docker ps               # list running containers
docker ps -a            # list ALL containers, including stopped ones
docker images           # list the images you have built or pulled
docker logs <name>      # print the output (stdout/stderr) of a container
docker exec -it <name> sh   # open a shell INSIDE a running container, to look around
docker stop <name>      # stop a running container
docker rm <name>        # remove a stopped container
```

`docker exec -it <name> sh` is especially useful: it drops you into a shell *inside* the container so you can run the [command-line tools](../Assignments/git) you already know (`ls`, `cat`, `grep`) to see the container's filesystem exactly as your app sees it.

## Sharing Folders and Repos In and Out: Bind Mounts and Volumes

An image is a frozen snapshot -- but during development you are editing code every few seconds, and you do not want to rebuild the image on every keystroke.  The answer is to **share a folder between your computer and the container**.  There are two ways, and choosing correctly matters:

| Mechanism | Command | What it is for |
|---|---|---|
| **Bind mount** | `docker run -v "$(pwd):/app" myapp` | Maps a folder *on your computer* (for example, your git repo) into the container.  Edit a file on your laptop and the container sees it instantly -- ideal for **source code during development**. |
| **Named volume** | `docker run -v appdata:/data myapp` | A storage area that **Docker** manages and that **persists** after the container is deleted -- ideal for **data you must not lose**, like a database file. |

The second model above uses a bind mount (`.:/usr/src/app`) so the team can live-edit the source.  Two practical notes:

- Add a **`.dockerignore`** file (just like `.gitignore`) so that things like `node_modules`, `.git`, and secrets are **not** copied into your image when you build.
- To copy a single file in or out of a running container without a mount, use `docker cp myfile.txt <name>:/app/` (or the reverse).

## Orchestrating Your Stack with docker-compose

Most real applications are more than one process -- an API plus a database, say.  Starting each container by hand, in the right order, with the right flags, is exactly the kind of error-prone manual work we automate away.  **docker-compose** describes the whole stack in one `docker-compose.yml` file (the second model above), and starts it with a single command:

```
docker compose up      # build and start every service defined in docker-compose.yml
docker compose down    # stop and remove them
```

The `DatabaseMVCExample` below ships with a real `Dockerfile` and the `docker-compose.yml` from the model.  Browse it, then try `docker compose up` on your own copy and edit a source file to watch the bind mount in action.

<iframe height="500px" width="100%" src="https://www.billmongan.com/Ursinus-CS375-Spring2025/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FDatabaseMVCExample.zip&title=Database%20MVC%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

## Isolation and Safety: The Sandbox

A container is not only a convenience; it is a **sandbox**.  By default a container is isolated from the rest of your computer -- it has its own filesystem, its own process list, and its own network view -- so a program that misbehaves inside a container cannot casually reach the rest of your laptop.  You can tighten that sandbox further with the flags in the third model:

| Flag | What it protects against |
|---|---|
| `--rm` | Leaves no leftover container (and no leftover state) after the run |
| `-u 1000:1000` | Runs as a non-root user, so a break-out cannot act as root on the host |
| `--read-only` | The container cannot write to its own filesystem |
| `--cap-drop ALL` | Removes Linux capabilities the app does not need |
| `--memory 256m --cpus 0.5` | Caps resources, so one container cannot starve a shared lab server or your teammates |
| `--network none` | No network access at all -- perfect for running code you do not trust |

This is why containers are the standard way to run *untrusted* code: a dependency you are evaluating, an automated grader, or a CI job that executes a pull request from a stranger.  For **your own app** you would of course keep networking and publish a port (`-p 3000:3000`); reach for the locked-down flags when you are deliberately sandboxing something risky.  You should also bake safety into the image itself: add a non-root `USER` line to your Dockerfile and pin your base image to a specific tag.

## Publishing and Consuming an Image: ghcr and Docker Hub

The [CI/CD activity](./CICD) showed how a GitHub Actions workflow automatically builds your image and **pushes** it to the GitHub Container Registry (`ghcr.io`) on every merge to `main`.  Here is the other half of that story -- doing it by hand, and then **pulling and running** what was published, which is exactly how a deployment target consumes your work:

```
# Publish (the manual version of what CI automates for you)
docker login ghcr.io                                  # authenticate (use a token, not your password)
docker build -t ghcr.io/OWNER/REPO:latest .           # build and name (tag) the image
docker push ghcr.io/OWNER/REPO:latest                 # upload it to the registry

# Consume it, anywhere -- a teammate's laptop, a lab server, the cloud
docker pull ghcr.io/OWNER/REPO:latest                 # download the exact tested image
docker run -p 3000:3000 ghcr.io/OWNER/REPO:latest     # run it
```

Docker Hub (`docker.io`) works the same way with a different host name; you will meet both, and the [Publishing and Deployment activity](./Deploy) compares registries alongside npm and Cloudflare as deployment targets.  The key idea is that **deployment is a pull of an already-tested artifact**, not a rebuild from source on the production machine.

## Your Turn

1. Pull the image your team published to `ghcr.io` in the [CI/CD activity](./CICD) and run it locally.  Confirm it behaves the same as running the app directly with `npm start` (or your project's start command).
2. Add a `docker-compose.yml` to **your project** -- a bind mount for the source code, and a named volume for any database -- and bring it up with `docker compose up`.  Commit it so a teammate can onboard with one command.
3. Add a `.dockerignore` and a non-root `USER` line to your project's Dockerfile, rebuild, and confirm the app still runs.
4. Use `docker ps`, `docker logs`, and `docker exec -it <name> sh` to inspect your running container from the inside.
5. (Challenge) Run your image with `--read-only --cap-drop ALL --memory 256m`.  Whatever breaks tells you exactly what your application actually needs -- a useful thing to know before you deploy it.
