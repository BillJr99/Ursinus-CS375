---
layout: activity
permalink: /Activities/MVC
title: "CS375: Software Engineering - Model-View-Controller (MVC) Architecture"


info:
  goals:
    - To explain the responsibilities of the model, view, and controller layers and why separating them makes software easier to test, maintain, and divide among a team
    - To trace a single HTTP request through the route, controller, and model layers of a web application
    - To explain how JSON Web Token (JWT) authentication protects routes using middleware
    - To place default values (such as creation timestamps) in the model or controller rather than the view

  models:
    - model: |
        <div align="center">
        <table border="1" cellpadding="6">
          <thead>
            <tr><th>Layer</th><th>In a Restaurant</th><th>In a Web App</th><th>Knows About</th><th>Must Never</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>View</strong></td>
              <td>The menu and the plated dish: what the customer sees</td>
              <td>HTML templates, a mobile app, or the JSON an API returns</td>
              <td>How to display data it is handed</td>
              <td>Compute business logic or touch the database</td>
            </tr>
            <tr>
              <td><strong>Controller</strong></td>
              <td>The waiter: takes the order, relays it, brings back the result</td>
              <td>Functions that unpack a request, call model functions, and choose a response and status code</td>
              <td>HTTP requests/responses and the model's functions</td>
              <td>Contain SQL or produce HTML itself</td>
            </tr>
            <tr>
              <td><strong>Model</strong></td>
              <td>The kitchen: actually prepares the food from the pantry</td>
              <td>Functions that read and write the data store (SQL, a file, a cloud service) and enforce data rules</td>
              <td>The database schema and business rules</td>
              <td>Know anything about HTTP or the user interface</td>
            </tr>
          </tbody>
        </table>
        </div>
      title: "MVC as a Restaurant: Separation of Concerns"
      questions:
        - "The customer never walks into the kitchen, and the chef never talks to the customer.  What is the software equivalent of each of these rules, and what could go wrong if they were violated?"
        - "Suppose the restaurant replaces its paper menu with a tablet (a new <em>view</em>).  What has to change in the kitchen?  Now suppose your web app adds a mobile app alongside its website.  What has to change in the model?"
        - "Your team has three developers.  How does this separation let all three work on the same feature at the same time without stepping on each other?  Which layer would each person own?"
        - "Which layer(s) can be unit tested without starting a web server or a browser?  Why does that matter for your test plan?"
    - model: |
        <div align="center">
        <table border="1" cellpadding="6">
          <thead>
            <tr><th>Step</th><th>File (in the JWT example below)</th><th>What Happens</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><code>server.js</code></td><td><code>POST /notes</code> arrives; the <code>/notes</code> prefix is delegated to <code>noteRoutes</code></td></tr>
            <tr><td>2</td><td><code>routes/noteRoutes.js</code></td><td>The route table matches <code>POST /</code> and runs the middleware chain: <code>requireAuth</code>, then <code>noteController.createNote</code></td></tr>
            <tr><td>3</td><td><code>middleware/authMiddleware.js</code></td><td><code>jwt.verify</code> checks the token signature from the <code>Authorization: Bearer</code> header; valid &rarr; <code>req.user</code> is set and <code>next()</code> continues; invalid &rarr; <strong>401, stop here</strong></td></tr>
            <tr><td>4</td><td><code>controllers/noteController.js</code></td><td>Validates <code>req.body.text</code> and calls <code>noteModel.createNote(req.user.sub, text)</code></td></tr>
            <tr><td>5</td><td><code>models/noteModel.js</code></td><td>Writes the note to the data store, stamping <code>createdAt</code> at insert time</td></tr>
            <tr><td>6</td><td>back up the chain</td><td>The controller sends <code>201 Created</code> with the new note as JSON (the &quot;view&quot; of an API)</td></tr>
          </tbody>
        </table>
        </div>
      title: "Tracing One Request: POST /notes"
      questions:
        - "At which step is an unauthenticated request rejected?  Which layers never even run in that case, and why is that a good security property?"
        - "A JWT has three parts: a header, a payload (for example <code>{&quot;sub&quot;: 1, &quot;username&quot;: &quot;alice&quot;, &quot;exp&quot;: ...}</code>), and a signature computed with a secret only the server knows.  The payload is readable by anyone -- so what stops a user from editing it to become someone else?"
        - "Why does the controller take the owner of the new note from <code>req.user</code> (the verified token) rather than from the request body?"
        - "Follow the same style of trace for <code>POST /auth/login</code>: list the files visited in order and what each contributes."

  additional_reading:
    - link: https://developer.mozilla.org/en-US/docs/Glossary/MVC
      title: "MVC from MDN Web Docs"
    - link: https://jwt.io/introduction
      title: "Introduction to JSON Web Tokens"
    - link: https://expressjs.com/en/guide/using-middleware.html
      title: "Using Express Middleware"

