---
layout: assignment
permalink: /Project/Requirements
title: "CS375: Software Engineering - Requirements Report"
excerpt: "CS375: Software Engineering - Requirements Report"

info:
  coursenum: CS375
  points: 100
  goals:
    - To prepare a software requirements document for a software project

  rubric:
  - weight: 45
    description: Functional Requirements
    preemerging: "Cross-referenced functional requirements are not provided for this project"
    beginning: "One or more functional requirements is missing or unclear, and/or not adequately cross-referenced"
    progressing: "A mostly comprehensive description of each functional requirement is given with a use case or user story and that is cross-referenced"
    proficient: "A comprehensive description of each functional requirement is given with a use case or user story and that is cross-referenced is provided"
  - weight: 30
    description: Stakeholder Feedback and Analysis
    preemerging: No stakeholder feedback is present
    beginning: "Evidence of stakeholder interviews is provided"
    progressing: "Stakeholder feedback is included, including questions and answers to each group"
    proficient: "Stakeholder feedback is included, including questions and answers to each group, as well as a thoughtful digest translating those inputs into functional requirements"
  - weight: 15
    description: Gantt Chart and Project Schedule
    preemerging: The Gantt chart is missing or incorrect
    beginning: The Gantt chart is incomplete
    progressing: The Gantt Chart assigns tasks to group members
    proficient: The Gantt Chart identifies project dependencies and assigns tasks to group members
  - weight: 10
    description: Non-Functional Requirements
    preemerging: Non-functional requirements are missing from the report
    beginning: Non-functional requirements are not appropriate to the project, but are provided
    progressing: Non-functional requirements are too strict or too minimal for the project scope
    proficient: Reasonable non-Functional requirements are offered for the project
    
  readings:
    - rlink: "../files/exampledocs/NLiVE_RS.pdf"
      rtitle: "Example requirements document"

tags:
  - project

---

### Stakeholder-based Design

Before you decide upon your software requirements, it is necessary to obtain input from your stakeholder groups.  Prepare a list of questions to ask them that will help you obtain information about their needs.  

Keep in mind that their answers will be non-technical, and so your questions should be non-technical in nature.  Do not delve into the technical aspects of your project with your stakeholder group.  Rather, it will be your job to translate their feedback into technical functional requirements.

Include your stakeholder questions, responses, and your reflections upon their input (for example, how you translated their feedback into requirements) as a section of your report.

### Functional Requirements 

To create the software requirements document, begin by establishing a list of numbered functional requirements for your software system.

For each requirement, design a use case or user story.  A use case provides a flowchart of user actions that culminates in the completion of the software requirement.  A user story is similar but takes the following form:

```
As a <type of user>, I need to <action I need to perform> because <reason this action is necessary>
```

In either case, requirements may depend upon each other.  For example, it may not be possible to open a project until the user has logged into the system and obtained a user token.  Therefore, the login requirement would be a dependency of the project listing requirement.  Because your requirements are numbered, you can cross-reference them in this way.

### Non-Functional Requirements

Finally, identify those non-functional requirements (for example, hardware deployment requirements, network bandwidth, computational power, and so on) for your project.

### Gantt Chart

Include a Gantt chart for your project that schedules each of your sprints.  Each sprint should culminate in a prototype or proof-of-concept toward your final project.  The Gantt chart should identify dependencies between tasks within each sprint.

### Website

Include your requirements report on the project website.