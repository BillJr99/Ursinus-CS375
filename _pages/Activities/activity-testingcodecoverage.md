---
layout: activity
permalink: /Activities/TestingCodeCoverage
title: "CS375: Software Engineering - Software Testing and Code Coverage"


info:
  goals:
    - To differentiate between white box and black box testing
    - To indicate when one testing strategy is appropriate over another
    - To explain that although testing all input possibilities and configurations is impossible, achieving good code coverage with heterogeneous inputs is a best practice
    - "To write unit tests with 100% code and control flow coverage"
    - "To explain that 100% code coverage alone is insufficient because different inputs may exercise those branches differently"
    - "To apply black box, white box, and acceptance testing at each layer (model, controller, and view) of an MVC application"

  models:
    - model: |
        <script type="syntaxhighlighter" class="brush: cpp"><![CDATA[
        public class Main {            
            public static int triangleArea(int base, int height) {
                // Broken Code!
                return 1 / 2 * base * height;
            }
            
            public static void main(String[] args) {
                System.out.println(triangleArea(5, 2));
                System.out.println(triangleArea(3, -2));
            }
        }
        ]]></script>      
      title: Choosing Unit Tests
      questions:
        - What's wrong with this code? (there is more than one answer!)
        - "How many calls would you make to <code>triangleArea</code> before you decide that it is &quot;passing?&quot;  What parameter inputs would you supply to those calls?"
        - "Visit <a href=\"../NetBeans/JUnit\">this guide</a> and design a unit test for <code>triangleArea</code>.  You can just write the code in your notes: there is no need to compile or execute it now (we will do this in lab instead!)."
        - "Recall that floating point types cannot always be compared directly for equality, due to rounding and precision limitations.  Change this program to use <code>double</code> data types, and re-generate unit tests for it.  Where do you think a floating point tolerance can be added with the <code>assertEquals</code> function?"
    - model: |
        <script type="syntaxhighlighter" class="brush: cpp"><![CDATA[
        public class Main {            
            public static double calculateIncomeTax(double income) {
                double result = 0;
                
                double base10 = 9950 * 0.1;
                double base12 = base10 + (40525 - 9950) * 0.12;
                double base22 = base12 + (86375 - 40525) * 0.22;
                double base24 = base22 + (164925 - 86375) * 0.24;
                double base32 = base24 + (209425 - 164925) * 0.32;
                double base35 = base32 + (523600 - 209425) * 0.35;
                
                if(income < 9950) {
                    result = income * 0.1;
                } else if(income < 40525) {
                    result = base10 + (income - 9950) * 0.12;
                } else if(income < 86375) {
                    result = base12 + (income - 40525) * 0.22;
                } else if(income < 164925) {
                    result = base22 + (income - 86375) * 0.24;
                } else if(income < 209425) {
                    result = base24 + (income - 164925) * 0.32;
                } else if(income < 523600) {
                    result = base32 + (income - 209425) * 0.35;
                } else {
                    result = base35 + (income - 523600) * 0.37;
                }
                
                return result;
            }
            
            public static void main(String[] args) {
                double taxOwed = calculateIncomeTax(25000);
                
                System.out.println("I owe: $" + taxOwed);
            }
        }
        ]]></script>                   
      title: Thinking Critically about Code
      questions:
        - "What kinds of inputs would make this function fail (or return values that don't make sense)?  What can you do about this?"
        - "What tests, at a minimum, would you propose to thoroughly exercise this function?"
    - model: |
        <script type="syntaxhighlighter" class="brush: cpp"><![CDATA[
        import java.util.Random;
        
        public class Main {            
            public static boolean isHeads() {
                Random rng = new Random();
                
                // Use the random number generator (rng)
                // to generate a value >= 0.0 and < 1.0
                double randomValue = rng.nextDouble();
                
                boolean result = false;
                if(randomValue > 0.5) {
                    result = true;
                } 
                
                return result;
            }
            
            public static void main(String[] args) {
                System.out.println(isHeads());
                System.out.println(isHeads());
            }
        }
        ]]></script>          
      title: Facilitating Unit Tests      
      questions:
        - What makes this a difficult function to test? 
        - What could we do to better facilitate testing a function like this?  For example, how might running the program and evaluating the output be helpful?
        - Can black-box testing be automated?
    - model: |
        <script type="syntaxhighlighter" class="brush: python"><![CDATA[
        def get_grade(numgrade):
            """Returns the letter grade for a course given the numerical   
            grade average.

            Parameters
            ----------
            numgrade : float, required
                The number grade between 0-100

            Returns
            -------
            The letter grade associated with that numeric grade on a 
            90/80/70/60 scale
            """
            
            if numgrade >= 90:
            return "A"
            elif numgrade >= 80:
            return "B"
            elif numgrade >= 70:
            return "C"
            elif numgrade >= 60:
            return "D"
            else:
            return "F"
        ]]></script>
        <br>
        <script type="syntaxhighlighter" class="brush: python"><![CDATA[
        import unittest
        from main import get_grade

        # run with python -m unittest test_grade
        # generate coverage with coverage run -m unittest test_grade
        # view coverage report with coverage report or coverage html
        class TestGrades(unittest.TestCase):

          def test_A(self):
            self.assertEqual(get_grade(90), "A")

          def test_C(self):
            self.assertEqual(get_grade(75), "C")

        if __name__ == '__main__':
          unittest.main()
        ]]></script>        
      title: Unit Testing and Code Coverage
      questions:
        - "Run the unit tests above and generate a code coverage report."
        - "How can you improve code coverage to 100%, by testing all code branches?"
        - "Should you continue to write and run additional unit tests beyond 100% code coverage?  Give an example of why this might be necessary."
        - "Would you write your code first or your unit tests first?  How might it help to write your unit tests before writing the code?"
        - "How can unit testing and code coverage be automated via a github workflow?  When would unit testing be executed?"

  additional_reading:
    - link: https://ocw.mit.edu/ans7870/6/6.005/s16/classes/03-testing/#blackbox_and_whitebox_testing
      title: "Software Testing by MIT"
      
