---
layout: activity
permalink: /Activities/Gantt
title: "CS375: Software Engineering - Task Dependencies: Gantt Charts and the Critical Path"


info:
  goals:
    - To explain the critical path in software projects
    - To estimate task duration
    - To plan a timeline incorporating task time estimates and dependencies using a Gantt chart
    - To convert a GitHub Projects kanban board into a Gantt chart timeline using Mermaid
    - To assign an owner to every task so that the Gantt chart doubles as a work assignment plan

  models:
    - model: |
        <div align="center">
        <a href="https://en.wikipedia.org/wiki/Gantt_chart">Task Estimation Data from https://en.wikipedia.org/wiki/Gantt_chart</a>, <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License">CC BY-SA</a><br>
        <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-l838{background-color:#F8F9FA;color:#202122;font-style:italic;text-align:center;vertical-align:top}
        .tg .tg-awce{background-color:#F8F9FA;color:#202122;text-align:right;vertical-align:middle}
        .tg .tg-ravz{background-color:#EAECF0;color:#202122;font-style:italic;font-weight:bold;text-align:center;vertical-align:top}
        .tg .tg-si28{background-color:#EAECF0;color:#202122;font-weight:bold;text-align:center;vertical-align:middle}
        .tg .tg-ghid{background-color:#F8F9FA;color:#202122;text-align:center;vertical-align:middle}
        </style>
        <table class="tg">
        <thead>
          <tr>
            <th class="tg-si28" rowspan="2"><span style="background-color:#EAECF0">Activity</span></th>
            <th class="tg-si28" rowspan="2"><span style="background-color:#EAECF0">Predecessor</span></th>
            <th class="tg-si28" colspan="3"><span style="background-color:#EAECF0">Time estimates (in days)</span></th>
            <th class="tg-si28" rowspan="2"><span style="background-color:#EAECF0">Expected time (</span>TE<span style="background-color:#EAECF0">)</span></th>
          </tr>
          <tr>
            <th class="tg-si28"><span style="background-color:#EAECF0">Opt. (</span>O<span style="background-color:#EAECF0">)</span></th>
            <th class="tg-si28"><span style="background-color:#EAECF0">Normal (</span>M<span style="background-color:#EAECF0">)</span></th>
            <th class="tg-si28"><span style="background-color:#EAECF0">Pess. (</span>P<span style="background-color:#EAECF0">)</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-ravz">a</td>
            <td class="tg-ghid">—</td>
            <td class="tg-awce">2</td>
            <td class="tg-awce">4</td>
            <td class="tg-awce">6</td>
            <td class="tg-awce">4.00</td>
          </tr>
          <tr>
            <td class="tg-ravz">b</td>
            <td class="tg-ghid">—</td>
            <td class="tg-awce">3</td>
            <td class="tg-awce">5</td>
            <td class="tg-awce">9</td>
            <td class="tg-awce">5.33</td>
          </tr>
          <tr>
            <td class="tg-ravz">c</td>
            <td class="tg-l838">a</td>
            <td class="tg-awce">4</td>
            <td class="tg-awce">5</td>
            <td class="tg-awce">7</td>
            <td class="tg-awce">5.17</td>
          </tr>
          <tr>
            <td class="tg-ravz">d</td>
            <td class="tg-l838">a</td>
            <td class="tg-awce">4</td>
            <td class="tg-awce">6</td>
            <td class="tg-awce">10</td>
            <td class="tg-awce">6.33</td>
          </tr>
          <tr>
            <td class="tg-ravz">e</td>
            <td class="tg-l838">b, c</td>
            <td class="tg-awce">4</td>
            <td class="tg-awce">5</td>
            <td class="tg-awce">7</td>
            <td class="tg-awce">5.17</td>
          </tr>
          <tr>
            <td class="tg-ravz">f</td>
            <td class="tg-l838">d</td>
            <td class="tg-awce">3</td>
            <td class="tg-awce">4</td>
            <td class="tg-awce">8</td>
            <td class="tg-awce">4.50</td>
          </tr>
          <tr>
            <td class="tg-ravz">g</td>
            <td class="tg-l838">e</td>
            <td class="tg-awce">3</td>
            <td class="tg-awce">5</td>
            <td class="tg-awce">8</td>
            <td class="tg-awce">5.17</td>
          </tr>
        </tbody>
        </table>
        <br>
        <a title="Dbsheajr at the English-language Wikipedia, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Pert_example_gantt_chart.gif"><img width="512" alt="Pert example gantt chart" src="https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Pert_example_gantt_chart.gif"></a>
        </div>
      title: Gantt Charts
      questions:
        - "In terms of scheduling, what determines if a task is on the <strong>critical path</strong>?"
        - "The expected time estimate of a task is given by a Beta Distribution over the optimistic time, the most likely time, and the pessimistic time.  It is a weighted average of the optimistic time, the pessimistic time, and four times the most likely time.  Write this formula and verify the time estimates in the table above."
        - "Create a table of expected tasks for the semester for your project, and a Gantt chart, which you will include in your requirements report."
        - "Explore a tool like Asana or Trello for creating Kanban board that you can share with your group.  Describe what a Kanban is."

  additional_reading:
    - link: https://www.onlinegantt.com/#/gantt
      title: "Online Gantt Chart Creator"
    - link: https://en.wikipedia.org/wiki/Beta_distribution#Project_management:_task_cost_and_schedule_modeling
      title: "Beta Distributions and Task Scheduling"
    - link: https://docs.github.com/en/issues/planning-and-tracking-with-projects
      title: "GitHub Projects Documentation"
    - link: https://mermaid.js.org/syntax/gantt.html
      title: "Mermaid Gantt Chart Syntax"

tags:
  - gantt

---

## From Kanban Board to Gantt Chart with GitHub Projects

Real software teams rarely draw their Gantt charts by hand.  Instead, they track their work as **issues** on a kanban board (in GitHub Projects, Trello, Asana, or Jira), and generate a timeline view from that board.  In this walkthrough, you will practice this the way a real team does it on GitHub: create issues, organize them on a Projects kanban board, and then render the same plan as a Gantt chart using **Mermaid**, a text-based diagramming language that GitHub renders automatically inside any Markdown file, issue, or README.

### Step 1: Capture Your Tasks as GitHub Issues

Every row of your Gantt chart should begin its life as a GitHub issue.  For each task on your project plan:

1. In your project repository, click **Issues**, then **New issue**.
2. Give the issue a short, action-oriented title (for example, "Implement login endpoint").
3. In the description, note the estimated duration (using your optimistic/normal/pessimistic estimates from the model above) and any issues it depends on (for example, "Blocked by #3").
4. **Assign an owner**: in the right sidebar, use the **Assignees** field to name exactly one teammate responsible for the task.  Tasks without an owner tend not to get done; tasks with two owners tend to get done twice (differently!).

### Step 2: Organize the Issues on a Kanban Board

From your repository or organization, click **Projects**, then **New project**, and choose the **Board** template.  You will see the classic kanban columns: **Todo**, **In Progress**, and **Done**.  Add each of your issues to the board.  GitHub Projects also provides built-in **Roadmap** view: if you add custom **Start date** and **Target date** fields to your project items, the Roadmap view will draw a timeline for you automatically -- this is a kanban-to-Gantt conversion built right into GitHub, and you are welcome to use it for your project.

### Step 3: Render the Plan as a Mermaid Gantt Chart

To publish the timeline in your requirements report and README, convert the board into a Mermaid `gantt` diagram.  Each issue becomes one task line with an ID, a start date (or a dependency), and a duration.  Here is a fully worked two-sprint example for a small team building a course-scheduling web app.  Suppose the board contains these issues:

| Issue | Title                                | Assignee | Estimate | Depends On |
|-------|--------------------------------------|----------|----------|------------|
| #1    | Design database schema               | Alice    | 4 days   | --         |
| #2    | Implement login endpoint             | Bob      | 5 days   | #1         |
| #3    | Build course listing page            | Carol    | 5 days   | #1         |
| #4    | Sprint 1 demo and retrospective      | All      | 1 day    | #2, #3     |
| #5    | Implement enrollment endpoint        | Bob      | 5 days   | #2         |
| #6    | Build enrollment page                | Carol    | 4 days   | #3, #5     |
| #7    | Write user acceptance test scripts   | Alice    | 3 days   | #4         |
| #8    | Sprint 2 demo and retrospective      | All      | 1 day    | #6, #7     |

Pasting the following code block into any Markdown file on GitHub (such as your project README) renders it as a graphical Gantt chart -- try it!

<pre>
```mermaid
gantt
    title Course Scheduler: Sprints 1 and 2
    dateFormat YYYY-MM-DD
    excludes weekends

    section Alice
    Design database schema (#1)       :done, t1, 2025-02-03, 4d
    Write acceptance test scripts (#7):t7, after t4, 3d

    section Bob
    Implement login endpoint (#2)     :active, t2, after t1, 5d
    Implement enrollment endpoint (#5):t5, after t2, 5d

    section Carol
    Build course listing page (#3)    :active, t3, after t1, 5d
    Build enrollment page (#6)        :t6, after t3 t5, 4d

    section Whole Team
    Sprint 1 demo (#4)                :milestone, t4, after t2 t3, 1d
    Sprint 2 demo (#8)                :milestone, t8, after t6 t7, 1d
```
</pre>

Notice several things about this chart:

* **Each `section` is a person.**  Grouping tasks by assignee makes the chart double as a work assignment plan: you can see at a glance who owns each task, and whether anyone is overloaded (two of Carol's tasks overlapping, for example, would be a red flag).
* **Dependencies use `after`.**  The task `t6` begins `after t3 t5`, exactly mirroring the "Depends On" column of the issue table.  This is how the critical path becomes visible: follow the longest chain of `after` links.
* **Issue numbers appear in the task names** (`#1`, `#2`, ...), cross-referencing each Gantt row back to the GitHub issue (and kanban card) that tracks it.
* **Status keywords** like `done`, `active`, and `milestone` visually distinguish completed work, current work, and sprint boundaries.

### Step 4: Keep Them in Sync

Your kanban board is the *living* view of the plan (cards move daily), while the Gantt chart is the *scheduled* view (dates and dependencies).  At each sprint boundary, update the Mermaid chart to mark completed tasks `done` and to reschedule anything that slipped.  Note whether the slip affects the critical path, and discuss schedule adjustments at your standup meeting.

### Your Turn

1. Create a GitHub Project kanban board for your course project, populate it with issues for your first two sprints, and assign exactly one owner to every issue.
2. Convert the board into a Mermaid Gantt chart in your project README, with one section per team member, an issue number on every task, and `after` dependencies matching your issue dependencies.
3. Identify the critical path in your chart.  Which person owns the most critical-path tasks?  Would re-assigning any task shorten your schedule?

**For your requirements report:** your Gantt chart must include an owner (assignee) for every task -- either by using one Mermaid `section` per person as shown above, or by including an assignee column in an accompanying task table.  Unowned tasks will be treated as unplanned work.

