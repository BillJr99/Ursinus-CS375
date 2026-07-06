---
layout: assignment
permalink: /Assignments/SecurityCapstone
title: "CS375: Software Engineering - Cybersecurity Capstone: Secure Your System End to End"


info:
  coursenum: CS375
  points: 100
  goals:
    - To produce a complete STRIDE threat model of a software system, supported by a data-flow diagram
    - To integrate automated static analysis and dependency scanning into a continuous integration pipeline that must pass on the main branch
    - To conduct a penetration test following a documented, repeatable methodology and to rate findings by severity using CVSS
    - To build a security regression test suite of abuse cases that prevents fixed vulnerabilities from returning
    - To remediate discovered vulnerabilities and report the engagement in a professional format validated against the OWASP Application Security Verification Standard (ASVS)

  rubric:
  - weight: 20
    description: Threat Model and Data-Flow Diagram
    preemerging: No threat model is provided, or it is a list of generic risks not tied to the system
    beginning: A partial threat model is provided but lacks a data-flow diagram or applies STRIDE to only part of the system
    progressing: A data-flow diagram identifies trust boundaries, and STRIDE is applied to the major components with plausible threats and mitigations
    proficient: A clear data-flow diagram marks every trust boundary, STRIDE is applied systematically to each element and data flow, threats are prioritized, and each carries a mapped mitigation (OWASP/CWE) and a link to where it is (or will be) addressed
  - weight: 20
    description: Automated Scanning in CI (Static Analysis and Dependencies)
    preemerging: No automated security scanning is present in the pipeline
    beginning: A scanner (CodeQL, Semgrep, or dependency review) is configured but does not run on push or is failing on the main branch
    progressing: Static analysis and dependency scanning run on each push and pass on the main branch, with findings triaged
    proficient: Static analysis and dependency scanning both run on each push, gate the pipeline, pass on the main branch with a linked run, and the report explains how triaged findings were resolved or justified as accepted risk
  - weight: 25
    description: Penetration Test Methodology and Findings
    preemerging: No penetration testing was performed, or testing is undocumented and not reproducible
    beginning: Some testing was performed but without a stated methodology, or findings lack evidence or severity ratings
    progressing: Testing follows a documented methodology (OWASP Testing Guide or PTES), and each finding has evidence, a CVSS severity, and reproduction steps
    proficient: Testing follows a documented methodology with defined scope and rules of engagement, and each finding has evidence, reproduction steps, a CVSS vector and score, and an assessed impact tied to the CIA triad
  - weight: 20
    description: Remediation and Security Regression Tests
    preemerging: Findings were not remediated and no security tests were added
    beginning: Some findings were remediated but without tests, or abuse-case tests exist but do not cover the findings
    progressing: The significant findings are remediated and each is covered by an abuse-case regression test that fails before the fix and passes after
    proficient: Findings are remediated by severity order, each is covered by an abuse-case regression test wired into CI, and the report demonstrates the before/after (failing then passing) for each
  - weight: 15
    description: Security Report and ASVS Validation
    preemerging: No report, or the report does not follow a recognizable professional structure
    beginning: A report exists but omits key sections (scope, methodology, findings, remediation) or does not reference ASVS
    progressing: The report follows a professional structure and maps the system against a chosen OWASP ASVS level
    proficient: The report follows a professional pentest structure with an executive summary and technical detail, maps the system against a justified ASVS level with per-requirement pass/fail, and states residual risk and next steps

  readings:
    - rlink: "https://owasp.org/www-project-web-security-testing-guide/"
      rtitle: "OWASP Web Security Testing Guide"
    - rlink: "https://owasp.org/www-project-application-security-verification-standard/"
      rtitle: "OWASP Application Security Verification Standard (ASVS)"
    - rlink: "http://www.pentest-standard.org/index.php/Main_Page"
      rtitle: "Penetration Testing Execution Standard (PTES)"
    - rlink: "https://codeql.github.com/"
      rtitle: "CodeQL by GitHub"
    - rlink: "https://semgrep.dev/docs/"
      rtitle: "Semgrep Documentation"
    - rlink: "https://www.first.org/cvss/"
      rtitle: "Common Vulnerability Scoring System (CVSS) by FIRST"
    - rlink: "https://attack.mitre.org/"
      rtitle: "MITRE ATT&CK"