tags:
  - testing

---


## Example: Python Testing and Coverage Example

<iframe height="500px" width="100%" src="{{ site.baseurl }}/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FPyTestingAndCoverage.zip&title=Python%20Testing%20and%20Coverage%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

## Example: Github Automated Testing Workflow Example

<iframe height="500px" width="100%" src="{{ site.baseurl }}/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FGithubWorkflowPythonTestExample.zip&title=Github%20Automated%20Testing%20Workflow%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

## Testing at Every Layer of an MVC Application

White box, black box, and acceptance testing are not three phases you do at the end -- they are three *lenses*, and each lens applies to **each layer** of your [MVC architecture](./MVC).  A team that only unit-tests its models will ship controllers that crash on bad input; a team that only clicks through the UI will not know *which* layer broke when a test fails.  The matrix below shows one concrete worked test in every cell, using the note-taking JWT example from the MVC activity (`POST /notes` creates a note owned by the logged-in user).

| | **White Box** (you can see the code; test branches and internals) | **Black Box** (inputs and outputs only; no knowledge of internals) | **Acceptance** (does it satisfy the *requirement*, in the stakeholder's terms?) |
|---|---|---|---|
| **Model** | Unit test each branch of `createNote`: <br><code>note = createNote(1, "hi")</code><br><code>assert note.ownerId == 1</code><br><code>assert note.createdAt is not None</code><br>and the error branch: creating with empty text raises/rejects. | Treat the data layer as opaque: insert a row, restart the program, and query it back -- same data?  Insert two notes and verify the IDs are distinct and increasing.  (You do not care *how* it stores them.) | "The system shall remember my notes."  With the product owner watching: add a note, close the app entirely, reopen, and confirm the note is still listed with a sensible creation date. |
| **Controller** | Unit test the controller with a **mock model** (a fake `noteModel` that records what it was called with): call `createNote` with no `text` and assert it returns 400 *without* calling the model; call it with valid input and assert it passes `req.user.sub` (not the body!) as the owner. | Send real HTTP requests and check only status codes and JSON: `POST /notes` with a token &rarr; `201` and the note echoed back; without a token &rarr; `401`; with `{"text": ""}` &rarr; `400`.  A shell script of `curl` commands works well here. | "Only I can add notes to my account."  Script for a non-technical tester: "Log in as alice, add a note.  Log out, log in as bob.  Verify bob does not see alice's note." |
| **View** | Inspect the template/DOM logic directly: render the note-list view with a list of 3 notes and assert 3 `<li>` elements appear; render with 0 notes and assert the "No notes yet" branch appears.  Render a note whose text contains `<script>` and assert it is escaped. | Drive the real UI without reading its code (by hand, or automated with a tool like Selenium/Playwright): type a note, click **Add**, and verify it appears in the list, regardless of how the page is implemented. | "The app is usable for adding a note."  Hand a stakeholder the acceptance script from your test plan: "Type a note and save it.  Did you see confirmation?  Is the note displayed the way you expected?" |

Three observations to carry into your project test plan:

* **Failures localize.**  If the black-box controller test fails but every model unit test passes, the bug is in the controller (or the wiring between them) -- you just saved yourself an hour of debugging in the wrong file.
* **Mocks are what make layer isolation possible.**  Because the controller receives its model as a dependency, you can substitute a fake and test the controller's *decisions* (status codes, validation, which model function it calls) without a database.  This is a direct payoff of MVC separation.
* **Coverage means something different in each column.**  Code coverage (statements and branches exercised) is a *white box* metric: measure it for your model and controller unit tests, and aim for 100%.  For black box tests, "coverage" means every input class and boundary (valid, empty, missing, malicious) appears in your test set.  For acceptance tests, coverage means every *functional requirement* has at least one script -- a requirements traceability matrix, not a code coverage report, is how you demonstrate it.

### Questions

1. Fill in the same 3x3 matrix for one requirement of *your* project, with one concrete test per cell.
2. Which cells of the matrix can run in your GitHub Actions [CI workflow](./CICD) on every push, and which require a human?  What does that imply about how often each should run?
3. Your model tests achieve 100% coverage but the controller passes `req.body.ownerId` to the model instead of `req.user.sub`.  Which cell of the matrix catches this bug?  What does that tell you about relying on any single row or column?
