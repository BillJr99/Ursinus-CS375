---
layout: assignment
permalink: /Assignments/Security
title: "CS375: Software Engineering - Securing Your Software"


info:
  coursenum: CS375
  points: 100
  goals:
    - To identify and remediate a vulnerable dependency in your project using automated tooling
    - To find and fix an injection-class vulnerability using a parameterized query
    - To add an access-control check so that a user can only act on their own resources
    - To remove a hardcoded secret from source control and load it from the environment instead
    - To document each fix as a clear before/after so that a reviewer can verify the improvement

  rubric:
  - weight: 20
    description: Dependency Remediation (OWASP A06)
    preemerging: No dependency scan was run, or no evidence of scanning is provided
    beginning: A dependency scan (Dependabot, npm audit, or equivalent) was run and its output is included, but no flagged dependency was remediated
    progressing: A dependency scan was run and at least one flagged dependency was updated or replaced, with the advisory referenced
    proficient: A dependency scan was run, at least one flagged dependency was remediated with the CVE/advisory and severity cited, and the project still builds and passes its tests after the change
  - weight: 25
    description: Injection Fix (OWASP A03)
    preemerging: No injection-class issue is identified or the change does not address one
    beginning: An injection-class issue is identified but the fix is incomplete or still concatenates untrusted input into executable code
    progressing: One injection-class issue is fixed by parameterizing the query (or equivalent encoding/escaping), with a brief explanation of the root cause
    proficient: One injection-class issue is fixed with a parameterized query (or appropriate output encoding), the root cause is explained, and the writeup notes why input validation alone would be insufficient
  - weight: 25
    description: Access-Control Fix (OWASP A01)
    preemerging: No authorization concern is identified or addressed
    beginning: An authorization concern is identified but the added check is missing, incorrect, or enforced in the wrong layer
    progressing: An ownership/authorization check is added so a user can only act on their own resources, enforced in an appropriate layer
    proficient: An ownership/authorization check is added and enforced in the correct layer, distinguishes authentication from authorization in the writeup, and is covered by a test demonstrating that another user is denied
  - weight: 20
    description: Secrets Management (OWASP A02/A05)
    preemerging: A secret remains hardcoded in source, or no secret handling is addressed
    beginning: A hardcoded secret is identified but is not fully removed from source or from version-control history
    progressing: A hardcoded secret is moved to an environment variable or secrets store and excluded via .gitignore
    proficient: A hardcoded secret is moved out of source, excluded from version control, loaded from the environment (or CI secrets), and the writeup explains the risk of committing secrets and what to do if one is leaked
  - weight: 10
    description: Before/After Writeup
    preemerging: No writeup, or the writeup does not let a reviewer understand what changed
    beginning: The writeup lists changes but without clear before/after evidence
    progressing: Each fix has a clear before/after (code snippet, screenshot, or diff) that a reviewer can follow
    proficient: Each fix has a clear before/after with the vulnerability category (OWASP/CWE) named, and the writeup connects each fix to a threat from your STRIDE model

  readings:
    - rlink: "https://owasp.org/www-project-top-ten/"
      rtitle: "OWASP Top 10"
    - rlink: "https://cheatsheetseries.owasp.org/"
      rtitle: "OWASP Cheat Sheet Series"
    - rlink: "https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts"
      rtitle: "About Dependabot alerts by GitHub"
    - rlink: "https://cwe.mitre.org/"
      rtitle: "Common Weakness Enumeration (CWE) by MITRE"

tags:
  - security

---

In this assignment, you will make four concrete security improvements to your team project. Each one corresponds to a category from the [OWASP Top 10](https://owasp.org/www-project-top-ten/) and to a defense you practiced in the [Secure Software Engineering activity](../Activities/SoftwareSecurity). The point is not to make your project "perfectly secure" -- no software is -- but to practice reaching for the right defense deliberately, and to document your work so a reviewer can verify it.

If your project genuinely does not contain one of these vulnerability classes (for example, it has no database), you may instead **introduce** a small, clearly-labeled example in a branch and fix it there, or apply the fix to one of the course's example projects (the [databases example](../Activities/Cloud5) or the [JWT/MVC example](../Activities/MVC)). State clearly in your writeup which approach you took.

### What to Do

For each of the four tasks below, capture a **before/after**: a short code snippet, a diff, or a screenshot showing the vulnerable state and the fixed state.

1. **Remediate a vulnerable dependency (OWASP A06).** Enable [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) on your repository, or run `npm audit` (or your language's equivalent, such as `pip-audit` or `mvn dependency-check`). Pick one flagged dependency, update or replace it, and confirm your project still builds and its tests still pass. In your writeup, cite the advisory (CVE) and its severity. Recall the real supply-chain incident described in the activity: this course's own website had to replace a compromised `polyfill.io` dependency.

2. **Fix an injection vulnerability (OWASP A03).** Find a place where untrusted input is concatenated into a query or command, and convert it to a **parameterized query** (prepared statement), as practiced in the [databases activity](../Activities/Cloud5). Explain the root cause in one or two sentences, and note why simply rejecting suspicious characters (input validation alone) is a fragile defense compared to parameterization.

3. **Add an access-control check (OWASP A01).** Find a route or action where a logged-in user could act on a resource they do not own (the classic example from the [MVC activity](../Activities/MVC): deleting or reading *someone else's* note). Add an **ownership/authorization** check in the appropriate layer. In your writeup, distinguish *authentication* (who you are) from *authorization* (what you may do). Add a test showing that a different user is denied.

4. **Remove a hardcoded secret (OWASP A02/A05).** Find a secret in your source -- an API key, a database password, or a `JWT_SECRET` like the one in the MVC example -- and move it to an environment variable (a `.env` file, excluded via `.gitignore`) or to your CI's secrets store (GitHub Actions `secrets.*`, as used in the [CI/CD activity](../Activities/CICD)). Explain the risk of committing a secret to a repository ([CWE-798](https://cwe.mitre.org/data/definitions/798.html)) and what you would do if a secret were leaked.

### Deliverable

Submit a short report (in your project repository, linked from your project website) with the four before/after entries. For each, name the OWASP category and, where you can, the CWE identifier, and connect the fix to a threat from the STRIDE threat model you built in the activity. Ensure your project still builds and its test suite (including any new test from task 3) passes.

### Going Further

Students specializing in cybersecurity can extend this work into a full, professional security engagement in the [Security Capstone](./SecurityCapstone): a complete STRIDE threat model, automated static analysis and dependency scanning wired into CI, a methodology-driven penetration test, and a security report validated against the OWASP Application Security Verification Standard.
