---
layout: assignment
permalink: /Project/Design
title: "CS375: Software Engineering - Objects/API Summary Report"


info:
  coursenum: CS375
  points: 100
  goals:
    - To prepare an Objects/API Summary that incorporates all collected software requirements in abstracted and independent software modules

  rubric:
  - weight: 25
    description: Requirements Cross-Reference
    preemerging: The Objects/API Summary is missing references to several requirements
    beginning: The Objects/API Summary incorporates most requirements
    progressing: The Objects/API Summary incorporates all requirements
    proficient: The Objects/API Summary incorporates all requirements in a cross-referenced manner
  - weight: 25
    description: Separation of Concerns
    preemerging: The proposed design does not isolate concerns into software components
    beginning: The proposed design separates requirements into a set of concerns which are mostly captured by a few loosely coupled components
    progressing: The proposed design separates requirements into a set of concerns which are captured by a few loosely coupled components
    proficient: The proposed design separates requirements into a minimal set of concerns which are captured by a few loosely coupled components
  - weight: 25
    description: Data Schema
    preemerging: The data model does not support the proposed software design
    beginning: The data model supports the proposed software design following a major revision
    progressing: The data model supports the proposed software design except for a few minor suggestions
    proficient: The data model is appropriate for the proposed software design   
  - weight: 25
    description: Use Case Traces
    preemerging: Use cases or user stories are not traced through the software components
    beginning: Some use cases or user stories are traced through the software components to ensure they are adequately designed and isolated
    progressing: Most use cases or user stories are traced through the software components to ensure they are adequately designed and isolated
    proficient: Each use case or user story is traced through the software components to ensure they are adequately designed and isolated      

  readings:
    - rlink: "../files/exampledocs/NLiVE_Design.pdf"
      rtitle: "Example design document"
    - rlink: "https://dbdiagram.io/home"
      rtitle: "DB Diagram for Schema Generation"

tags:
  - project
  
---

The Objects/API Summary (formerly called the Design Report) is the second of the four graded project documents (Requirements, Objects/API Summary, Test Plan, and User Manual).  It is a catalog of the *things* your system is made of -- the classes/objects, the API endpoints or microservices, and the data schema -- and how your requirements map onto them.  Think of it as the document a new developer would read to learn what exists in your system and where each responsibility lives.

In your Objects/API Summary, include a summary of your project goals and requirements from the prior report.

Then, for each requirement, specify a software design (either a microservice, or design pattern) that accomplishes that requirement in a modular, abstract, and/or isolated way.  

Each method or microservice should include a list of pre- and post-conditions that will serve as your unit tests and acceptance tests to be discussed later in subsequent plans.  List each of these methods within your class or microservice design along with a UML diagram describing each.  You should specify which requirements keys each method, class, or microservice accomplishes.  If you find that a particular code module attempts to accomplish too many requirements, this may be a sign that you should consider breaking this design into smaller components.  Provide a schema for any database or cloud data storage.

### API Endpoint Summary

If your system exposes a web API (most projects do), summarize every endpoint in a table so that the entire surface of your system is visible at a glance, for example:

| Method | Path | Auth Required? | Request Body | Response | Requirement(s) |
|--------|------|----------------|--------------|----------|----------------|
| POST | /auth/login | No | `{username, password}` | `{token}` | R1 |
| GET | /notes | Yes (JWT) | -- | array of notes | R3 |
| POST | /notes | Yes (JWT) | `{text}` | created note | R4 |

For a non-web project, provide the equivalent: a table of public classes and methods with their signatures, callers, and requirement keys.

### Use Case Traces

Finally, for each requirement, show a flowchart that describes the trace through the services and components of your software system that are exercised by that requirement.  Ideally, this will be a relatively small trace for each requirement.  If your system follows the [MVC pattern](../Activities/MVC), a route-to-controller-to-model trace table is an effective format.

### Design Review Checklist

Before submitting, review your design against this checklist (and note in the document that you have); these are the mistakes most often caught in review:

* **Default values live in the model or controller, never the view.**  For every field the user does not consciously choose (creation timestamps such as `createDate`, record IDs, owning user, initial status), your schema or controller supplies the value -- for example `createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP` in the schema, rather than a value posted from a form.  See the [MVC activity's design guideline](../Activities/MVC) for the bad-vs-good example.  Identify each such field in your schema and state which layer supplies it.
* **Every requirement key appears** next to at least one class, method, or endpoint (and vice versa: no orphan components with no requirement).
* **Each component has one job**: no class or service accomplishes an unrelated cluster of requirements.
* **Sensitive routes name their guard**: any endpoint marked "Auth Required" identifies the middleware or check that enforces it.
* **UI color palette is specified and accessible**: your design names the palette (hex codes) allocated by the 60-30-10 rule, your body text/background pair meets the WCAG AA contrast ratio of at least 4.5:1 (record the computed ratio), and no meaning in the UI is conveyed by color alone.  See the [GUI activity's color section](../Activities/GUI) for the tools and the math.

### Website

Include your Objects/API Summary on the project website.
