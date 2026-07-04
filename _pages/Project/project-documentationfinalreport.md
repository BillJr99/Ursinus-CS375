---
layout: assignment
permalink: /Project/DocumentationFinalReport
title: "CS375: Software Engineering - User Manual and Technical Documentation"


info:
  coursenum: CS375
  points: 100
  goals:
    - To prepare a final user manual and technical manual for a medium-sized software project
    - To publish the project documentation as a GitHub Pages website

  contract:
    a: 
    - "Each item required for a grade of B is included"
    - "The user manual and technical documentation are published on the project's GitHub Pages website"
    - "The manual is written to a standard such that it represents the culmination of knowledge that the group would have wished for prior to starting the project."
    - "The manual includes results from stakeholders or group members executing the user acceptance test plan"
    b:
    - "Each item required for a grade of C is included"
    - "The manual includes figures and tables as appropriate to communicate with their respective audiences"
    - "The manual includes a code coverage report from the software test plan indicating full test coverage, and links to a passing continuous integration run"
    - "The user manual section is written in a non-technical way"
    c:
    - "Each item required for a grade of D is included"
    - "The technical documentation section describes how to deploy the system, and the user manual section describes how to operate the software"
    d:
    - "Both the user manual and technical documentation sections are included"

  readings:
    - rlink: "https://docs.github.com/en/pages/quickstart"
      rtitle: "GitHub Pages Quickstart"

tags:
  - project
  
---

The User Manual (formerly called the Final Report) is the last of the four graded project documents (Requirements, Objects/API Summary, Test Plan, and User Manual).  It documents the work that you've done so that a) non-technical audiences can use your software, and b) technical users can deploy, maintain, and enhance your project.

You might consider writing the manual in a way that would have benefitted you months ago when you first started the project, or in a way that would benefit you a year from now when you've forgotten all the details.  Screenshots and figures are essential here, as you are communicating your work to a broad audience.

### The User Manual Section

Written for a non-technical reader: what the software is for, how to get started, and how to perform each major task (one per functional requirement), illustrated with screenshots.  A good test: someone from your stakeholder group should be able to follow it without help from your team.

### The Technical Documentation Section

Written for the next developer: how to obtain, build, deploy (see your [CI/CD pipeline](../Activities/CICD)), and test the system; an overview of the architecture referencing your [Objects/API Summary](./Design); and any environment variables, credentials, or configuration the system needs.

### Code Coverage Report

In this manual, include the results of your test plans: execute your unit tests, and indicate how many passed.  Also include the code coverage report, and a link to (or screenshot of) a passing continuous integration run.  Indicate the results of each user acceptance test that your stakeholders (or, if they are unavailable, your project group members) executed.

### Publish It: Your Documentation as a GitHub Pages Website

Your user manual and documentation must be **published as a GitHub Pages website** from your project repository -- a live, public URL you can put on a resume, not just a PDF in a folder.  Since your reports are already Markdown files in your repository, this takes about five minutes:

1. In your project repository on GitHub, make sure your documentation pages are Markdown files (for example, `index.md` for the landing page, plus `usermanual.md`, `requirements.md`, and so on) either at the repository root or in a `/docs` folder.
2. Go to **Settings**, then **Pages** (in the left sidebar).
3. Under **Build and deployment**, set **Source** to "Deploy from a branch," choose your `main` branch (and `/` root or `/docs`, matching step 1), and click **Save**.
4. Within a minute or two, your site is live at `https://<username>.github.io/<repository>/`.  GitHub renders your Markdown with a default Jekyll theme automatically; you can pick a different theme by adding a one-line `_config.yml` (see the Quickstart in the readings).
5. Confirm every report is reachable by link from your landing page, then put the URL at the top of your submission.

(Alternatively, teams who want full control can deploy with a GitHub Actions Pages workflow -- **Settings**, **Pages**, **Source: GitHub Actions** -- which is the same mechanism your CI already uses; the deploy-from-branch route is entirely sufficient for this course.)

Your published site should include, at minimum: a landing page describing the project, the user manual, the technical documentation, and links to your other three project documents (Requirements, Objects/API Summary, and Test Plan) and to the repository itself.
