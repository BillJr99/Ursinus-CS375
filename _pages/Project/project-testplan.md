---
layout: assignment
permalink: /Project/TestPlan
title: "CS375: Software Engineering - Test Plan"


info:
  coursenum: CS375
  points: 100
  goals:
    - To produce a test plan including unit tests, output tests, and user acceptance tests

  rubric:
  - weight: 10
    description: Continuous Integration
    preemerging: No continuous integration workflow is present in the project repository
    beginning: A continuous integration workflow exists but does not run the project test suite, or fails on the current main branch
    progressing: A continuous integration workflow runs the test suite on each push, and passes on the current main branch
    proficient: A continuous integration workflow runs the test suite and coverage report on each push, passes on the current main branch, and the report links to a passing run
  - weight: 35
    description: Black Box and White Box Tests
    preemerging: Unit tests (or output tests) are generally unclear, missing, or inappropriate for the project being tested
    beginning: Unit tests (or output tests) are given for each software method or component, but some boundary or erroneous inputs are missing that would result in a more robust test plan
    progressing: Unit tests (or output tests) with appropriate inputs are given for nearly all software methods or components
    proficient: Unit tests (or output tests) with appropriate inputs are given for each software method or component
  - weight: 35
    description: User Acceptance Tests
    preemerging: User acceptance test scripts are missing, unclear, or missing dependencies with respect to software requirements
    beginning: User acceptance test scripts are written for many software requirements and are cross-referenced with acceptance tests for many dependent requirements    
    progressing: User acceptance test scripts are written in a mostly non-technical voice for nearly all software requirements and are cross-referenced with acceptance tests for dependent requirements    
    proficient: User acceptance test scripts are written in a non-technical voice for all software requirements and are cross-referenced with acceptance tests for dependent requirements    
  - weight: 20
    description: Planned Test Coverage
    preemerging: Both the acceptance and software test plans are lacking in coverage
    beginning: Either the acceptance or software test plan is lacking in coverage
    progressing: "The acceptance test plan is expected to yield nearly full coverage of software requirements and the unit or output tests proposed are expected to exercise nearly 100% code coverage"    
    proficient: "The acceptance test plan is expected to yield full coverage of software requirements and the unit or output tests proposed are expected to exercise 100% code coverage"    

  readings:
    - rlink: "../files/exampledocs/NLiVE_TestPlan.pdf"
      rtitle: "Example test plan document"
    - rlink: "https://docs.github.com/en/actions/writing-workflows/about-workflows"
      rtitle: "GitHub Workflows"

tags:
  - project
  
---

For the test plan, you will create a document that lists and describes all the tests that you will perform to validate your software project.  These will become unit tests, integration or output tests, and user acceptance test scripts (that a non-technical user could follow to validate the functionality of your project).

You will develop each of these tests so that they can be performed on your software project, and the results documented in your final software report when the project is finished.

It is important that you achieve appropriate coverage for your tests.  This means that your unit tests should achieve 100% code coverage for your project, and that your tests (unit tests and acceptance tests) should cover all of your requirements.

### White Box (Unit) Testing
For each software component/method, decision branch, and line of code, ensure that a unit test exercises the program.  A good way to start is to create a set of unit tests for each method that cover each code branch and potentially erroneous or boundary input.

### Black Box (Output) Testing
Methods that are difficult to test using unit tests can be tested with output tests.  Here, you can indicate that you will run a particular portion of the program and verify its output.  It is best if these are written in a shell script.

### User Acceptance Testing
For each functional requirement, write a script that is appropriate for giving to an end user (a non-technical user) that would allow them to exercise the functional requirement.  Indicate what result they should observe if the feature executed correctly.  If the requirement depends on other requirements, you can first write the acceptance test script for those requirements, and simply refer to them by acceptance test number (for example: "Precondition: complete user acceptance test #1 to log in").

### Automation: Continuous Integration Must Pass
Create GitHub workflows to execute your suite of tests and coverage reports on each checkin, as practiced in the [CI/CD activity](../Activities/CICD).  Examples for various language platforms can be found [here](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing).

A **passing CI workflow is a requirement of this deliverable**: your repository must contain a GitHub Actions workflow that runs your test suite on every push, and that workflow must be passing (green) on your main branch at the time you submit.  Include in your report a link to (or screenshot of) a passing workflow run from the **Actions** tab of your repository.  From this point forward in the project, treat a red X on main as a stop-the-line event: fixing the build takes priority over new feature work, just as it does on a professional team.

### Website

Include your report on the project website.