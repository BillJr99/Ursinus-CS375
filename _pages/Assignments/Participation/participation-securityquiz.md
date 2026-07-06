---
layout: assignment
permalink: /Assignments/Participation/SecurityQuiz
title: "CS375: Software Engineering - Software Security Knowledge Check"


info:
  coursenum: CS375
  points: 10
  goals:
    - To recall the CIA triad and classify what a given attack violates
    - To match common vulnerabilities to their OWASP Top 10 category and their defense
    - To distinguish authentication from authorization, hashing from encryption, and encoding from encryption

tags:
  - participation
  - security

---

This is a short, low-stakes knowledge check on the [Secure Software Engineering activity](../../Activities/SoftwareSecurity), graded on a participation basis. Answer in a few sentences each; the goal is to confirm the shared vocabulary, not to trick you. You may use your notes and the linked references.

### Software Security Knowledge Check

1. **The CIA triad.** Name the three properties of the CIA triad. For each, give one concrete example of an attack that violates it.

2. **Injection.** A colleague writes `"SELECT * FROM Users WHERE name = '" + input + "'"`. What vulnerability class is this, which OWASP Top 10 category and CWE does it fall under, and what is the single most effective fix? Why is "reject any input containing an apostrophe" a weaker defense than that fix?

3. **Authentication vs. authorization.** A logged-in user sends a request to delete a note that belongs to a *different* user. Which of the two -- authentication or authorization -- should stop this, and why is it not enough that the user is logged in?

4. **JWT payloads.** A JWT payload is only Base64-encoded, so anyone holding the token can read it. (a) Why, then, can a user *not* simply edit the payload to impersonate someone else? (b) Why must you never place a password or secret inside a JWT payload?

5. **Hashing vs. encryption.** You must store user passwords and you must store a session value you will later need to read back. Which one calls for *hashing* and which for *encryption*, and why? Why is a bare `hash(password)` without a salt still weak?

6. **Secrets and supply chain.** (a) What is the risk of committing a `JWT_SECRET` or API key to a git repository, and what should you use instead? (b) In one sentence, what is a *supply-chain* vulnerability, and how does automated dependency scanning in CI help? (This course's own site fixed one -- the compromised `polyfill.io` dependency.)

7. **Threat modeling.** STRIDE stands for six threat categories. Pick any two letters, name the threat, and give an example of that threat against the note-taking service from the [MVC activity](../../Activities/MVC).

### Submission

Submit your answers as directed for participation activities (in the class notebook or as instructed). Full credit is awarded for a good-faith, complete attempt.
