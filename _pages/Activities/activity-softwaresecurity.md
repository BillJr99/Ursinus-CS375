---
layout: activity
permalink: /Activities/SoftwareSecurity
title: "CS375: Software Engineering - Secure Software Engineering"


info:
  goals:
    - To define the CIA triad (confidentiality, integrity, and availability) and use it to describe what a given attack violates
    - To explain why security is a lifecycle concern woven through requirements, design, coding, testing, and deployment, rather than a feature bolted on at the end
    - To recognize common OWASP Top 10 vulnerability categories (injection, broken access control, cryptographic failures, and vulnerable dependencies) in real code
    - To apply core secure-coding defenses: input validation, parameterized queries, output encoding, least privilege, and keeping secrets out of source control
    - To perform a lightweight STRIDE threat model of a small web service and propose a mitigation for each identified threat
    - "To read a CVE/CWE identifier and a dependency advisory, and to explain how automated scanning (dependency review, static analysis) can be integrated into a CI pipeline"

  models:
    - model: |
        <div align="center">
        <table>
        <thead><tr><th>Property</th><th>Plain-English question</th><th>Example of a violation</th></tr></thead>
        <tbody>
        <tr><td><strong>Confidentiality</strong></td><td>Can only the right people <em>read</em> this?</td><td>Another user reads your private notes; a password database is leaked.</td></tr>
        <tr><td><strong>Integrity</strong></td><td>Can only the right people <em>change</em> this, and can we detect tampering?</td><td>A student edits a grade in the database; a JWT payload is forged.</td></tr>
        <tr><td><strong>Availability</strong></td><td>Is the system <em>up and usable</em> when needed?</td><td>A flood of requests takes the service offline during finals.</td></tr>
        </tbody>
        </table>
        </div>
      title: "The CIA Triad: Thinking Like an Attacker"
      questions:
        - "For each row, name a feature in a system you have built (in this class or elsewhere) that depends on that property.  What would go wrong for a real user if it failed?"
        - "A developer says, &quot;our app has no login, so it has no security requirements.&quot;  Using the three properties above, give a concrete counterexample -- something an attacker could still violate."
        - "Security is often framed as <em>reducing the attacker's options</em> rather than achieving perfect safety.  Why is &quot;100% secure&quot; an unrealistic goal, and how is this similar to the argument in the <a href=\"./TestingCodeCoverage\">testing activity</a> that you cannot test every possible input?"
        - "Recall the <a href=\"./EthicalCaseTherac25\">Therac-25 case study</a>.  Which leg(s) of the CIA triad did its failures most violate, and how does that connect security to <em>safety</em> and professional ethics?"
    - model: |
        <div align="left">
        <p>The classic (broken) way to build a query by pasting user input directly into a SQL string:</p>
        <pre><code>// UNSAFE: username comes straight from a web form
        const q = "SELECT * FROM Users WHERE name = '" + username + "'";
        db.query(q);
        </code></pre>
        <p>If a user types <code>name</code> as <code>'; DROP TABLE Students;--</code>, the string the database actually runs is no longer the query you intended.</p>
        <img src="https://imgs.xkcd.com/comics/exploits_of_a_mom.png" alt="XKCD Exploits of a Mom (Little Bobby Tables)">
        <p>The fix is a <strong>parameterized query</strong> (also called a prepared statement), where user input is sent as data, never as executable code:</p>
        <pre><code>// SAFE: the ? is a placeholder; the driver keeps username as data
        db.query("SELECT * FROM Users WHERE name = ?", [username]);
        </code></pre>
        </div>
      title: "Injection: The Little Bobby Tables Problem (OWASP A03)"
      questions:
        - "In your own words, what is the root cause of an injection vulnerability?  What did the unsafe code <em>confuse</em> that the safe code keeps separate?"
        - "You saw this exact XKCD comic and the node.js fix in the <a href=\"./Cloud5\">databases activity</a>.  Injection is not only SQL: name one other place user input becomes executable (hint: rendering a note that contains <code>&lt;script&gt;</code> in the <a href=\"./TestingCodeCoverage\">view-testing example</a>).  What is the analogous defense there?"
        - "&quot;Validate input&quot; and &quot;parameterize the query&quot; are two different defenses.  Which one actually stops the attack above, and why is input validation alone (for example, rejecting apostrophes) a fragile way to prevent injection?"
        - "This category is <a href=\"https://owasp.org/Top10/A03_2021-Injection/\">OWASP A03: Injection</a> and maps to <a href=\"https://cwe.mitre.org/data/definitions/89.html\">CWE-89 (SQL Injection)</a>.  Why is it useful for a team to refer to a shared catalog like OWASP or CWE instead of everyone inventing their own names for bugs?"
    - model: |
        <div align="left">
        <p>A JSON Web Token (JWT) has three parts.  The payload is <strong>readable by anyone</strong> who has the token -- it is only Base64-encoded, not encrypted:</p>
        <pre><code>header.payload.signature
        // payload (decoded): {"sub": 1, "username": "alice", "exp": 1699999999}
        </code></pre>
        <p>The server's <code>requireAuth</code> middleware calls <code>jwt.verify(token, SECRET)</code>, which recomputes the signature with a secret only the server knows.  A forged or edited token fails verification and the request is rejected with <code>401</code> before any controller runs.</p>
        </div>
      title: "Broken Authentication and Access Control (OWASP A01/A07)"
      questions:
        - "You traced this exact handshake in the <a href=\"./MVC\">MVC activity</a>.  If the payload is readable and editable by anyone, what stops a user from changing <code>&quot;sub&quot;: 1</code> to <code>&quot;sub&quot;: 2</code> and impersonating another user?"
        - "<strong>Authentication</strong> (who are you?) and <strong>authorization</strong> (what are you allowed to do?) are different.  In the &quot;delete only your <em>own</em> notes&quot; exercise from the MVC activity, a valid logged-in user could still try to delete someone else's note.  Which check prevents this, and which layer should enforce it?"
        - "Broken access control is <a href=\"https://owasp.org/Top10/A01_2021-Broken_Access_Control/\">OWASP A01</a> -- the <em>most</em> common category in the 2021 Top 10.  Why do you think &quot;forgot to check whether this user owns this resource&quot; is so easy to get wrong, especially as a team adds new routes over a semester?"
        - "Why is it a good security property that an unauthenticated request is rejected at the <em>middleware</em>, so the controller and model layers never even run?  Connect this to the idea of <em>least privilege</em> and to <em>failing closed</em>."
    - model: |
        <div align="left">
        <p>From the <a href="../Assignments/git">git assignment</a>: you generate a key <em>pair</em>.  Data encrypted with your <strong>public</strong> key can only be decrypted with your <strong>private</strong> key, and a <strong>digital signature</strong> made with your private key can be verified by anyone holding your public key -- proving <em>you</em> produced it (integrity + authenticity).</p>
        <p>Two ideas people often confuse:</p>
        <ul>
        <li><strong>Hashing</strong> (e.g. storing passwords): a one-way function.  You never &quot;un-hash.&quot;  You store <code>hash(password + salt)</code> and re-hash on login to compare.</li>
        <li><strong>Encryption</strong>: two-way.  You encrypt so an authorized party can later decrypt.</li>
        </ul>
        </div>
      title: "Secrets, Hashing, and Signatures (OWASP A02: Cryptographic Failures)"
      questions:
        - "&quot;Treat your private key like a password&quot; (from the git assignment).  Why should a password be <em>hashed</em> (one-way) in your database, but a session's data sometimes <em>encrypted</em> (two-way)?  Which one is appropriate for storing user passwords, and why is plain <code>hash(password)</code> without a salt still weak?"
        - "The <code>JWT_SECRET</code> from the MVC example, a database password, and an API key are all <em>secrets</em>.  What goes wrong if one is committed to a public git repository?  (This is <a href=\"https://cwe.mitre.org/data/definitions/798.html\">CWE-798, Hardcoded Credentials</a>.)  How do <code>.env</code> files, <code>.gitignore</code>, and GitHub Actions <code>secrets.*</code> help?"
        - "Encoding, hashing, and encryption are three different things people call &quot;encryption.&quot;  The JWT payload is only <em>encoded</em> (Base64).  Why does that mean you must <strong>never</strong> put a password or secret in a JWT payload?"
    - model: |
        <div align="left">
        <p><strong>STRIDE</strong> is a checklist for finding threats.  Walk your design and, for each part, ask whether each threat applies:</p>
        <table>
        <thead><tr><th>Letter</th><th>Threat</th><th>Violates</th><th>Example on the note-taking service</th></tr></thead>
        <tbody>
        <tr><td>S</td><td>Spoofing (pretending to be someone)</td><td>Authenticity</td><td>Forging a JWT to act as another user</td></tr>
        <tr><td>T</td><td>Tampering (unauthorized change)</td><td>Integrity</td><td>Editing another user's note via a missing ownership check</td></tr>
        <tr><td>R</td><td>Repudiation (&quot;I didn't do that&quot;)</td><td>Non-repudiation</td><td>No audit log of who deleted a note</td></tr>
        <tr><td>I</td><td>Information disclosure</td><td>Confidentiality</td><td>An error message leaks a stack trace or another user's data</td></tr>
        <tr><td>D</td><td>Denial of service</td><td>Availability</td><td>A giant note payload exhausts memory</td></tr>
        <tr><td>E</td><td>Elevation of privilege</td><td>Authorization</td><td>A normal user reaches an admin-only route</td></tr>
        </tbody>
        </table>
        </div>
      title: "STRIDE Threat Modeling"
      questions:
        - "Pick one <strong>functional requirement</strong> from your team project.  Walk the six STRIDE letters against it and write down at least three plausible threats.  You do not need three for every letter -- some will not apply, and saying <em>why</em> is part of the exercise."
        - "For each threat you found, propose one mitigation.  Notice how many map back to defenses you already know: parameterized queries, an ownership check, input size limits, hashing, a log entry.  Threat modeling mostly <em>organizes</em> defenses you have already met."
        - "Threat modeling is cheapest during <strong>design</strong> -- the same lesson as the cost-of-change curve you saw with requirements.  Give one reason a threat found on a whiteboard during design is far cheaper to fix than the same threat found by an attacker in production."

  additional_reading:
    - link: https://owasp.org/www-project-top-ten/
      title: "OWASP Top 10 (the industry-standard list of the most critical web application security risks)"
    - link: https://cheatsheetseries.owasp.org/
      title: "OWASP Cheat Sheet Series (concise, practical defenses per topic)"
    - link: https://csrc.nist.gov/pubs/sp/800/218/final
      title: "NIST SP 800-218: Secure Software Development Framework (SSDF) by Murugiah Souppaya, Karen Scarfone, and Donna Dodson"
    - link: https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html
      title: "CWE/SANS Top 25 Most Dangerous Software Weaknesses"
    - link: https://attack.mitre.org/
      title: "MITRE ATT&CK (a knowledge base of real-world adversary tactics and techniques)"
    - link: https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats
      title: "STRIDE Threat Categories by Microsoft"
    - link: https://owasp.org/www-project-threat-dragon/
      title: "OWASP Threat Dragon (a free threat-modeling diagram tool)"
    - link: https://nvd.nist.gov/vuln
      title: "National Vulnerability Database (NVD): searchable catalog of CVEs"
    - link: https://owasp.org/www-project-webgoat/
      title: "OWASP WebGoat: a deliberately insecure app for hands-on practice"
    - link: https://owasp.org/www-project-juice-shop/
      title: "OWASP Juice Shop: a modern deliberately insecure web app for practicing found vulnerabilities"

tags:
  - security
  - owasp
  - threatmodeling

---

## Security Is Not a Feature You Add at the End

It is tempting to picture security as a lock you install on the door once the house is built: finish the app, then "make it secure." Real software does not work that way. A missing ownership check is a *design* decision; a password stored in plaintext is a *coding* decision; a dependency with a known vulnerability is a *deployment* decision. Each of these lives in a different phase of the lifecycle you have studied all semester, which is exactly why professional frameworks like the [NIST Secure Software Development Framework (SSDF)](https://csrc.nist.gov/pubs/sp/800/218/final) describe security practices for **every** phase, from requirements through response.

This module is a tour, not an encyclopedia. The goal is to give you a shared vocabulary (the [CIA triad](#the-cia-triad-thinking-like-an-attacker), the [OWASP Top 10](https://owasp.org/www-project-top-ten/), STRIDE) and to show you that most of the concrete defenses are things this course has **already** taught you in other contexts. You have written parameterized queries, verified JWTs, generated key pairs, and escaped HTML in a view test. Here we name those defenses, connect them to the vulnerabilities they stop, and organize them into a repeatable practice.

## The OWASP Top 10, Mapped to Defenses You Already Know

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is the industry's shared, evidence-based list of the most critical web application risks. You do not need to memorize it, but you should be able to recognize the big categories and, more importantly, name the defense for each. Several of these you have met already in CS375:

| OWASP category (2021) | What it is | A defense you already practiced |
|---|---|---|
| **A01: Broken Access Control** | A logged-in user does something they should not be allowed to do | The "delete only your *own* notes" ownership check from the [MVC activity](./MVC) |
| **A02: Cryptographic Failures** | Sensitive data exposed through weak or missing crypto | Public/private keys and digital signatures from the [git assignment](../Assignments/git); hashing passwords with a salt |
| **A03: Injection** | Untrusted input is executed as code (SQL, HTML/XSS, shell) | Parameterized queries from the [databases activity](./Cloud5); escaping `<script>` in the [view test](./TestingCodeCoverage) |
| **A05: Security Misconfiguration** | Insecure defaults, verbose errors, secrets in the repo | Keeping `JWT_SECRET` in `.env` / GitHub Actions `secrets.*`, not in source |
| **A06: Vulnerable and Outdated Components** | Using a dependency with a known CVE | Dependency review in [CI](./CICD); see the supply-chain note below |
| **A07: Identification and Authentication Failures** | Weak login, forgeable sessions | `jwt.verify` rejecting forged tokens in the [MVC activity](./MVC) |

The lesson of this table is the through-line of the whole module: **you are not starting security from zero.** You are organizing and naming defenses you have already used, and learning to reach for them *deliberately* instead of by accident.

## Supply-Chain Security Is Real, and It Happened Here

Category **A06 (Vulnerable and Outdated Components)** can feel abstract until it happens to a project you depend on. It happened to *this course website*. If you look at this repository's git history, you will find a commit titled **"replace compromised polyfill.io with Cloudflare cdnjs mirror."** In 2024, the widely used `polyfill.io` script service was taken over and began serving malicious code to every site that embedded it. The fix was to stop trusting the compromised source and point at a reputable mirror instead.

That is a **supply-chain attack**: you wrote no vulnerable code, but you *included* someone else's, and their compromise became yours. This is why modern CI pipelines run **dependency review** (for example, [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) and `npm audit`), which check your dependencies against the [National Vulnerability Database](https://nvd.nist.gov/vuln) on every push -- exactly the kind of automated gate you built in the [CI/CD activity](./CICD).

## Reading a Vulnerability: CVE, CWE, and CVSS

Three acronyms show up constantly, and they answer three different questions:

* A **CWE** (Common Weakness Enumeration) names a *class* of bug. "SQL injection" is [CWE-89](https://cwe.mitre.org/data/definitions/89.html); "hardcoded credentials" is [CWE-798](https://cwe.mitre.org/data/definitions/798.html). It is the shared vocabulary a team uses so that "we have an injection bug" means the same thing to everyone.
* A **CVE** (Common Vulnerabilities and Exposures) names a *specific* vulnerability in a *specific* product, e.g. "CVE-2021-44228" (Log4Shell). CVEs live in the [NVD](https://nvd.nist.gov/vuln).
* A **CVSS** (Common Vulnerability Scoring System) score, from 0.0 to 10.0, rates *how bad* a given CVE is, so a team can triage what to fix first. It is maintained by [FIRST](https://www.first.org/cvss/).

When Dependabot opens a pull request that says "bump library X: fixes CVE-2023-1234 (CWE-79, CVSS 7.5)," you now have the vocabulary to read it: a specific vulnerability, of a known weakness class, rated high severity.

## From Bugs to Threats: Why Model at All?

Finding bugs one at a time is reactive. **Threat modeling** is the proactive counterpart: before (or while) you build, you walk your design and ask "how could this be abused?" The [STRIDE model above](#stride-threat-modeling) turns that open-ended question into a checklist -- Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege -- run against each part of your system.

Threat modeling is cheapest at the whiteboard, for the same reason a requirements bug is cheaper to fix than a production bug: the further downstream a problem is found, the more expensive it is to fix. A threat you catch during design costs a sentence in a document. The same threat caught by an attacker in production can cost user trust, data, and -- as the [Therac-25 case](./EthicalCaseTherac25) reminds us -- in safety-critical systems, far more than that.

## Your Turn: Threat Model Your Project

Bring your team's project to this exercise. These tie directly into your [Test Plan](../Project/TestPlan) and [Design](../Project/Design) deliverables, and set up the [Security assignment](../Assignments/Security) and (for those specializing) the [Security Capstone](../Assignments/SecurityCapstone).

1. **Pick one functional requirement** of your project. Run all six STRIDE letters against it and write down every plausible threat. For any letter that does not apply, say why -- ruling threats *out* with a reason is part of the method.
2. **Propose one mitigation per threat.** Label each with the OWASP category and/or CWE it addresses, and note which defense from this course it corresponds to (parameterized query, ownership check, input size limit, hashing, audit log, etc.).
3. **Find one dependency risk.** Run `npm audit` (or your platform's equivalent) on your project, or enable Dependabot, and identify one flagged dependency. What CVE/CWE is it, and what is its severity?
4. **Write one abuse-case test.** In the [testing activity](./TestingCodeCoverage) you wrote tests for what *should* happen. Write one test for what should *not* be allowed -- for example, "a request without a valid token receives `401`," or "user Bob cannot read user Alice's note." This is a security regression test, and it belongs in your project's test plan.
5. **Reflect (connect to ethics).** Re-read one question from the [Therac-25 case study](./EthicalCaseTherac25). How does treating security as a lifecycle concern -- rather than a final checkbox -- also serve the professional and ethical obligations of a software engineer?
