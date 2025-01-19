---
layout: activity
permalink: /Activities/Cloud4
title: "CS375: Software Engineering - RESTful Service Client"


info:
  next: ./Cloud5
  prev: ./Cloud3
  
  additional_reading:
    - title: "GitHub OAuth Login with Node.js"
      link: "http://thecodebarbarian.com/github-oauth-login-with-node-js.html"
  goals: 
    - To explore Representational State Transfer (REST) as applied to HTTP web calls
    - To use OAuth to enable user authentication when interacting with a RESTful web service
  models:
    - model: |
        <a href="http://thecodebarbarian.com/github-oauth-login-with-node-js.html">Review this article</a>
      title: RESTful Service Clients
      questions:
        - "Using the <a href=\"http://thecodebarbarian.com/github-oauth-login-with-node-js.html\">tutorial above</a>, write a program to support OAuth login to GitHub, writing a web service using express to capture the callback with the user's token.  You can enter the repl.it URL into a new tab in your browser to load the page, and set that same URL as the callback URL (add <code>/oauth-callback</code> to the callback URL field on the GitHub application page)."
        - How could we use this token in place of a user account when developing our own web services?  How could we associate a user with a token, while ensuring that subsequent tokens for the same user are also associated with that same user?  In other words, how can we ensure that not just any valid GitHub user can masquerade as a user on our eventual service?
      embed: |
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/WeatherClientExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>         
        
tags:
  - rest
  
---