tags:
  - mvc
  - architecture
  - jwt
  - databases

---

## Why MVC?

As soon as a program has a user interface *and* stored data *and* rules connecting them, there is a temptation to write it as one big file where the button-click handler runs the SQL and formats the HTML.  It works -- once.  Then the team grows, the designer wants to restyle every page, the customer wants a mobile app, and the tester wants to test the business rules without clicking through the UI, and the big file fights all of them at once.

**Model-View-Controller (MVC)** is the standard cure: split the application into three layers with strict rules about who may talk to whom (study the restaurant table in the first model above).  The payoff is exactly what a software team needs: layers can be **developed in parallel** (one teammate per layer), **tested in isolation** (the model needs no browser; the view needs no database), and **replaced independently** (swap SQLite for MySQL, or add a mobile view, without touching the other layers).  Nearly every web framework you will meet professionally -- Express, Django, Rails, Spring, ASP.NET -- is organized this way.

## Example: A Database-Backed MVC Application

The example below is a complete Express application managing students, courses, and enrollments (the same schema from the [databases activity](./Cloud5)), organized into `routes/`, `controllers/`, `models/`, and `views/` folders with a SQLite database and JWT authentication.  Browse the folders and notice that every file has exactly one kind of job.

<iframe height="500px" width="100%" src="{{ site.baseurl }}/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FDatabaseMVCExample.zip&title=Database%20MVC%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

## Example: A Minimal MVC Service with JWT Authentication

The second example strips the pattern down to its skeleton so you can trace every line: two resources (`/auth` and `/notes`), a JSON-file model (so it runs anywhere with just `npm install && node server.js`), and JWT login protecting the notes routes.  The request-trace table in the second model above walks through this exact code -- open the files side by side with the table.

<iframe height="500px" width="100%" src="{{ site.baseurl }}/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FNodeJWTMVCExample.zip&title=Node%20JWT%20MVC%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

### How the JWT Handshake Works

1. **Login once:** the client `POST`s a username and password to `/auth/login`.  The controller asks the user model to verify them, and, on success, **signs** a token: `jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' })`.  The token is just a string the client stores.
2. **Present the token on every request:** the client sends `Authorization: Bearer <token>` on each call to a protected route.  No password is transmitted again, and the server keeps no session state -- the token *is* the proof.
3. **Verify at the door:** the `requireAuth` middleware calls `jwt.verify(token, SECRET)`, which recomputes the signature.  A forged or expired token throws, and the middleware answers `401` before any controller runs.  A valid token's payload becomes `req.user`, which downstream code may trust.

Run the example locally and follow the `curl` transcript in its README: register, log in, create a note with the token, and then try again with the token deliberately corrupted.

## Design Guideline: Default Values Belong in the Model (or Controller), Never the View

Here is a mistake that appears in almost every first team project.  A table needs a `createDate` column, so someone adds it to the form:

**Bad -- the view supplies the timestamp:**

```html
<!-- add-note.html -->
<input type="hidden" id="createDate">
<script>
  document.getElementById("createDate").value = new Date().toISOString();
</script>
```

Why is this wrong?  The timestamp now depends on the *client's* clock (wrong time zones, skewed clocks, users who edit the hidden field in dev tools), it must be re-implemented in every view (web form, mobile app, API client, test script), and any view that forgets it inserts a NULL.  "When was this row created?" is a fact about the *data*, so the *data layer* should own it.

**Good -- the model supplies it, in the schema itself:**

```sql
CREATE TABLE notes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  text       TEXT NOT NULL,
  createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- the INSERT simply omits createDate, and the database fills it in
INSERT INTO notes (text) VALUES (?);
```

**Also acceptable -- the controller (the intermediary) supplies it,** when the value needs application logic the database cannot express:

```js
// noteController.js
const note = noteModel.createNote(req.user.sub, text); // model stamps createdAt
// or, in the controller: noteModel.insert({ text, createdAt: new Date() });
```

The rule generalizes beyond timestamps: **any value the user did not consciously choose** -- creation dates, record IDs, the owning user, initial status fields -- should be filled in by the model (preferably, via the schema) or the controller, never collected from the view.  Both example applications on this page follow this rule; find the places where they do.  This guideline also appears on the design review checklist of your [Objects/API Summary deliverable](../Project/Design).

## Your Turn

1. In the `DatabaseMVCExample`, pick one requirement ("a student enrolls in a course") and write the six-step request trace for it, in the style of the table above.
2. Add a `DELETE /notes/:id` feature to the `NodeJWTMVCExample`: which three files do you touch, and what does each change contribute?  Ensure a user can delete only their *own* notes -- which layer enforces that, and why?
3. Audit your own project design: list every field in your schema that the user does not consciously choose, and state (in your Objects/API Summary) which layer supplies each one.
