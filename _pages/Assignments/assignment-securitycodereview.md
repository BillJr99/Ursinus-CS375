---
layout: assignment
permalink: /Assignments/SecurityCodeReview
title: "CS375: Software Engineering - Secure Code Review Assessment"


info:
  coursenum: CS375
  points: 100
  goals:
    - To audit a piece of code for security vulnerabilities and identify each concrete flaw
    - To classify each finding with its OWASP Top 10 category, CWE identifier, and a severity rating
    - To propose a correct, specific fix for each finding
    - To communicate the results as a clear, professional code-review report

  rubric:
  - weight: 40
    description: Vulnerability Identification (Coverage)
    preemerging: Few or no genuine vulnerabilities are identified, or reported issues are not real security flaws
    beginning: Some vulnerabilities are identified but several of the planted flaws are missed
    progressing: Most of the planted vulnerabilities are identified, with few false positives
    proficient: Nearly all planted vulnerabilities are identified with essentially no false positives, and the reviewer notes where a flaw could have further downstream impact
  - weight: 25
    description: Classification (OWASP / CWE / Severity)
    preemerging: Findings are not classified, or classifications are largely incorrect
    beginning: Some findings carry an OWASP or CWE label, but categories or severities are frequently wrong
    progressing: Most findings are correctly mapped to an OWASP category and CWE with a reasonable severity
    proficient: Each finding is correctly mapped to its OWASP category and CWE, with a justified severity (e.g., a CVSS-style rationale) reflecting real impact
  - weight: 25
    description: Proposed Fixes
    preemerging: Fixes are missing or would not resolve the vulnerability
    beginning: Fixes are suggested but are vague, incomplete, or address symptoms rather than the root cause
    progressing: Each significant finding has a specific fix that addresses the root cause
    proficient: Each finding has a specific, correct fix addressing the root cause, and the reviewer notes when a defense-in-depth measure or a test should accompany it
  - weight: 10
    description: Report Clarity and Professionalism
    preemerging: The report is disorganized or a reader cannot act on it
    beginning: The report lists findings but is hard to follow or inconsistent
    progressing: The report is well organized, with one clear entry per finding
    proficient: The report is clear and professional, prioritizes findings by severity, and a developer could remediate directly from it

  readings:
    - rlink: "https://owasp.org/www-project-top-ten/"
      rtitle: "OWASP Top 10"
    - rlink: "https://cwe.mitre.org/"
      rtitle: "Common Weakness Enumeration (CWE) by MITRE"
    - rlink: "https://www.first.org/cvss/calculator/3.1"
      rtitle: "CVSS v3.1 Calculator by FIRST"

tags:
  - security
  - assessment

---

In this assessment you play the role of a security reviewer. Below is a small Node/Express login-and-notes handler, in the same style as the [JWT/MVC example](../Activities/MVC) and the [databases activity](../Activities/Cloud5) you studied. It contains **several deliberately planted vulnerabilities**. Your job is to find them, classify them, and propose fixes -- exactly the skill you would apply reviewing a teammate's pull request.

### The Code Under Review

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const app = express();
app.use(express.json());

const JWT_SECRET = "s3cr3t-do-not-share";   // (1)

// Log a user in
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM Users WHERE name = '" + username +
            "' AND password = '" + password + "'";        // (2)
  db.query(q, (err, rows) => {
    if (err) return res.status(500).send(err.stack);       // (3)
    if (rows.length === 0) return res.status(401).send('bad login');
    const token = jwt.sign({ sub: rows[0].id, role: rows[0].role }, JWT_SECRET);  // (4)
    res.json({ token });
  });
});

// Read a note by id
app.get('/notes/:id', (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token);                          // (5)
  db.query("SELECT * FROM Notes WHERE id = ?", [req.params.id], (err, rows) => {
    const note = rows[0];
    res.send('<h1>' + note.title + '</h1><p>' + note.body + '</p>');  // (6) (7)
  });
});

app.listen(3000);
```

### What to Do

Write a **secure code-review report**. For **each** vulnerability you find, provide an entry with:

1. **Location** -- the line or numbered marker, and a one-line description of the flaw.
2. **Classification** -- the [OWASP Top 10](https://owasp.org/www-project-top-ten/) category and the [CWE](https://cwe.mitre.org/) identifier.
3. **Severity** -- low / medium / high / critical, with a one-sentence justification (a [CVSS](https://www.first.org/cvss/calculator/3.1)-style rationale is welcome).
4. **Impact** -- what an attacker could actually do, in terms of the CIA triad.
5. **Fix** -- a specific, root-cause remediation (show corrected code where helpful), and note any test or defense-in-depth measure that should accompany it.

Prioritize your report by severity (most serious first). There are more than three issues here; aim for thorough coverage, and do not pad your report with false positives -- accuracy counts as much as coverage.

### Submission

Submit your report (Markdown or PDF) as directed. This assessment is graded with the rubric above; note that identification, correct classification, and correct fixes are weighted separately, so a finding you cannot classify or fix is worth partial, not full, credit -- just as in a real review.
