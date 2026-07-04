---
layout: assignment
permalink: /Project/Requirements
title: "CS375: Software Engineering - Requirements Report"


info:
  coursenum: CS375
  points: 100
  goals:
    - To identify a compelling software project, its stakeholders, and a capable team to build it
    - To prepare a software requirements document for a software project

  rubric:
  - weight: 20
    description: "Project Concept: Need, Stakeholders, and Team (Part 1)"
    preemerging: No project motivation, stakeholder identification, or group identification is given
    beginning: The concept motivates the project in some way, but the external need, the stakeholder groups, or the group member roles are missing or unclear
    progressing: The concept describes a functional need that can be satisfied within the scope of the course, identifies at least one stakeholder group and their role in shaping requirements, and proposes a group of adequate size in which each member has a specific role
    proficient: The concept describes a compelling functional need that can be satisfied within the scope of the course, identifies multiple stakeholder groups and their roles in shaping requirements, and proposes a group of adequate size with specific member roles and a role rotation schedule
  - weight: 35
    description: Functional Requirements
    preemerging: "Cross-referenced functional requirements are not provided for this project"
    beginning: "One or more functional requirements is missing or unclear, and/or not adequately cross-referenced"
    progressing: "A mostly comprehensive description of each functional requirement is given with a use case or user story and that is cross-referenced"
    proficient: "A comprehensive description of each functional requirement is given with a use case or user story and that is cross-referenced is provided"
  - weight: 25
    description: Stakeholder Feedback and Analysis
    preemerging: No stakeholder feedback is present
    beginning: "Evidence of stakeholder interviews is provided"
    progressing: "Stakeholder feedback is included, including questions and answers to each group"
    proficient: "Stakeholder feedback is included, including questions and answers to each group, as well as a thoughtful digest translating those inputs into functional requirements"
  - weight: 10
    description: Gantt Chart and Project Schedule
    preemerging: The Gantt chart is missing or incorrect
    beginning: The Gantt chart is incomplete or leaves tasks without an assigned owner
    progressing: The Gantt Chart assigns an owner to every task
    proficient: The Gantt Chart identifies project dependencies and assigns an owner to every task
  - weight: 10
    description: Non-Functional Requirements
    preemerging: Non-functional requirements are missing from the report
    beginning: Non-functional requirements are not appropriate to the project, but are provided
    progressing: Non-functional requirements are too strict or too minimal for the project scope
    proficient: Reasonable non-Functional requirements are offered for the project
    
  readings:
    - rlink: "../files/exampledocs/NLiVE_Proposal.pdf"
      rtitle: "Example project concept (proposal) document"
    - rlink: "../files/exampledocs/NLiVE_RS.pdf"
      rtitle: "Example requirements document"
    - rlink: "https://docs.github.com/en/pages/quickstart"
      rtitle: "Github Pages Quickstart"

tags:
  - project

---

The Requirements Report is the first of the four graded project documents (Requirements, Objects/API Summary, Test Plan, and User Manual).  It is submitted in **two installments**: **Part 1 (Project Concept)** early in the semester, in which you propose what you will build, for whom, and with what team; and the **full report** a few weeks later, which incorporates a (possibly revised) Part 1 along with your stakeholder-informed functional and non-functional requirements and project schedule.  Each installment is submitted and graded on the schedule; the full report is graded using the complete rubric on this page, and Part 1 using its Project Concept criteria.

## Part 1: Project Concept

For the project concept, you will identify a potential software project based on an existing perceived need.  You do not have to fully specify all the details of your project at this stage; however, the goal is to define the goal of your project, the members of your project, and identify a compelling need for that project.  As part of this "compelling need," you will identify multiple stakeholders: people who would use or be impacted by the use of your software project.  

Later (after the concept is accepted), you will speak with members of these stakeholder groups to the extent possible, to identify and document software requirements that will frame the scope of the remainder of your project.

### Project Group Members and Roles
For now, you will identify a potential group of at least 3 and up to 4 people, and assign each of them a role or area of expertise in completing the project.

You will rotate a few project roles among the group throughout the semester.  Your group should include:

1. A project lead: responsible for ensuring that everyone remains on-schedule, and adjusting the schedule with the group as-needed
2. A document lead: responsible for ensuring that the reports are well-organized and written in a single voice (although everyone should write all the reports all the time)
3. A scrum lead: responsible for leading the project group meetings, preparing the agendas, and keeping the project meeting minutes to be included in the periodic scrum reflection report
4. Code lead: responsible for the codebase and software repository, and ensuring that code coverage is sufficient and that test cases pass

Include a rotation schedule for these roles.  Every 3-5 weeks, these roles should rotate such that every member has served in every role.  This schedule should be included in the project concept.

### Required Elements of the Project Concept

Your concept should contain the following, likely as document sections:

1. A description of your project
2. A compelling need for the project 
* Be clear about the problem you are solving, and for whom you plan to solve those problems
3. A description of your stakeholder groups
4. The technical expertise of your project group, as well as each member's roles and responsibilities
* A discussion of technical aspects your group may need to learn in order to be successful
5. The minimum viable project scope: what functionality would you absolutely need to complete to be successful?
6. Aspirant scope: what additional features do you want to incorporate if time permits?
7. A rough timeline of the project scope, estimating on an hourly basis (assuming 8 hours per week per group member) the duration of each feature you identified as minimally viable and aspirant.
8. A summary of the intellectural merit of your project: why is it worth doing, and what is novel about it?
9. A summary of the broader impacts of your project: who benefits beyond your project group, and how?

### Suggestions

To help you identify potential project areas, consider external needs.  For example, what might benefit the campus community?  Think of your own experience and any challenges you encountered that could be aided by the use of technology.  It is perfectly acceptable to use this project as an opportunity to solve a problem from your own experience, but reflect carefully on the community benefit.  In this project, you will focus primarily on the needs of others, and assume that it will be other people serving as the primary users of your software.

## Part 2: The Full Requirements Report

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

Include a Gantt chart for your project that schedules each of your sprints.  Each sprint should culminate in a prototype or proof-of-concept toward your final project.  The Gantt chart should identify dependencies between tasks within each sprint, and **every task must have an assigned owner** (a single responsible group member) -- either by organizing the chart with one section per person, or with an assignee column in an accompanying task table, as practiced in the [Gantt activity](../Activities/Gantt).

### Press Release

Write up a "press release" document that describes your project to the layperson.  Show this to at least three people outside of your class project, and validate the feasibility of your project as well as their understanding of its goals and capabilities.  Provide and answer a list of frequently asked questions about your project.

## Website

A goal of this project is to help you develop a portfolio that you can share with others as you start your career.  To aid with this, one member of your group will create a github repository to hold the website for your project, where you will house your reports.  This repository must be shared with all members of your group.  Post your project concept, and later your full requirements report, as pages to this repository.  You will publish this repository as a GitHub Pages website as part of your [User Manual deliverable](./DocumentationFinalReport), so it pays to keep it organized from the start.
