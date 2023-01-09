---
layout: assignment
permalink: /Assignments/FSM
title: "CS475: Computer Networks - Finite State Machine"
excerpt: "CS475: Computer Networks - Finite State Machine"

info:
  coursenum: CS475
  points: 100
  goals:
    - To implement a finite state machine as a loop with a conditional
    - To relate state machines to network protocols
  rubric:
    - weight: 60
      description: Algorithm Implementation
      preemerging: The algorithm fails on the test inputs due to major issues, or the program fails to compile and/or run
      beginning: The algorithm fails on the test inputs due to one or more minor issues
      progressing: The algorithm is implemented to solve the problem correctly according to given test inputs, but would fail if executed in a general case due to a minor issue or omission in the algorithm design or implementation
      proficient: A reasonable algorithm is implemented to solve the problem which correctly solves the problem according to the given test inputs, and would be reasonably expected to solve the problem in the general case
    - weight: 30
      description: Code Quality and Documentation
      preemerging: Code commenting and structure are absent, or code structure departs significantly from best practice, and/or the code departs significantly from the style guide
      beginning: Code commenting and structure is limited in ways that reduce the readability of the program, and/or there are minor departures from the style guide
      progressing: Code documentation is present that re-states the explicit code definitions, and/or code is written that mostly adheres to the style guide
      proficient: Code is documented at non-trivial points in a manner that enhances the readability of the program, and code is written according to the style guide
    - weight: 10
      description: Writeup and Submission
      preemerging: An incomplete submission is provided
      beginning: The program is submitted, but not according to the directions in one or more ways (for example, because it is lacking a readme writeup)
      progressing: The program is submitted according to the directions with a minor omission or correction needed
      proficient: The program is submitted according to the directions, including a readme writeup describing the solution        
      
tags:
  - automata
  - programming
  
---

Write a program that asks the user to type either a letter `A` or a letter `B`, in a loop.  They may type any other letter when finished.   You are to determine whether the number of `A` and `B` characters entered are each odd (for example, 1 `A` and 3 `B` characters).  However, you may not count the characters directly.  Instead, you have a single variable called `state` which you may set to an integer from `0` through `3`.  Here are the rules for this variable:

* Let `0` represent that the number of `A` and `B` characters are each even.  
* Let `1` represent that the number of `A` characters is odd while the number of `B` characters is even.  
* Let `2` represent that the number of `A` characters is even while the number of `B` characters is odd.  
* Let `3` represent that the number of `A` and `B` characters are each even.  

Implement this program with a loop and a conditional that checks the input character and the current state value, setting the new state value appropriately each time through the loop.

When finished, draw a diagram representing these states, and from each state, draw an arrow labeled `A` and one labeled `B` to the appropriate next state that you wrote in your program.