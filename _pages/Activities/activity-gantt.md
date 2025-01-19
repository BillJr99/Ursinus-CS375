---
layout: activity
permalink: /Activities/Gantt
title: "CS375: Software Engineering - Task Dependencies: Gantt Charts and the Critical Path"


info:
  goals:
    - To explain the critical path in software projects
    - To estimate task duration
    - To plan a timeline incorporating task time estimates and dependencies using a Gantt chart

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
        <a title="Dbsheajr at the English-language Wikipedia, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Pert_example_gantt_chart.gif"><img width="512" alt="Pert example gantt chart" src="https://upload.wikimedia.org/wikipedia/commons/7/73/Pert_example_gantt_chart.gif"></a>
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

tags:
  - gantt

---

