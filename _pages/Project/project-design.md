---
layout: assignment
permalink: /Project/Design
title: "CS375: Software Engineering - Design Report"
excerpt: "CS375: Software Engineering - Design Report"

info:
  coursenum: CS375
  points: 100
  goals:
    - To prepare a design document that incorporates all collected software requirements in abstracted and independent software modules

  rubric:
  - weight: 25
    description: Design Document Requirements Reference
    preemerging: The design document is missing references to several requirements
    beginning: The design document incorporates most requirements
    progressing: The design document incporates all requirements
    proficient: The design document incorporates all requirements in a cross-referenced manner
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

tags:
  - project
  
---

In your design report, include a summary of your project goals and requirements from the prior reports.

Then, for each requirement, specify a software design (either a microservice, or design pattern) that accomplishes that requirement in a modular, abstract, and/or isolated way.  

Each method or microservice should include a list of pre- and post-conditions that will serve as your unit tests and acceptance tests to be discussed later in subsequent plans.  List each of these methods within your class or microservice design along with a UML diagram describing each.  You should specify which requirements keys each method, class, or microservice accomplishes.  If you find that a particular code module attempts to accomplish too many requirements, this may be a sign that you should consider breaking this design into smaller components.  Provide a schema for any database or cloud data storage.

Finally, for each requirement, show a flowchart that describes the trace through the services and components of your software system that are exercised by that requirement.  Ideally, this will be a relatively small trace for each requirement.

### Website

Include your design report on the project website.