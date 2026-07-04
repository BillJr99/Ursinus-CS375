---
layout: assignment
permalink: /Assignments/StandupReflection
title: "CS375: Software Engineering - Weekly Standup Reflection"


info:
  coursenum: CS375
  points: 10
  goals:
    - "To self-reflect upon your individual contributions to the group"
    - "To plan individual and group activities for the upcoming sprint"
    - "To ensure that work aligns with your Gantt chart and does not overlap the efforts of another."
    - "To document each weekly standup meeting with minutes that record attendance and each member's progress, plans, and blockers"

  rubric:
    - weight: 70
      description: Self Reflection
      preemerging: The contributions, plans, or reflections are unclear or missing
      beginning: The self reflection indicates a summary of individual progress in the prior sprint that overlaps with the contributions of another.  The self reflection indicates a summary of individual activities for the upcoming sprint that overlaps with the contributions of another.  The reflection does not thoughtfully comment on technical challenges and areas of personal development.
      progressing: The self reflection indicates a summary of individual progress in the prior sprint that does not overlap with the contributions of another.  The self reflection indicates a summary of individual activities for the upcoming sprint that overlaps in minor ways with the contributions of another that can be resolved in a stand up meeting.  The reflection includes a thoughtful discussion of technical challenges and areas for personal development. 
      proficient: The self reflection indicates a summary of individual progress in the prior sprint that does not overlap with the contributions of another.  The self reflection indicates a summary of individual activities for the upcoming sprint that does not overlap with the contributions of another.  The reflection includes a thoughtful discussion of technical challenges and areas for personal development.
    - weight: 30
      description: Standup Meeting Minutes and Attendance
      preemerging: Meeting minutes are missing
      beginning: Meeting minutes are submitted but are missing the attendance record, or do not record progress, plans, and blockers for the members present
      progressing: Meeting minutes are submitted with a complete attendance record and record progress, plans, and blockers for most members, with action items noted
      proficient: Meeting minutes are submitted with a complete attendance record, record progress, plans, and blockers for every member (including notes supplied asynchronously by any absent member), and list action items with owners

tags:
  - project
  - selfreflection

---

### Weekly Cadence

Your group will hold a standup meeting **every week** for the duration of the project, and one member (the scrum lead, per your role rotation) will submit the group's standup minutes **each week** along with your individual reflections.  A "standup" is deliberately short -- 15 minutes or less (traditionally, short enough to hold while standing) -- because it is a synchronization meeting, not a working meeting: each member answers three questions, blockers are *identified* (not solved), and anything that needs discussion is scheduled separately with just the people involved.

### Standup Minutes: What to Submit Each Week

Each week, your group's scrum lead submits one set of minutes using the following template.  **Attendance is required content**: list every group member and mark them present or absent.  An absent member should supply their three answers asynchronously (by message to the scrum lead) so the team's plan stays complete; note these as "(submitted asynchronously)."

```
Standup Minutes -- <Project Name>
Date/Time: <date and time of the meeting>
Scrum Lead (minutes taken by): <name>

Attendance:
  - <Member 1> -- present
  - <Member 2> -- present
  - <Member 3> -- absent (answers submitted asynchronously)
  - <Member 4> -- absent (no answers received)

Per-Member Updates:
  <Member name>:
    Since last standup: <what they completed, with Gantt/issue numbers>
    Before next standup: <what they will do, with Gantt/issue numbers>
    Blockers: <anything preventing progress, or "none">
  (repeat for each member, including asynchronous submissions)

Schedule Check:
  <Is the sprint on track against the Gantt chart?  Any tasks re-assigned
   or re-scheduled?  Note any change to the critical path.>

Action Items:
  - <action> -- owner: <name> -- due: <date>
```

Keep all of your minutes in your project repository (for example, in a `minutes/` folder, one Markdown file per week) so that they are version-controlled and the whole team can see them; submit each week's file (or a link to it) with your reflection.

### What to Do (Individual Reflection)

In the self-reflection, you are to periodically comment on these areas:

1. Your individual contributions during the prior sprint
2. Your planned individual contributions during the upcoming sprint
3. Any technical challenges that you face that are preventing you from achieving your planned contributions to the group
4. Any areas for personal and professional development that would better enable you to meet your planned contributions on-schedule
5. Was your group able to produce a prototype for this sprint, or to synthesize existing prototype(s) into a polished design?  If so, describe this here.
6. Provide a screenshot of your Kanban that reflects your Gantt chart tasks and the current state of those tasks.  If the Gantt chart does not already assign a point person to each task, indicate that on your reflection report here.

Your discussion of prior and planned individual contributions should align with the project plan and Gantt chart.  They should be generally on-schedule, or a group-led revision to the schedule should take place and be documented.  In addition, these contributions should not overlap with the claimed contributions of others.  In other words, you should comment on what, specifically, you accomplished during the past sprint (and what you plan to accomplish during the upcoming sprint).