tags:
  - security
  - capstone

---

This capstone is for students who want to specialize in cybersecurity. It takes the four-fix [Securing Your Software](./Security) assignment and turns it into a complete, professional security engagement against your team project (or, with the instructor's approval, against a designated target such as [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)). You will threat-model the whole system, automate security scanning in your pipeline, run a methodical penetration test, remediate what you find, and report it the way a professional security team would.

Treat this as if you were hired to assess the system. Everything you claim should be **reproducible** by the reader from your report.

### 1. Threat Model (Design)

Produce a **data-flow diagram** of your system that marks every **trust boundary** (where data crosses from less-trusted to more-trusted, e.g. browser → server, server → database). Then apply [STRIDE](../Activities/SoftwareSecurity) systematically to each element and data flow. For every plausible threat, record the property it violates (CIA), a mapped mitigation with its OWASP category and/or CWE, and where in the system it is addressed. A free tool such as [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) is ideal for the diagram.

### 2. Automate Security in CI (Deployment)

Extend the continuous integration workflow you built in the [CI/CD activity](../Activities/CICD) and required for your [Test Plan](../Project/TestPlan) so that, on every push, it runs:

* **Static application security testing (SAST)** -- [CodeQL](https://codeql.github.com/) or [Semgrep](https://semgrep.dev/docs/) -- to find vulnerable code patterns.
* **Dependency / supply-chain scanning** -- Dependabot, `npm audit`, or GitHub dependency review -- to catch components with known CVEs (recall the real `polyfill.io` supply-chain incident in this course's own history).

These checks must **pass (green) on your main branch**, and your report must link to a passing run. Triage every finding: fix it, or justify it as accepted risk with a reason.

### 3. Penetration Test (Verification)

Conduct a penetration test following a **documented methodology** -- the [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) or the [PTES](http://www.pentest-standard.org/index.php/Main_Page). Define and state your **scope** and **rules of engagement** first (only test systems you are authorized to test). For each finding, record:

* reproduction steps and evidence (request/response, screenshot, or script);
* the vulnerability class (OWASP/CWE);
* a [CVSS](https://www.first.org/cvss/) vector and score;
* the impact, expressed in terms of the CIA triad.

Practicing against a deliberately vulnerable app first -- [WebGoat](https://owasp.org/www-project-webgoat/) or [Juice Shop](https://owasp.org/www-project-juice-shop/) -- is a good way to build technique before testing your own system.

### 4. Remediate and Add Abuse-Case Tests

Remediate findings in **severity order** (highest CVSS first). For each remediated finding, add an **abuse-case regression test** -- a test of what must *not* be allowed (e.g., "an unauthenticated request receives `401`", "user Bob cannot read user Alice's note", "a 10 MB note is rejected"). Each test should **fail before** your fix and **pass after**, and it should run in CI so the vulnerability cannot silently return. These extend the layered test matrix from the [testing activity](../Activities/TestingCodeCoverage) with a security lens.

### 5. Security Report (with ASVS Validation)

Write a professional security report containing:

* an **executive summary** (non-technical: what you assessed, the headline risks, and their business/user impact);
* **scope, methodology, and rules of engagement**;
* **findings**, each with evidence, CWE, CVSS, and remediation status;
* an **ASVS validation**: choose an appropriate level of the [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/), justify the level, and record pass/fail against its requirements for your system;
* **residual risk and next steps.**

### Deliverable

Submit the report, the threat-model diagram, and links to your passing CI run and your abuse-case tests, all in your project repository and linked from your project website. As with all professional security work, ensure everything is reproducible from your documentation, and only ever test systems you are authorized to test.
