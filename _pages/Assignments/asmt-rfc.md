---
layout: assignment
permalink: /Assignments/RFC
title: "CS475: Computer Networks - Introduction to the RFC"
excerpt: "CS475: Computer Networks - Introduction to the RFC"

info:
  coursenum: CS475
  points: 100
  goals:
    - To explain the basic components of an RFC
      
tags:
  - rfc
  
---

## The RFC

Review the following standard Request for Comments (RFC) documents, which describe the message formats and workflow of protocols.

* FTP: [RFC 959](https://tools.ietf.org/html/rfc959) 
* DNS [RFC 1034](https://tools.ietf.org/html/rfc1034) 
* HTTP 1.1: [RFC 2616](https://tools.ietf.org/html/rfc2616) 
* SMTP: [RFC 2821](https://tools.ietf.org/html/rfc2821) 
* XMPP: [RFC 3920](https://tools.ietf.org/html/rfc3920) 
* SSH: [RFC 4250](https://tools.ietf.org/html/rfc4250)

Describe, in your own words, what an RFC is.  What are the major components common to each RFC, and what do you notice about their structure?  How do RFC documents differentiate between what an implementing program *must* do, and what a program can optionally do? If an implementing program handles a protocol concept in an optional but non-standard way, what are the risks?

This spoof [RFC 2324](https://tools.ietf.org/html/rfc2324) describes an HTTP-like protocol for controlling a cofee pot, and is a great place to start when reading about the types of standards proposed by an RFC.

## Designing a Protocol

Imagine that the course registration process did not involve using a computer to sign up for classes using a web-page.  Instead, you called the Registrar on the telephone, and let them know which classes you wished to take.  In turn, the Registrar would inform you if you are able to take those classes, and, if so, would register you for those classes and confirm your schedule.

The Registrar wishes to do this as efficiently as possible, and so students would ask standardized questions (in other words, every student conversation should be exactly the same).  

1. What questions and answers might you ask of the Registrar to learn about course availability and to register for classes?
2. What errors might you anticipate (as an example, a class might be full), and what messages should be sent back and forth to note the different types of errors?
3. Diagram a **flow chart** that allows a student to register for a course, learn whether their registration was successful, and continue registering for courses, one-by-one, until the registration process is complete.  Each arrow connecting the states in your flow chart should represent a message sent or received.  Each message should have an opcode (a unique number), followed by more information in whatever format you choose (more numeric codes, text, or a combination of the two).  Write down the format you chose for your messages!